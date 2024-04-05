import { App } from '$lib/app';
import { ProxyNotifier, type Events } from './i_notifier';
import { Peer, type PeerEventTypes, type PeerEvents } from './peer';
import { Ok, type Result } from 'bakutils-catcher';

export type RoomEventTypes = 'ROOM_ID' | 'NEW_PEER' | 'JOINED';

export type RoomEvents = Events<
	RoomEventTypes,
	{
		ROOM_ID: { type: 'ROOM_ID'; id: string | undefined };
		NEW_PEER: { type: 'NEW_PEER'; peer: Peer };
		JOINED: { type: 'JOINED'; peer: Peer };
	}
>;

export class Room extends ProxyNotifier<RoomEventTypes, RoomEvents> {
	private _room_id?: string;
	private _client_peer?: Peer;
	private _members_peers: Peer[] = [];

	public get id() {
		return this._room_id;
	}
	public set id(id: string | undefined) {
		this._room_id = id;
		this._notify({ type: 'ROOM_ID', id });
	}

	public get users() {
		return [...this._members_peers.map(p => ({ id: p.id, name: p.id })), { id: 'host', name: 'host' }];
	}

	public set client_peer(peer: Peer | undefined) {
		this._client_peer = peer;
		this._notify({ type: 'JOINED', peer: peer! });
	}

	public get members_peers() {
		return this._members_peers;
	}

	public addPeer(peer: Peer) {
		this._members_peers.push(peer);
		this._notify({ type: 'NEW_PEER', peer });
	}

	constructor() {
		super({
			readable_default_values: {
				ROOM_ID: { type: 'ROOM_ID', id: undefined },
			},
		});
	}

	/** send a payload has a client to the host */
	public send<E extends { type: string } & Record<string, any>>(event: PeerEvents[PeerEventTypes] | E): Result<null, Error> {
		this._client_peer?.send(event as PeerEvents[PeerEventTypes]);
		return Ok(null);
	}

	public broadcast<E extends { type: string } & Record<string, any>>(
		event: PeerEvents[PeerEventTypes] | E,
		{ excluded_ids }: { excluded_ids?: string[] } = {}
	): Result<null, Error> {
		for (const peer of this._members_peers) {
			if (!excluded_ids?.includes(peer.id)) {
				const res = peer.send(event as PeerEvents[PeerEventTypes]);
				// failing means disconnect (for now)
				if (res.isErr()) {
					this._members_peers = this._members_peers.filter(p => p.id !== peer.id);
				}
			}
		}
		return Ok(null);
	}

	public async playFile(file: File) {
		await App.instance.context.audio_manager.playLocal(file);

		const event: PeerEvents['ADD_STREAM'] = {
			type: 'ADD_STREAM',
			stream: App.instance.context.audio_manager.stream!,
		};

		if (this._client_peer) {
			/// we are a 'client', send stream to 'host' who will rebroadcast to all client
			this._client_peer.send(event);
		} else {
			/// we are the 'host', broadcast stream to all clients
			this.broadcast(event);
		}
	}
}
