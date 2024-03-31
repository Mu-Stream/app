import { Peer, type PeerEventTypes, type PeerEvents } from "./peer";
import {
	type SignalingEvent,
	SignalingServer,
} from "./signaling";

import { MediaManager, type MediaManagerEvents } from "./media_manager";
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

class PeerLinkingFailed extends RoomError {
	constructor() { super('Peer linking failed') }
}

export class Room {
	private _room_id?: string;
	private _peer?: Peer
	private _peers: Peer[] = []

	public get id() { return this._room_id }

	public get users() {
		return [...this._peers.map(p => ({ id: p.id, name: p.id })), { id: 'host', name: 'host' }]
	}

	public get peer() { return this._peer }

	private static _instance: Room;

	public static get instance() { return this._instance ??= new Room() }

	private constructor() { }

	private _broadcastSongProgressToParticipant: Listener<MediaManagerEvents['CURRENTLY_PLAYING']> = async payload => {
		this._peers.forEach(p => p.send(payload))
		return Ok(null)
	}

	private _registerPeer: Listener<SignalingEvent['JOIN_OK']> =
		async (payload) => {
			const peer = new Peer({ initiator: false, username: payload.username })
			peer.signal(payload.signal)
			const signal = await peer.initial_signal

			if (signal.isNone()) return Err(new UnableToRetrivePeerSignal);

			SignalingServer.instance.send({
				type: 'SIGNAL_REQUESTER',
				signal: signal.unwrap(),
				uuid: payload.uuid,
				username: payload.username,
			})

			if ((await peer.link_done).isNone()) return Err(new PeerLinkingFailed);

			peer.send({ type: 'INIT_ROOM', room_id: this._room_id! })

			this._peers.push(peer)

			// there is a current music playing, send it to the new client
			if (MediaManager.instance.stream) {
				peer.send({
					type: 'ADD_STREAM',
					stream: MediaManager.instance.stream
				})
			}

			peer.subscribe('ADD_STREAM', async payload => {
				MediaManager.instance.playRemote(payload.stream)
				this._broadcast(payload, [peer.id])
				return Ok(null)
			})

			peer.subscribe('CURRENTLY_PLAYING', MediaManager.instance.bind)

			return Ok(null)
		}

	public async host(): Promise<Result<string, RoomError>> {
		if ((await SignalingServer.instance.is_opened).isNone()) return Err(new SignalingServerNotReady);

		SignalingServer.instance.send({ type: 'HOST' })

		const payload = await SignalingServer.instance.once('HOST_OK');

		if (payload.isErr()) return Err(new SignalingServerPayloadTimeout);

		this._room_id = payload.unwrap().roomId;

		SignalingServer.instance.subscribe('JOIN_OK', this._registerPeer)

		MediaManager.instance.subscribe('CURRENTLY_PLAYING', this._broadcastSongProgressToParticipant);

		return Ok(this._room_id!);
	}

	public async join(room_id: string, username: string): Promise<Result<string, RoomError>> {
		const opened = await SignalingServer.instance.is_opened;

		if (opened.isNone()) return Err(new SignalingServerNotReady);

		const peer = new Peer({ initiator: true, username })

		const own_signal = await peer.initial_signal

		if (own_signal.isNone()) return Err(new PeerLinkingFailed);

		SignalingServer.instance.send({
			type: 'JOIN_HOST',
			roomId: room_id,
			signal: own_signal.unwrap()
		})

		const host_signal = await SignalingServer.instance.once('SIGNAL_REQUESTER');

		if (host_signal.isErr()) return Err(new SignalingServerPayloadTimeout);

		peer.signal(host_signal.unwrap().signal)

		const init_room_res = await peer.once('INIT_ROOM')

		if (init_room_res.isErr()) return Err(new SignalingServerPayloadTimeout);

		this._room_id = init_room_res.unwrap().room_id;

		peer.subscribe('ADD_STREAM', async payload => {
			/// play the stream
			MediaManager.instance.playRemote(payload.stream)
			/// re-broadcast to all clients
			this._broadcast(payload, [peer.id])
			return Ok(null)
		})

		peer.subscribe('CURRENTLY_PLAYING', MediaManager.instance.bind);

		this._peer = peer

		return Ok(this._room_id!)
	}

	private _broadcast(event: PeerEvents[PeerEventTypes], excluded_ids?: string[]) {
		for (const peer of this._peers) {
			if (!excluded_ids?.includes(peer.id)) {
				const res = peer.send(event);
				if (res.isErr()) {
					this._peers = this._peers.filter(p => p.id !== peer.id)
				}
			}
		}

	}

	public async playFile(file: File) {
		await MediaManager.instance.playLocal(file);

		const event: PeerEvents['ADD_STREAM'] = {
			type: 'ADD_STREAM',
			stream: MediaManager.instance.stream!
		};

		if (this._peer) {
			/// we are a 'client', send stream to 'host' who will rebroadcast to all client
			this._peer.send(event)
		} else {
			/// we are the 'host', broadcast stream to all clients 
			this._broadcast(event)
		}
	}
}
