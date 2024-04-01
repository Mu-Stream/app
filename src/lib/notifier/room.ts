import { AudioManager } from "./audio_manager";
import { Notifier, type Events } from "./i_notifier";
import { Peer, type PeerEventTypes, type PeerEvents } from "./peer";
import { Ok, type Result } from "bakutils-catcher";

type RoomEventTypes = 'ROOM_ID' | "CURRENTLY_PLAYING";

export type RoomEvents = Events<RoomEventTypes, {
	ROOM_ID: { type: 'ROOM_ID', id: string | undefined },
	CURRENTLY_PLAYING: {
		type: 'CURRENTLY_PLAYING',
		current_time: number,
		total_time: number,
		status: 'PLAYING' | 'PAUSED',
	}
}>

export class Room extends Notifier<RoomEventTypes, RoomEvents> {
	// FIXME: send should not be in Notifier class, because all notifier does not have a send method
	public send(_: RoomEvents[RoomEventTypes]): Result<null, Error> {
		throw new Error("Method not implemented.");
	}

	private _room_id?: string;
	private _client_peer?: Peer
	private _members_peers: Peer[] = []

	public get id() { return this._room_id }
	public set id(id: string | undefined) {
		this._room_id = id
		this.notify({ type: 'ROOM_ID', id })
	}

	public get users() {
		return [...this._members_peers.map(p => ({ id: p.id, name: p.id })), { id: 'host', name: 'host' }]
	}

	public get client_peer() { return this._client_peer }
	public set client_peer(peer: Peer | undefined) { this._client_peer = peer }

	public get members_peers() { return this._members_peers }

	private static _instance: Room;

	public static get instance() { return this._instance ??= new Room() }

	private constructor() {
		super({
			readable_default_values: {
				ROOM_ID: { type: 'ROOM_ID', id: undefined },
				CURRENTLY_PLAYING: { type: 'CURRENTLY_PLAYING', status: 'PAUSED', total_time: 0, current_time: 0 }
			}
		})
	}

	public broadcast(event: PeerEvents[PeerEventTypes], { excluded_ids }: { excluded_ids?: string[] } = {}): Result<null, Error> {
		for (const peer of this._members_peers) {
			if (!excluded_ids?.includes(peer.id)) {
				const res = peer.send(event);
				if (res.isErr()) {
					this._members_peers = this._members_peers.filter(p => p.id !== peer.id)
				}
			}
		}
		return Ok(null);
	}

	public async playFile(file: File) {
		await AudioManager.instance.playLocal(file);

		const event: PeerEvents['ADD_STREAM'] = {
			type: 'ADD_STREAM',
			stream: AudioManager.instance.stream!
		};

		if (this._client_peer) {
			/// we are a 'client', send stream to 'host' who will rebroadcast to all client
			this._client_peer.send(event)
		} else {
			/// we are the 'host', broadcast stream to all clients 
			this.broadcast(event)
		}
	}
}
