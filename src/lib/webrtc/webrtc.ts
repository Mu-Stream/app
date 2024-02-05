import Peer from 'simple-peer';
import {
	ServerPayloadType,
	type ServerPayload,
	ClientPayloadType,
	type ClientPayload,
	P2PPayloadType,
	type P2PPayload,
	type Signal
} from './types';
import { room_id } from '$lib/stores/room_id';

class MuPeer {
	private peer?: Peer.Instance;

	public async init({
		on_message,
		remote_peer,
		ws,
		roomId
	}: {
		on_message: (payload: P2PPayload) => void;
		remote_peer?: { uuid: string; signal: Signal };
		ws: MuWebSocket;
		roomId?: string;
	}) {
		this.peer = remote_peer
			? new Peer({ initiator: false, trickle: false })
			: new Peer({ initiator: true, trickle: false });

		if (remote_peer) {
			// register peer
			this.peer.signal(remote_peer.signal);
			// send back host signal to peer once
			await new Promise<void>((resolve) => {
				this.peer!.once('signal', (signal) => {
					ws.send({
						type: ClientPayloadType.SIGNAL_REQUESTER,
						signal,
						uuid: remote_peer.uuid
					});
					resolve();
				});
			});
		} else {
			await new Promise<void>((resolve) => {
				this.peer!.once('signal', (signal) => {
					console.info('sending Join host request');
					ws.send({
						type: ClientPayloadType.JOIN_HOST,
						roomId: roomId!,
						signal
					});
					resolve();
				});
			});
		}

		/// renegociate logic does not need to use signaling server
		this.peer.on('signal', (signal) => {
			this.send({ type: P2PPayloadType.RENEGOCIATE, signal });
		});

		this.peer.on('data', (data) => {
			const payload: P2PPayload = JSON.parse(data);
			if (payload.type === P2PPayloadType.RENEGOCIATE) {
				this.peer!.signal(payload.signal);
			}
			on_message(payload);
		});
		////
	}

	public send(payload: P2PPayload) {
		this.peer!.send(JSON.stringify(payload));
	}

	public signal(signal: Signal) {
		this.peer!.signal(signal);
	}

	public onStream(on_stream: (stream: MediaStream) => void) {
		this.peer!.on('stream', on_stream);
	}

	public addStream(stream: MediaStream) {
		this.peer!.addStream(stream);
	}
}

class MuWebSocket {
	private ws?: WebSocket;

	public async init(on_message: (payload: ServerPayload) => void) {
		const ws = new WebSocket(`ws://192.168.107.207:8080`);
		await new Promise<void>((resolve) => {
			ws.onopen = () => {
				console.info(`ws connection established`);
				resolve();
			};
		});
		ws.onerror = (err) => {
			console.error(`ws error ${err}`);
		};
		ws.onmessage = ({ data }) => {
			on_message(JSON.parse(data));
		};

		this.ws = ws;
	}

	public send(payload: ClientPayload) {
		this.ws!.send(JSON.stringify(payload));
	}
}

const peers: Record<string, MuPeer> = {};

class MuRoom {
	public me?: MuPeer;

	public roomId?: string;

	constructor() {}

	/// declare intent to host a room to signaling server
	// signaling server wil then return the roomId and forward peers signals that want to join this room to the host
	public async hostRoom() {
		const ws = new MuWebSocket();
		await ws.init((payload) => {
			console.debug(payload);
			switch (payload.type) {
				/// server accept this peer as host and give it a [roomId]
				case ServerPayloadType.HOST_OK:
					this.roomId = payload.roomId;
					room_id.set(payload.roomId);
					break;
				/// when another peer want to join the room signaling server forward its signal
				case ServerPayloadType.JOIN_OK:
					// @eslint-disable-next-line no-case-declarations
					const peer = new MuPeer();
					peer.init({ ws, on_message: () => {}, remote_peer: payload });
					peers[payload.uuid] = peer;
					break;
			}
		});

		/// initial signal create the room
		ws.send({ type: ClientPayloadType.HOST });
	}

	public sendStream(stream: MediaStream) {
		for (const peer of Object.values(peers)) {
			peer.addStream(stream);
		}
	}

	public async joinRoom(roomId: string) {
		const ws = new MuWebSocket();

		const me = new MuPeer();

		await ws.init((payload) => {
			console.log(payload);
			switch (payload.type) {
				case ServerPayloadType.SIGNAL_REQUESTER:
					console.log('got signal requester', payload);
					me.signal(payload.signal);
			}
		});

		await me.init({
			roomId,
			ws,
			on_message: () => {}
		});

		me.onStream((stream) => {
			console.log('got stream', stream);
			/// play the media stream
			const audio = new Audio();
			audio.srcObject = stream;
			audio.play();
		});

		this.me = me;
	}
}

export async function createMediaSource(file: File) {
	const audio_context = new AudioContext();
	const gain = audio_context.createGain();
	gain.connect(audio_context.destination);
	const file_reader = new FileReader();
	const buffer = new Promise<AudioBuffer>((resolve) => {
		file_reader.onload = (event) => {
			audio_context.decodeAudioData(event.target!.result! as ArrayBuffer, (buffer) => {
				resolve(buffer);
			});
		};
	});
	file_reader.readAsArrayBuffer(file);
	const media_source = audio_context.createBufferSource();
	media_source.buffer = await buffer;
	media_source.connect(gain);
	const remote_stream = audio_context.createMediaStreamDestination();
	media_source.connect(remote_stream);
	return { media_source, remote_stream };
}

export const room = new MuRoom();
