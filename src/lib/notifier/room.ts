import { App } from '$lib/app';
import { ProxyNotifier, type Events } from './i_notifier';
import { Peer, type PeerEventTypes, type PeerEvents } from './peer';
import { Ok, type Result } from 'bakutils-catcher';

export type RoomEventTypes = 'ROOM_ID' | 'NEW_PEER' | 'JOINED' | 'USER_LIST' | 'PEER_QUIT';

export type RoomEvents = Events<
	RoomEventTypes,
	{
		ROOM_ID: { type: 'ROOM_ID'; id: string | undefined };
		NEW_PEER: { type: 'NEW_PEER'; peer: Peer };
		JOINED: { type: 'JOINED'; peer: Peer };
		USER_LIST: { type: 'USER_LIST'; users: { id: string; username: string }[] };
		PEER_QUIT: { type: 'PEER_QUIT'; id: string };
	}
>;

export class Room extends ProxyNotifier<RoomEventTypes, RoomEvents> {
	private _room_id?: string;
	private _client_peer?: Peer;
	private _members_peers: Peer[] = [];

	constructor() {
		super({
			readable_default_values: {
				ROOM_ID: { type: 'ROOM_ID', id: undefined },
				USER_LIST: { type: 'USER_LIST', users: [{ id: 'host', username: 'host' }] },
			},
		});
	}

	public get id() {
		return this._room_id;
	}

	public set id(id: string | undefined) {
		this._room_id = id;
		this._notify({ type: 'ROOM_ID', id });
	}

	public set client_peer(peer: Peer | undefined) {
		this._client_peer = peer;
		this._notify({ type: 'JOINED', peer: peer! });
	}

	public get client_peer() {
		return this._client_peer;
	}

	public get members_peers() {
		return this._members_peers;
	}

	public get is_client() {
		return this._client_peer !== undefined;
	}

	public notifyUserList() {
		const users = this._members_peers.map(p => ({ id: p.id, username: p.username }));
		users.push({ id: 'host', username: 'host' });
		this._notify({ type: 'USER_LIST', users });
		this.broadcast({ type: 'USER_LIST', users });
	}

	public addPeer(peer: Peer) {
		this._members_peers.push(peer);
		this._notify({ type: 'NEW_PEER', peer });
		this.notifyUserList();
	}

	public removePeer(id: string) {
		this._members_peers = this._members_peers.filter(p => p.id !== id);
		this._notify({ type: 'PEER_QUIT', id });
		this.notifyUserList();
	}

	public sendFile(file: File, id: string) {
		this._client_peer?.sendFile(file, id);
		return Ok(null);
	}

	public async broadcastFile(file: File, id: string, { excluded_ids }: { excluded_ids?: string[] } = {}) {
		for (const peer of this._members_peers) {
			if (!excluded_ids?.includes(peer.id)) {
				const res = await peer.sendFile(file, id);
				if (res.isNone()) {
					// this._members_peers = this._members_peers.filter(p => p.id !== peer.id);
					// this.notifyUserList();
				}
			}
		}
	}

	public async reciveFile(file_id: string, peer_id?: string) {
		if (this._client_peer) {
			return this._client_peer.receiveFile(file_id);
		}
		return this._members_peers.find(p => p.id === peer_id)!.receiveFile(file_id);
	}

	/** send a payload as a client to the host */
	public send<E extends { type: string } & Record<string, any>>(
		event: PeerEvents[PeerEventTypes] | E
	): Result<null, Error> {
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
				if (res.isErr()) {
					console.log(res.error);
					// this._members_peers = this._members_peers.filter(p => p.id !== peer.id);
					// this.notifyUserList();
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

	public async quit() {
		if (!this._client_peer) return;
		this._client_peer.quit();
	}

	public async delete() {
		if (this._client_peer) return;
		this._members_peers.forEach(p => p.quit());
		this._members_peers = [];
	}
}
