import { P2PPayloadType, type P2PInitRoomPayload } from "./types/p2p";
import { Peer } from "./peer";
import {
	SignalingGetPayloadType,
	type SignalingGetPayloads,
	signaling_server_notifier,
	SignalingServerNotifier,
} from "./signaling";

import { MediaManager } from "./music_streamer";
import { ClientPayloadType } from "./types/client";
import { Err, Ok, type Result } from "bakutils-catcher";
import { ListenerError } from "$lib/i_notifier";

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
	private _peer?: Peer
	private _peers: Peer[] = []
	private _media_manager: MediaManager = new MediaManager()
	private _signaling_server_notifier: SignalingServerNotifier;

	public get id() { return this._room_id }

	public get users() {
		return [...this._peers.map(p => ({ id: p.id, name: p.id })), { id: 'host', name: 'host' }]
	}

	constructor({ signaling_server_notifier }: { signaling_server_notifier: SignalingServerNotifier }) {
		this._signaling_server_notifier = signaling_server_notifier;

	}

	private async _registerNewPeer(payload: SignalingGetPayloads[SignalingGetPayloadType.JOIN_OK]): Promise<Result<null, ListenerError>> {
		const peer = new Peer({ initiator: false })

		peer.signal(payload.signal)

		const signal = await peer.firstSignal

		if (signal.isNone()) return Err(new UnableToRetrivePeerSignal);

		this._signaling_server_notifier.send({
			type: ClientPayloadType.SIGNAL_REQUESTER,
			signal: signal.unwrap(),
			uuid: payload.uuid
		})

		if ((await peer.isConnected).isNone()) return Err(new ListenerError('Unable to connect to peer'));

		peer.send({ type: P2PPayloadType.INIT_ROOM, roomId: this._room_id! })

		this._peers.push(peer)

		// there is a current music playing, send it to the new client
		if (this._media_manager.stream) {
			peer.addStream(this._media_manager.stream)
		}

		peer.onstream(stream => {
			console.log('recived stream from client')
			// 'client' sent us a stream so we play it and rebroadcast to other clients
			this._media_manager.play(stream)
			this._sendStreamToParicipants([peer.id])
		})

		return Ok(null)
	}

	public async host(): Promise<Result<string, RoomError>> {
		if ((await this._signaling_server_notifier.is_opened).isNone()) return Err(new SignalingServerNotReady);

		this._signaling_server_notifier.send({ type: ClientPayloadType.HOST })

		const payload = await this._signaling_server_notifier.singleSubscribe(SignalingGetPayloadType.HOST_OK);

		if (payload.isErr()) return Err(new SignalingServerPayloadTimeout);

		this._room_id = payload.unwrap().roomId;

		this._signaling_server_notifier.subscribe(SignalingGetPayloadType.JOIN_OK, (p) => this._registerNewPeer(p))

		return Ok(this._room_id!);
	}

	public async join(roomId: string): Promise<Result<string, RoomError>> {
		const opened = await this._signaling_server_notifier.is_opened;

		if (opened.isNone()) return Err(new SignalingServerNotReady);

		const peer = new Peer({ initiator: true })

		const own_signal = await peer.firstSignal

		if (own_signal.isNone()) return Err(new RoomError('Unable to get own peer signal'));

		this._signaling_server_notifier.send({
			type: ClientPayloadType.JOIN_HOST,
			roomId,
			signal: own_signal.unwrap()
		})

		const host_signal = await this._signaling_server_notifier.singleSubscribe(SignalingGetPayloadType.SIGNAL_REQUESTER);

		if (host_signal.isErr()) return Err(new SignalingServerPayloadTimeout);

		peer.signal(host_signal.unwrap().signal)

		const init_room_res = await peer.waitForPayload<P2PInitRoomPayload>(P2PPayloadType.INIT_ROOM)

		if (init_room_res.isNone()) return Err(new SignalingServerPayloadTimeout);

		this._room_id = init_room_res.unwrap().roomId;

		peer.onstream(stream => {
			this._media_manager.play(stream)
		})

		this._peer = peer

		return Ok(this._room_id!)
	}

	public _sendStreamToParicipants(exclude: string[] = []) {
		if (!this._media_manager.stream) throw new Error('no track to stream')

		for (const peer of this._peers) {
			if (!exclude.includes(peer.id)) {
				try {
					// if this fail we assume peer got disconnected
					peer.addStream(this._media_manager.stream)
				} catch (e) {
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
			this._peer?.addStream(this._media_manager.stream!)
		} else {
			/// we are the 'host', just send the stream to everyone
			this._sendStreamToParicipants()
		}
	}
}

export const room: Room = new Room({ signaling_server_notifier })
