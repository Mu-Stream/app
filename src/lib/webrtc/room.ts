import { P2PPayloadType, type P2PInitRoomPayload, type P2PEmotePayload } from "./types/p2p";
import { Peer } from "./peer";
import { SignalingScoket } from "./signaling";
import { MediaManager } from "./music_streamer";
import { ClientPayloadType } from "./types/client";
import { ServerPayloadType, type ServerInitRoomPayload, type ServerSignalRequesterPayload } from "./types/server";
import type { Emotes } from "./types/emotes";

class Room {
  private _socket = new SignalingScoket()
  private _room_id?: string;
  private _peer?: Peer
  private _peers: Peer[] = []
  private _media_manager: MediaManager = new MediaManager()
  private currentEmote?: Emotes
  private emoteChangedFunction? : (emote: Emotes) => void

  public set emoteChanged(emoteChanged : (emote: Emotes) => void) { this.emoteChangedFunction = emoteChanged}

  public get emote() { return this.currentEmote!}
  public set emote(emote: Emotes) {
    this.currentEmote = emote
    this.emoteChangedFunction!(emote)
  }

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
          peer.onData(data => {
            console.log('recived data from client')
            if(data.type === P2PPayloadType.EMOTE){
              this._sendEmoticonToParicipants(data, [peer.id])
            }
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
      this._media_manager.play(stream)
    })

    peer.onData(data => {
      if(data.type === P2PPayloadType.EMOTE)
        this.emote = data.emote
    })

    this._peer = peer
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

  public _sendEmoticonToParicipants(emote: P2PEmotePayload, exclude: string[] = []) {
    this.emote = emote.emote
    if (this._peer) {
      this._peer.send(emote)
    }
    else{
      for (const peer of this._peers) {
        if (!exclude.includes(peer.id)) {
          try {
            // if this fail we assume peer got disconnected
            peer.send(emote)
          } catch (e) {
            this._peers = this._peers.filter(p => p.id !== peer.id)
          }
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
