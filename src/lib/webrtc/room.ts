import { Completer } from '$lib/completer'
import { current_destination_node } from './music_streamer'
import { MuPeer } from './peer'
import { MuWebSocket } from './signaling'
import { ClientPayloadType, ServerPayloadType, type RoomId } from './types'
import { P2PPayloadType } from './types/p2p'

// FIXME: For some reason I can't put this in the class
const peers: Record<string, MuPeer> = {}

export class MuRoom {
  public client?: MuPeer

  public roomId?: string

  /// declare intent to host a room to signaling server
  // signaling server wil then return the roomId and forward peers signals that want to join this room to the host
  public async hostRoom(): Promise<RoomId> {
    const ws = new MuWebSocket()

    const id = new Completer<string>()

    await ws.init((payload) => {
      switch (payload.type) {
        /// server accept this peer as host and give it a [roomId]
        case ServerPayloadType.HOST_OK:
          this.roomId = payload.roomId
          id.complete(payload.roomId)
          break
        /// when another peer want to join the room signaling server forward its signal
        case ServerPayloadType.JOIN_OK:
          // @eslint-disable-next-line no-case-declarations
          const peer = new MuPeer()
          peer.init({ ws, on_message: () => {}, remote_peer: payload, roomId: this.roomId! })
          peers[payload.uuid] = peer
          break
      }
    })

    /// initial signal create the room
    ws.send({ type: ClientPayloadType.HOST })

    return id.future
  }

  public sendStream(stream: MediaStream) {
    for (const peer of Object.values(peers)) {
      peer.addStream(stream)
    }
  }

  public async joinRoom(roomId: string): Promise<RoomId> {
    const ws = new MuWebSocket()

    const me = new MuPeer()

    await ws.init((payload) => {
      console.log(payload)
      switch (payload.type) {
        case ServerPayloadType.SIGNAL_REQUESTER:
          console.log('got signal requester', payload)
          me.signal(payload.signal)
      }
    })

    const id = new Completer<string>()

    await me.init({
      roomId,
      ws,
      on_message: (payload) => {
        switch (payload.type) {
          case P2PPayloadType.INIT_ROOM:
            id.complete(payload.roomId)
            break
        }
      }
    })

    this.client = me

    return id.future
  }
}
