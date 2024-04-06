import { Completer } from '$lib/completer';
import { v4 } from 'uuid';
import SimplePeer from 'simple-peer';
import { Err, Ok, type Result } from 'bakutils-catcher';
import { ProxyNotifier, type Events, type Listener, type Subscription } from './i_notifier';
import type { Binder } from '$lib/plugins/i_plugin';

export type WithPeerIentity<E extends Record<string, unknown>> = E & {
  identity: string;
};

export type PeerEventTypes = 'INIT_ROOM' | 'RENEGOCIATE' | 'ADD_STREAM' | 'CURRENTLY_PLAYING' | 'PAUSE' | 'RESUME';

export type PeerEvents = Events<
  PeerEventTypes,
  {
    INIT_ROOM: {
      type: 'INIT_ROOM';
      room_id: string;
    };
    RENEGOCIATE: {
      type: 'RENEGOCIATE';
      signal: SimplePeer.SignalData;
    };
    ADD_STREAM: {
      type: 'ADD_STREAM';
      stream: MediaStream;
    };
    CURRENTLY_PLAYING: {
      type: 'CURRENTLY_PLAYING';
      current_time: number;
      total_time: number;
      status: 'PLAYING' | 'PAUSED';
    };
    PAUSE: {
      type: 'PAUSE';
    };
    RESUME: {
      type: 'RESUME';
    };
  }
>;

export class Peer extends ProxyNotifier<PeerEventTypes, PeerEvents> {
  private _id = v4();
  private _username: string;
  private _peer: SimplePeer.Instance;

  private _initial_signal: Completer<SimplePeer.SignalData> = new Completer();
  private _link_done: Completer<true> = new Completer();

  public get id() {
    return this._id;
  }
  public get username() {
    return this._username;
  }
  public get initial_signal() {
    return this._initial_signal.future;
  }
  public get link_done() {
    return this._link_done.future;
  }

  constructor({ initiator, username }: { initiator: boolean; username: string }) {
    super();
    this._username = username;
    this._peer = new SimplePeer({ initiator, trickle: false });
    this._peer.once('signal', singal => this._initial_signal.completeValue(singal));
    this._peer.once('connect', () => this._link_done.completeValue(true));

    // when first connection is established
    this._link_done.future.then(done =>
      done.match({
        Some: _ => {
          // setup renegociation flow
          this._peer.on('signal', signal =>
            this.send({
              type: 'RENEGOCIATE',
              signal,
            })
          );
          this.subscribe('RENEGOCIATE', async payload => {
            this._peer.signal(payload.signal);
            return Ok(null);
          });

          // start notifying Peer to Peer text payload
          this._peer.on('data', data => {
            return this._notify(JSON.parse(data));
          });

          // handle incoming Peer to Peer stream payload
          this._peer.on('stream', stream =>
            this._notify({
              type: 'ADD_STREAM',
              stream,
            })
          );
        },
        None: () => {
          throw new Error('Peer setup failed');
        },
      })
    );
  }

  public signal(signal: SimplePeer.SignalData) {
    this._peer.signal(signal);
  }

  public hookPluginEvents: Binder<string, any> = (key: string, handler: Listener<any>) => {
    // TODO: prevent proxying Core events
    this.proxy(key as PeerEventTypes, handler as unknown as Listener<PeerEvents[PeerEventTypes]>);
    return Ok(null);
  };

  public send<K extends PeerEventTypes>(payload: PeerEvents[K]): Result<null, Error> {
    try {
      // handle special ADD_STREAM payload as it's not a text payload
      if (payload.type === 'ADD_STREAM') {
        this._peer.addStream(payload.stream);
        return Ok(null);
      }
      this._peer!.send(JSON.stringify({ ...payload, indentity: this.id }));
      return Ok(null);
    } catch (err) {
      return Err(err as Error);
    }
  }

  public subscribe<T extends PeerEventTypes>(
    type: T,
    listener: Listener<WithPeerIentity<PeerEvents[T]>>
  ): Subscription<PeerEvents[T]> {
    return super.subscribe(type, listener as unknown as Listener<PeerEvents[T]>) as Subscription<PeerEvents[T]>;
  }
}
