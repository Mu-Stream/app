import { MuPeer } from './peer'
import { MuWebSocket } from './signaling'
import { ClientPayloadType, ServerPayloadType, type RoomId } from './types'
import { P2PPayloadType } from './types/p2p'

// FIXME: For some reason I can't put this in the class
const peers: Record<string, MuPeer> = {}

export class MuRoom {
  public client?: MuPeer

  public roomId?: string

  constructor() {}

  /// declare intent to host a room to signaling server
  // signaling server wil then return the roomId and forward peers signals that want to join this room to the host
  public async hostRoom(): Promise<RoomId> {
    const ws = new MuWebSocket()
    let wsInit: Promise<void>

    const id = new Promise<RoomId>((resolve) => {
      wsInit = ws.init((payload) => {
        console.debug(payload)
        switch (payload.type) {
          /// server accept this peer as host and give it a [roomId]
          case ServerPayloadType.HOST_OK:
            this.roomId = payload.roomId
            resolve(payload.roomId)
            console.log(payload.roomId)
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
    })
    /// initial signal create the room
    await wsInit!
    ws.send({ type: ClientPayloadType.HOST })
    return id
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

    let meInit: Promise<void>

    const id = new Promise<RoomId>((resolve) => {
      meInit = me.init({
        roomId,
        ws,
        on_message: (payload) => {
          switch (payload.type) {
            case P2PPayloadType.INIT_ROOM:
              resolve(payload.roomId)
              break
          }
        }
      })
    })

    await meInit!

    me.onStream((stream) => {
      const audio = new Audio()
      audio.srcObject = stream
      audio.play()
    })

    this.client = me
    return id
  }
}
