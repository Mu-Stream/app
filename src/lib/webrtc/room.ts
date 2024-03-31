import { PeerNotifier, type PeerPayloads } from "./peer";
import {
	type SignalingEvent,
	signaling_server_notifier,
	SignalingServerNotifier,
} from "./signaling";

import { MediaManager, type MediaManagerEvents } from "./music_streamer";
import { Err, Ok, type Result } from "bakutils-catcher";
import { ListenerError, type Listener } from "$lib/i_notifier";
import type { Readable } from "svelte/store";

class UnableToRetrivePeerSignal extends ListenerError {
	constructor() { super('Unable to retrieve peer signal') }
}

class RoomError extends Error {
	constructor(message?: string) {
		super(message ?? 'Unexpected error in room');
	}
}

class SignalingServerNotReady extends RoomError {
	constructor() { super('Signaling server not ready') }
}

class SignalingServerPayloadTimeout extends RoomError {
	constructor() { super('Signaling server payload retrival timed out') }
}

class Room {
	private _room_id?: string;
	private _peer?: PeerNotifier
	private _peers: PeerNotifier[] = []
	private _media_manager: MediaManager = new MediaManager()
	private _signaling_server_notifier: SignalingServerNotifier;
	private _song_progress: Readable<MediaManagerEvents['CURRENTLY_PLAYING']>

	public get id() { return this._room_id }
	public get song_progress() { return this._song_progress }

	public get users() {
		return [...this._peers.map(p => ({ id: p.id, name: p.id })), { id: 'host', name: 'host' }]
	}

	public get peer() { return this._peer }

	constructor({ signaling_server_notifier }: { signaling_server_notifier: SignalingServerNotifier }) {
		this._signaling_server_notifier = signaling_server_notifier;
		this._song_progress = this._media_manager.getSvelteReadable(
			{
				type: 'CURRENTLY_PLAYING',
				total_time: 0,
				current_time: 0,
			});
	}

	private _listenerSongProgress: Listener<MediaManagerEvents['CURRENTLY_PLAYING']> = async payload => {
		const cast_payload = payload as unknown as PeerPayloads['CURRENTLY_PLAYING'];
		this._peers.forEach(p => p.send(cast_payload))
		return Ok(null)
	}

	private _listenerPeerRegister: Listener<SignalingEvent['JOIN_OK']> =
		async (payload) => {
			const peer = new PeerNotifier({ initiator: false })

			peer.signal(payload.signal)

			const signal = await peer.initial_signal

			if (signal.isNone())
				return Err(new UnableToRetrivePeerSignal);

			this._signaling_server_notifier.send({
				type: 'SIGNAL_REQUESTER',
				signal: signal.unwrap(),
				uuid: payload.uuid,
				username: 'toto for now',
			})

			if ((await peer.link_done).isNone())
				return Err(new ListenerError('Unable to connect to peer'));

			peer.send({ type: 'INIT_ROOM', room_id: this._room_id! })

			this._peers.push(peer)

			// there is a current music playing, send it to the new client
			if (this._media_manager.stream) {
				peer.send({
					type: 'ADD_STREAM',
					stream: this._media_manager.stream
				})
			}

			// TODO: refacto with media manager
			peer.subscribe('ADD_STREAM', async payload => {
				console.log('recived stream from client')
				// 'client' sent us a stream so we play it and rebroadcast to other clients
				this._media_manager.play(payload.stream)
				this._sendStreamToParicipants([peer.id])
				return Ok(null)
			})


			return Ok(null)
		}

	public async host(): Promise<Result<string, RoomError>> {
		if ((await this._signaling_server_notifier.is_opened).isNone()) return Err(new SignalingServerNotReady);

		this._signaling_server_notifier.send({ type: 'HOST' })

		const payload = await this._signaling_server_notifier.once('HOST_OK');

		if (payload.isErr()) return Err(new SignalingServerPayloadTimeout);

		this._room_id = payload.unwrap().roomId;

		this._signaling_server_notifier.subscribe('JOIN_OK', this._listenerPeerRegister)

		this._media_manager.subscribe('CURRENTLY_PLAYING', this._listenerSongProgress);

		return Ok(this._room_id!);
	}

	public async join(room_id: string): Promise<Result<string, RoomError>> {
		const opened = await this._signaling_server_notifier.is_opened;

		if (opened.isNone()) return Err(new SignalingServerNotReady);

		const peer = new PeerNotifier({ initiator: true })

		const own_signal = await peer.initial_signal

		if (own_signal.isNone()) return Err(new RoomError('Unable to get own peer signal'));

		this._signaling_server_notifier.send({
			type: 'JOIN_HOST',
			roomId: room_id,
			signal: own_signal.unwrap()
		})

		const host_signal = await this._signaling_server_notifier.once('SIGNAL_REQUESTER');

		if (host_signal.isErr()) return Err(new SignalingServerPayloadTimeout);

		peer.signal(host_signal.unwrap().signal)

		const init_room_res = await peer.once('INIT_ROOM')

		if (init_room_res.isErr()) return Err(new SignalingServerPayloadTimeout);

		this._room_id = init_room_res.unwrap().room_id;

		peer.subscribe('ADD_STREAM', async payload => {
			this._media_manager.play(payload.stream)
			return Ok(null)
		})

		peer.subscribe('CURRENTLY_PLAYING', async payload => {
			const cast_payload = payload as unknown as MediaManagerEvents['CURRENTLY_PLAYING']
			this._media_manager.send(cast_payload);
			return Ok(null)
		})

		this._peer = peer

		return Ok(this._room_id!)
	}

	public _sendStreamToParicipants(exclude: string[] = []) {
		if (!this._media_manager.stream) throw new Error('no track to stream')

		for (const peer of this._peers) {
			if (!exclude.includes(peer.id)) {
				const res = peer.send({
					type: 'ADD_STREAM',
					stream: this._media_manager.stream
				})

				// if addStream fails we assume it got disconnected
				if (res.isErr()) {
					this._peers = this._peers.filter(p => p.id !== peer.id)
				}
			}
		}
	}

	public async playFile(file: File) {
		// FIXME: temp code to test things out
		await this._media_manager.createMediaStreamFromFile(file);
		this._media_manager.play()
		if (this._peer) {
			/// we are a 'client', send stream to 'host' who will rebroadcast to all client
			this._peer.send({
				type: 'ADD_STREAM',
				stream: this._media_manager.stream!
			})
		} else {
			/// we are the 'host', just send the stream to everyone
			this._sendStreamToParicipants()
		}
	}
}

export const room: Room = new Room({ signaling_server_notifier })
