import Peer from 'simple-peer'
import { ClientPayloadType, type Signal } from './types'
import type { MuWebSocket } from './signaling'
import { P2PPayloadType, type P2PPayload } from './types/p2p'
import { Completer } from '$lib/completer'
import { current_destination_node } from './music_streamer'

export class MuPeer {
  private peer?: Peer.Instance

  private _setupRenegociation() {
    this.peer!.on('signal', (signal) => {
      this.send({ type: P2PPayloadType.RENEGOCIATE, signal })
    })
  }

  public async init({
    on_message,
    remote_peer,
    ws,
    roomId
  }: {
    on_message: (payload: P2PPayload) => void
    remote_peer?: { uuid: string; signal: Signal }
    ws: MuWebSocket
    roomId: string
  }) {
    this.peer = remote_peer
      ? new Peer({ initiator: false, trickle: false })
      : new Peer({ initiator: true, trickle: false })

    const init = new Completer<void>()

    if (remote_peer) {
      // register peer
      this.peer.signal(remote_peer.signal)

      // send back host signal to peer once
      this.peer!.once('signal', (signal) => {
        ws.send({
          type: ClientPayloadType.SIGNAL_REQUESTER,
          signal,
          uuid: remote_peer.uuid
        })
        this.peer!.once('connect', () => {
          this.send({ type: P2PPayloadType.INIT_ROOM, roomId: roomId! })
          // FIXME: FIND BETTER WAY TO DO ALL THIS STUFF
          if (current_destination_node) {
            this.addStream(current_destination_node.stream)
          }
        })
        init.complete()
      })
    } else {
      this.peer!.once('signal', (signal) => {
        console.info('sending Join host request')
        ws.send({
          type: ClientPayloadType.JOIN_HOST,
          roomId: roomId!,
          signal
        })
        init.complete()
      })
      this.onStream((stream) => {
        console.log('recived stream')
        const audio = new Audio()
        audio.srcObject = stream
        audio.play()
      })
    }

    await init.future

    this._setupRenegociation()

    this.peer.on('data', (data) => {
      const payload: P2PPayload = JSON.parse(data)
      if (payload.type === P2PPayloadType.RENEGOCIATE) {
        this.signal(payload.signal)
      }
      on_message(payload)
    })
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
