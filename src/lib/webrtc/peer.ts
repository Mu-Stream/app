import Peer from 'simple-peer'
import { ClientPayloadType, type Signal } from './types'
import type { MuWebSocket } from './signaling'
import { P2PPayloadType, type P2PPayload } from './types/p2p'

export class MuPeer {
  private peer?: Peer.Instance

  public async init({
    on_message,
    remote_peer,
    ws,
    roomId
  }: {
    on_message: (payload: P2PPayload) => void
    remote_peer?: { uuid: string; signal: Signal }
    ws: MuWebSocket
    roomId?: string
  }) {
    this.peer = remote_peer
      ? new Peer({ initiator: false, trickle: false })
      : new Peer({ initiator: true, trickle: false })

    if (remote_peer) {
      // register peer
      this.peer.signal(remote_peer.signal)
      // send back host signal to peer once
      await new Promise<void>((resolve) => {
        this.peer!.once('signal', (signal) => {
          ws.send({
            type: ClientPayloadType.SIGNAL_REQUESTER,
            signal,
            uuid: remote_peer.uuid
          })
          resolve()
        })
      })
    } else {
      await new Promise<void>((resolve) => {
        this.peer!.once('signal', (signal) => {
          console.info('sending Join host request')
          ws.send({
            type: ClientPayloadType.JOIN_HOST,
            roomId: roomId!,
            signal
          })
          resolve()
        })
      })
    }

    /// renegociate logic does not need to use signaling server
    /// just use the existing peer connection
    this.peer.on('signal', (signal) => {
      this.send({ type: P2PPayloadType.RENEGOCIATE, signal })
    })

    this.peer.on('data', (data) => {
      const payload: P2PPayload = JSON.parse(data)
      if (payload.type === P2PPayloadType.RENEGOCIATE) {
        this.signal(payload.signal)
      }
      on_message(payload)
    })
    ////
  }

  public send(payload: P2PPayload) {
    this.peer!.send(JSON.stringify(payload))
  }

  public signal(signal: Signal) {
    this.peer!.signal(signal)
  }

  public onStream(on_stream: (stream: MediaStream) => void) {
    this.peer!.on('stream', on_stream)
  }

  public addStream(stream: MediaStream) {
    this.peer!.addStream(stream)
  }
}
