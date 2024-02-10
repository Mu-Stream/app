import { Completer } from '$lib/completer';
import SimplePeer from 'simple-peer'
import { P2PPayloadType, type P2PPayload } from './types/p2p';

export class Peer {
  private _peer: SimplePeer.Instance;
  private _first_signal: Completer<SimplePeer.SignalData>
  private _is_connected: Completer<boolean>


  get firstSignal() { return this._first_signal.future }
  get isConnected() { return this._is_connected.future }

  constructor(initiator: boolean = true) {
    this._peer = new SimplePeer({ initiator, trickle: false })
    this._first_signal = new Completer()
    this._is_connected = new Completer()

    this._peer.once("signal", signal => this._first_signal.complete(signal))
    this._peer.once("connect", () => this._is_connected.complete(true))

    /// init renegociation process
    this._is_connected.future.then(() => {
      this._peer.on("signal", signal => this.send({ type: P2PPayloadType.RENEGOCIATE, signal }))
      this.onData();
    })
  }

  public onstream(handler: (stream: MediaStream) => void) {
    this._peer.on("stream", handler)
  }

  public send(payload: P2PPayload) {
    this._peer!.send(JSON.stringify(payload))
  }

  public waitPayload<T extends P2PPayload>(type: P2PPayloadType) {
    const p = new Completer<T>()

    this.onData(payload => {
      if (payload.type === type)
        p.complete(payload as T)
    })

    return p.future;
  }


  public onData(handler?: (payload: P2PPayload) => void) {
    this._peer.on("data", data => {
      /// handle renegociation should always be present
      const payload: P2PPayload = JSON.parse(data)
      if (payload.type === P2PPayloadType.RENEGOCIATE) {
        this.signal(payload.signal)
      }
      handler && handler(payload)
    })
  }


  public signal(signal: SimplePeer.SignalData) {
    this._peer.signal(signal)
  }
}
