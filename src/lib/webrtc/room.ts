import { P2PPayloadType, type P2PInitRoomPayload } from "./types/p2p";
import { Peer } from "./peer";
import { SignalingScoket } from "./signaling";
import { MuMediaManager } from "./music_streamer";
import { ClientPayloadType } from "./types/client";
import { ServerPayloadType, type ServerInitRoomPayload, type ServerSignalRequesterPayload } from "./types/server";

class Room {
  private _socket = new SignalingScoket()
  private _room_id?: string;
  private _peer?: Peer
  private _peers: Peer[] = []
  private _media_manager: MuMediaManager = new MuMediaManager()

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
          const peer = new Peer({ initiator: false })
          peer.signal(payload.signal)
          const signal = await peer.firstSignal
          this._socket.send({ type: ClientPayloadType.SIGNAL_REQUESTER, signal, uuid: payload.uuid })
          await peer.isConnected
          peer.send({ type: P2PPayloadType.INIT_ROOM, roomId: this._room_id! })
          this._peers.push(peer)
          if (this._media_manager.media_stream) {
            peer.addStream(this._media_manager.media_stream)
          }
          peer.onstream(stream => {
            this._media_manager.remote_media_stream = stream
            this._sendStreamToParicipants([peer.id])
            const audio = new Audio()
            audio.srcObject = stream
            audio.play()
          })
          break
      }
    })
  }

  public async join(roomId: string) {
    const opened = await this._socket.isOpened

    if (!opened) throw new Error('signaling server is not reachable')

    const peer = new Peer({ initiator: true })

    const signal = await peer.firstSignal

    this._socket.send({ type: ClientPayloadType.JOIN_HOST, roomId, signal })


    const signal_res = await this._socket.waitForPayload<ServerSignalRequesterPayload>(ServerPayloadType.SIGNAL_REQUESTER);
    peer.signal(signal_res.signal)

    const init_room_res = await peer.waitForPayload<P2PInitRoomPayload>(P2PPayloadType.INIT_ROOM)

    this._room_id = init_room_res.roomId

    peer.onstream(stream => {
      // FIXME: temp code to test things out
      const audio = new Audio()
      audio.srcObject = stream
      audio.play()
    })

    this._peer = peer
  }

  public _sendStreamToParicipants(exclude: string[] = []) {
    if (!this._media_manager.media_stream) throw new Error('no track to stream')

    for (const peer of this._peers) {
      if (!exclude.includes(peer.id)) {
        try {
          // if this fail we assume peer got disconnected
          peer.addStream(this._media_manager.media_stream)
        } catch (e) {
          this._peers = this._peers.filter(p => p.id !== peer.id)
        }
      }
    }
  }

  public async addFileToPlaylist(file: File) {
    // FIXME: temp code to test things out
    await this._media_manager.initMediaSource(file);
    this._media_manager.play()
    // ugly but this permit to send the stream to the 'hoster' who will rebroadcast
    if (this._media_manager.remote_media_stream)
      this._sendStreamToParicipants()
    else
      this._peer?.addStream(this._media_manager.media_stream!)
  }
}

export const room: Room = new Room()
