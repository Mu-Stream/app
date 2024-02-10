import { ClientPayloadType, ServerPayloadType, type ServerInitRoomPayload, type ServerPayload, type ServerSignalRequesterPayload, type ServerConnectToRoomPayload } from "./types";
import { P2PPayloadType, type P2PInitRoomPayload } from "./types/p2p";
import { Peer } from "./peer";
import { SignalingScoket } from "./signaling";

const peers: Peer[] = []


class Room {
  private _socket = new SignalingScoket()
  private _room_id?: string;
  private _peer?: Peer


  public get id() { return this._room_id }

  public async host() {
    const opened = await this._socket.isOpened

    if (!opened) throw new Error('signaling server is not reachable')

    this._socket.send({ type: ClientPayloadType.HOST })

    const res = await this._socket.waitForPayload<ServerInitRoomPayload>(ServerPayloadType.HOST_OK);

    this._room_id = res.roomId;

    /// accepts peers that want to join
    this._socket.onmessage(async (payload) => {
      switch (payload.type) {
        case ServerPayloadType.JOIN_OK:
          const peer = new Peer(false)
          peer.signal(payload.signal)
          const signal = await peer.firstSignal
          this._socket.send({ type: ClientPayloadType.SIGNAL_REQUESTER, signal, uuid: payload.uuid })
          await peer.isConnected
          peer.send({ type: P2PPayloadType.INIT_ROOM, roomId: this._room_id! })
          peers.push(peer)
          // TODO: add current muic stream && handle peer music stream
          break
      }
    })
  }

  public async join(roomId: string) {
    const opened = await this._socket.isOpened

    if (!opened) throw new Error('signaling server is not reachable')

    const peer = new Peer()

    const signal = await peer.firstSignal

    this._socket.send({ type: ClientPayloadType.JOIN_HOST, roomId, signal })


    const signal_res = await this._socket.waitForPayload<ServerSignalRequesterPayload>(ServerPayloadType.SIGNAL_REQUESTER);
    peer.signal(signal_res.signal)

    const init_room_res = await peer.waitPayload<P2PInitRoomPayload>(P2PPayloadType.INIT_ROOM)

    this._room_id = init_room_res.roomId

    this._peer = peer
  }
}

export const room: Room = new Room()
