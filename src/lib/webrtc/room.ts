import { P2PPayloadType, type P2PInitRoomPayload } from "./types/p2p";
import { Peer } from "./peer";
import { SignalingServerNotifier, type ServerPayload } from "./signaling";
import { MediaManager } from "./music_streamer";
import { ClientPayloadType } from "./types/client";
import { ServerPayloadType } from "./types/server";
import { Err, Ok, type Result } from "bakutils-catcher";
import { ListenerError } from "$lib/i_notifier";

class UnableToRetrivePeerSignal extends ListenerError { }

class Room {
	private _socket = new SignalingServerNotifier()
	private _room_id?: string;
	private _peer?: Peer
	private _peers: Peer[] = []
	private _media_manager: MediaManager = new MediaManager()

	public get id() { return this._room_id }

	public get users() {
		return [...this._peers.map(p => ({ id: p.id, name: p.id })), { id: 'host', name: 'host' }]
	}

	private async _registerNewPeer(payload: ServerPayload[ServerPayloadType.JOIN_OK]): Promise<Result<null, ListenerError>> {
		const peer = new Peer({ initiator: false })

		peer.signal(payload.signal)

		const signal = await peer.firstSignal

		if (signal.isNone()) return Err(new UnableToRetrivePeerSignal);

		this._socket.send({ type: ClientPayloadType.SIGNAL_REQUESTER, signal: signal.unwrap(), uuid: payload.uuid })

		await peer.isConnected

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

	public async host(): Promise<Result<string, string>> {
		const opened = await this._socket.is_opened;

		if (opened.isNone()) return Err("Unable to connect to signaling server");

		this._socket.send({ type: ClientPayloadType.HOST })

		const payload = await this._socket.singleSubscribe(ServerPayloadType.HOST_OK);

		if (payload.isErr()) return Err("Unable to get HOST_OK from signaling server");

		this._room_id = payload.unwrap().roomId;

		this._socket.subscribe(ServerPayloadType.JOIN_OK, this._registerNewPeer)

		return Ok(this._room_id!);
	}

	public async join(roomId: string): Promise<Result<string, string>> {
		const opened = await this._socket.is_opened;

		if (opened.isNone()) return Err("Unable to connect to signaling server");

		const peer = new Peer({ initiator: true })

		const signal = await peer.firstSignal

		if (signal.isNone()) return Err("Unable to get SIGNAL_REQUESTER from signaling server")

		this._socket.send({
			type: ClientPayloadType.JOIN_HOST,
			roomId,
			signal: signal.unwrap()
		})

		const signal_res = await this._socket.singleSubscribe(ServerPayloadType.SIGNAL_REQUESTER);

		if (signal_res.isErr()) return Err("Unable to get SIGNAL_REQUESTER from signaling server");

		peer.signal(signal_res.unwrap().signal)

		const init_room_res = await peer.waitForPayload<P2PInitRoomPayload>(P2PPayloadType.INIT_ROOM)

		if (init_room_res.isNone()) return Err("Unable to get INIT_ROOM from signaling server");

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

export const room: Room = new Room()
