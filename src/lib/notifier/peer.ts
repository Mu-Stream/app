import { Completer } from '$lib/completer';
import { v4 } from 'uuid';
import SimplePeer from 'simple-peer';
import { Err, None, Ok, Option, type Result } from 'bakutils-catcher';
import { ProxyNotifier, type Events, type Listener, type Subscription } from './i_notifier';
import type { Binder } from '$lib/plugins/i_plugin';
import SimplePeerFiles from 'simple-peer-files';

export type WithPeerIentity<E extends Record<string, unknown>> = E & {
  identity: string;
};

export type PeerEventTypes =
  | 'INIT_ROOM'
  | 'RENEGOCIATE'
  | 'ADD_STREAM'
  | 'PAUSE'
  | 'RESUME'
  | 'USER_LIST'
  | 'CLOSE'
  | 'TOAST';

export type PeerEvents = Events<
  PeerEventTypes,
  {
    INIT_ROOM: {
      type: 'INIT_ROOM';
      room_id: string;
      peer_id: string;
    };
    RENEGOCIATE: {
      type: 'RENEGOCIATE';
      signal: SimplePeer.SignalData;
    };
    ADD_STREAM: {
      type: 'ADD_STREAM';
      stream: MediaStream;
    };
    PAUSE: {
      type: 'PAUSE';
    };
    RESUME: {
      type: 'RESUME';
    };
    USER_LIST: {
      type: 'USER_LIST';
      users: { id: string; username: string }[];
    };
    CLOSE: {
      type: 'CLOSE';
    };
    TOAST: {
      type: 'TOAST';
      severity: 'normal' | 'success' | 'error';
      message: string;
    };
  }
>;

export class Peer extends ProxyNotifier<PeerEventTypes, PeerEvents> {
  private _id = v4();
  private _username: string;
  private _peer: SimplePeer.Instance;
  private _peer_files: any;

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

  public set id(id: string) {
    this._id = id;
  }

  constructor({ initiator, username }: { initiator: boolean; username: string }) {
    super();
    this._username = username;
    this._peer = new SimplePeer({ initiator, trickle: false });
    this._peer_files = new SimplePeerFiles();
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

          this._peer.on('close', () => {
            return this._notify({ type: 'CLOSE' });
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

  public quit() {
    this._peer.destroy();
  }

  public send<E extends { type: string } & Record<string, any>>(
    payload: PeerEvents[PeerEventTypes] | E
  ): Result<null, Error> {
    try {
      // handle special ADD_STREAM payload as it's not a text payload
      if (payload.type === 'ADD_STREAM') {
        this._peer.addStream(payload.stream);
        return Ok(null);
      }
      this._peer!.send(JSON.stringify({ ...payload, identity: this.id }));
      return Ok(null);
    } catch (err) {
      return Err(err as Error);
    }
  }

  public async sendFile(file: File, id: string): Promise<Option<null>> {
    const transfert = await this._peer_files.send(this._peer, id, file);
    transfert.start();
    const transfert_done = new Completer<null>();
    transfert.on('done', () => transfert_done.completeValue(null));
    return await transfert_done.future;
  }

  public async receiveFile(id: string): Promise<Option<File>> {
    const transfert = await this._peer_files.receive(this._peer, id);
    const file = new Completer<File>();
    transfert.on('done', (f: File) => file.completeValue(f));
    return await file.future;
  }

  public proxy<T extends PeerEventTypes | string>(key: T, listener: Listener<any>): void {
    super.proxy(key as PeerEventTypes, listener as unknown as any);
  }

  public subscribe<T extends string, K extends Record<string, any>>(
    type: T,
    listener: Listener<WithPeerIentity<K>>
  ): Subscription<any> {
    return super.subscribe(type as any, listener as unknown as Listener<any>) as Subscription<
      PeerEvents[PeerEventTypes]
    >;
  }
}
