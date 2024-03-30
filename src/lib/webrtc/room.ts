import { PeerPayloadType, PeerNotifier } from "./peer";
import {
	SignalingGetPayloadType,
	type SignalingGetPayloads,
	signaling_server_notifier,
	SignalingServerNotifier,
} from "./signaling";

import { MediaManager } from "./music_streamer";
import { ClientPayloadType } from "./types/client";
import { Err, Ok, type Result } from "bakutils-catcher";
import { ListenerError, type Listener } from "$lib/i_notifier";

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

	public get id() { return this._room_id }

	public get users() {
		return [...this._peers.map(p => ({ id: p.id, name: p.id })), { id: 'host', name: 'host' }]
	}

	constructor({ signaling_server_notifier }: { signaling_server_notifier: SignalingServerNotifier }) {
		this._signaling_server_notifier = signaling_server_notifier;

	}

	private _registerNewPeer: Listener<SignalingGetPayloads[SignalingGetPayloadType.JOIN_OK]> =
		async (payload) => {
			const peer = new PeerNotifier({ initiator: false })

			peer.signal(payload.signal)

			const signal = await peer.initial_signal

			if (signal.isNone())
				return Err(new UnableToRetrivePeerSignal);

			this._signaling_server_notifier.send({
				type: ClientPayloadType.SIGNAL_REQUESTER,
				signal: signal.unwrap(),
				uuid: payload.uuid
			})

			if ((await peer.link_done).isNone())
				return Err(new ListenerError('Unable to connect to peer'));

			peer.send({ type: PeerPayloadType.INIT_ROOM, room_id: this._room_id! })

			this._peers.push(peer)

			// there is a current music playing, send it to the new client
			if (this._media_manager.stream) {
				peer.send({
					type: PeerPayloadType.ADD_STREAM,
					stream: this._media_manager.stream
				})
			}

			// TODO: refacto with media manager
			peer.subscribe(PeerPayloadType.ADD_STREAM, async payload => {
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

		this._signaling_server_notifier.send({ type: ClientPayloadType.HOST })

		const payload = await this._signaling_server_notifier.once(SignalingGetPayloadType.HOST_OK);

		if (payload.isErr()) return Err(new SignalingServerPayloadTimeout);

		this._room_id = payload.unwrap().roomId;

		this._signaling_server_notifier.subscribe(SignalingGetPayloadType.JOIN_OK, this._registerNewPeer)

		return Ok(this._room_id!);
	}

	public async join(room_id: string): Promise<Result<string, RoomError>> {
		const opened = await this._signaling_server_notifier.is_opened;

		if (opened.isNone()) return Err(new SignalingServerNotReady);

		const peer = new PeerNotifier({ initiator: true })

		const own_signal = await peer.initial_signal

		if (own_signal.isNone()) return Err(new RoomError('Unable to get own peer signal'));

		this._signaling_server_notifier.send({
			type: ClientPayloadType.JOIN_HOST,
			roomId: room_id,
			signal: own_signal.unwrap()
		})

		const host_signal = await this._signaling_server_notifier.once(SignalingGetPayloadType.SIGNAL_REQUESTER);

		if (host_signal.isErr()) return Err(new SignalingServerPayloadTimeout);

		peer.signal(host_signal.unwrap().signal)

		const init_room_res = await peer.once(PeerPayloadType.INIT_ROOM)

		if (init_room_res.isErr()) return Err(new SignalingServerPayloadTimeout);

		this._room_id = init_room_res.unwrap().room_id;

		// TODO: move this to a 'media manager' when reworked
		peer.subscribe(PeerPayloadType.ADD_STREAM, async payload => {
			this._media_manager.play(payload.stream)
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
					type: PeerPayloadType.ADD_STREAM,
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
				type: PeerPayloadType.ADD_STREAM,
				stream: this._media_manager.stream!
			})
		} else {
			/// we are the 'host', just send the stream to everyone
			this._sendStreamToParicipants()
		}
	}
}

export const room: Room = new Room({ signaling_server_notifier })
