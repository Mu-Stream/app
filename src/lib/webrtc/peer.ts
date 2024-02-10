import { Completer } from '$lib/completer';
import { v4 } from 'uuid'
import SimplePeer from 'simple-peer'
import { P2PPayloadType, type P2PPayload } from './types/p2p';

export class Peer {
  private _unique_identifier = v4()
  private _peer: SimplePeer.Instance;
  private _first_signal: Completer<SimplePeer.SignalData>
  private _is_connected: Completer<boolean>
  private _current_data_listener?: (data: any) => void;
  private _current_stream_listener?: (stream: MediaStream) => void;


  get firstSignal() { return this._first_signal.future }
  get isConnected() { return this._is_connected.future }
  get id() { return this._unique_identifier }

  constructor(initiator: boolean = true) {
    this._peer = new SimplePeer({ initiator, trickle: false })
    this._first_signal = new Completer()
    this._is_connected = new Completer()


    this._peer.once("signal", signal => this._first_signal.complete(signal))
    this._peer.once("connect", () => this._is_connected.complete(true))

    this.isConnected.then(() => {
      /// init renegociation process
      this._is_connected.future.then(() => {
        this._peer.on("signal", signal => this.send({ type: P2PPayloadType.RENEGOCIATE, signal }))
        this.onData();
      })
    })
  }

  public onstream(handler: (stream: MediaStream) => void) {
    if (this._current_stream_listener)
      this._peer.removeListener("stream", this._current_stream_listener)

    this._current_stream_listener = handler

    this._peer.on("stream", this._current_stream_listener)
  }

  public addStream(stream: MediaStream) {
    this._peer.addStream(stream)
  }

  public send(payload: P2PPayload) {
    this._peer!.send(JSON.stringify(payload))
  }

  public async waitForPayload<T extends P2PPayload>(type: P2PPayloadType) {
    const p = new Completer<T>()

    const listener = (data: any) => {
      const payload: T = JSON.parse(data)
      p.complete(payload)
    }

    this._peer.on("data", listener)

    await p.future

    this._peer.removeListener("data", listener)

    return p.future;
  }


  public onData(handler?: (payload: P2PPayload) => void) {
    // we need to store the last handler else they cumulate
    if (this._current_data_listener)
      this._peer.removeListener("data", this._current_data_listener)

    this._current_data_listener = data => {
      /// handle renegociation should always be present
      const payload: P2PPayload = JSON.parse(data)
      if (payload.type === P2PPayloadType.RENEGOCIATE) {
        console.info('renegociating...')
        this.signal(payload.signal)
      }
      handler && handler(payload)
    }

    this._peer.on("data", this._current_data_listener)
  }

  public onClose(handlder: () => void) {
    this._peer.on("close", handlder);
  }

  public signal(signal: SimplePeer.SignalData) {
    this._peer.signal(signal)
  }
}
