import { Completer } from '$lib/completer';
import { Stylize, blueLabel, greenLabel, orangeLabel, redLabel } from '$lib/logging_utils';
import { Err, Ok, type Result } from 'bakutils-catcher';
import { readable, type Readable } from 'svelte/store';
import type { WithPeerIentity } from './peer';

type Event<K extends string> = Record<K, { type: K }>;
export type Events<K extends string, E extends Event<K>> = E;
export type Listener<Payload> = (payload: Payload) => Promise<Result<null, Error>>;
export type Subscription<Payload> = Listener<Payload>;

/**
 * Notifier class that can be used to notify subscribers of a given event type
 * That emits an payload, all your payloads should contain a type field
 */
export abstract class Notifier<K extends string, E extends Event<K>> {
  private _readable_default_values: Partial<Events<K, E>> = {};

  private _subscribers = new Map<K, Listener<E[K]>[]>();

  constructor({ readable_default_values }: { readable_default_values?: Partial<Events<K, E>> } = {}) {
    this._readable_default_values = readable_default_values ?? {};
  }

  /**
   * Subscribe to an event type registering a handler
   */
  public subscribe<T extends K = K>(type: T, listener: Listener<E[T]>): Subscription<E[T]> {
    const listeners = this._subscribers.get(type) || [];
    this._subscribers.set(type, [...listeners, listener as Listener<E[K]>]);
    return listener;
  }

  /**
   * Unsubscribe a listener via it's ref
   */
  public unsubscribe<T extends K = K>(subscription: Subscription<E[T]>): void {
    for (const [type, listeners] of this._subscribers) {
      const index = listeners.findIndex(s => s === subscription);
      if (index !== -1) {
        this._subscribers.set(
          type,
          listeners.filter(s => s === listeners[index])
        );
      }
    }
  }

  /**
   * Subscribe one time to an event type as a promise and return the payload
   */
  public async once<T extends K = K>(type: T): Promise<Result<E[T], Error>> {
    const completer = new Completer<E[T]>();
    const sub = this.subscribe(type, async payload => {
      completer.completeValue(payload);
      return Ok(null);
    });
    await completer.future;
    this.unsubscribe(sub as Subscription<E[K]>);
    return (await completer.future).okOr(new Error());
  }

  private logEvent(event: E[K], msg: string) {
    const stlyed = new Stylize()
      .style(greenLabel)
      .apply('NOTIFIER', { padding: 2 })
      .space()
      .style(orangeLabel)
      .apply(this.constructor.name, { padding: 2 })
      .space()
      .style(blueLabel)
      .apply(event.type, { padding: 2 })
      .apply(msg)
      .build();
    console.info(...stlyed);
  }

  private logError(event: E[K], error: Error) {
    const stlyed = new Stylize()
      .style(greenLabel)
      .apply('NOTIFIER', { padding: 2 })
      .space()
      .style(orangeLabel)
      .apply(this.constructor.name, { padding: 2 })
      .space()
      .style(blueLabel)
      .apply(event.type, { padding: 2 })
      .space()
      .style(redLabel)
      .apply('ERROR', { padding: 2 })
      .apply(error.message)
      .build();
    console.error(...stlyed);
  }

  /**
   * Handle the notify logic.
   * Call this method with the recived playload from your source
   * It will trigger all the registered listeners
   */
  protected async _notify(event: E[K]): Promise<Result<null, Error[]>> {
    const errors: Error[] = [];
    const listeners = this._subscribers.get(event.type) || [];

    this.logEvent(event, `subscribers: ${listeners.length}`);
    for (const listener of listeners) {
      const res = await listener(event);
      if (res.isErr()) {
        this.logError(event, res.error);
        errors.push(res.error);
      }
    }
    return errors.length ? Err(errors) : Ok(null);
  }

  private _readable_instances: Map<K, Readable<E[K]>> = new Map();

  /**
   * Return a svelte readable subcribable store for the given event type
   * if already existing, it will return the existing one
   */
  public readable<T extends K>(type: T): Readable<E[T]> {
    const existing = this._readable_instances.get(type);
    if (existing) return existing as Readable<E[T]>;

    if (!this._readable_default_values[type]) {
      throw new Error(`${type} is not configured as a readable event type in ${this.constructor.name}`);
    }

    const new_one = readable(this._readable_default_values[type], set => {
      const sub = this.subscribe(type, async payload => {
        set(payload);
        return Ok(null);
      });
      // when no listener left remove internal subscribition and remove from readable store cache
      return () => {
        this.unsubscribe(sub as Subscription<E[K]>);
        this._readable_instances.delete(type);
      };
    });

    this._readable_instances.set(type, new_one as Readable<E[K]>);

    return new_one as Readable<E[T]>;
  }

  /** use this to bind an external subscribtion with the same type to this notifier who will also notify it */
  public bind: Listener<E[K]> = async event => {
    const res = await this._notify(event);
    if (res.isErr()) return Err(new Error(res.error.map(e => e.message).join('\n')));
    return Ok(null);
  };
}

export abstract class ProxyNotifier<K extends string, E extends Event<K>> extends Notifier<K, E> {
  private _proxy_events: Map<K, Listener<E[K]>> = new Map();

  constructor(props: { readable_default_values?: Partial<Events<K, E>> } = {}) {
    super(props);
  }

  /** proxy an event to another notifier  this event will not be emitted by this notifier */
  public proxy<T extends K>(key: T, listener: Listener<E[T]>): void {
    this._proxy_events.set(key, listener as Listener<E[K]>);
  }

  protected async _notify(event: E[K]): Promise<Result<null, Error[]>> {
    const proxy = this._proxy_events.get(event.type);
    if (proxy) {
      proxy(event);
      return Ok(null);
    }
    return super._notify(event);
  }
}

// TODO: create a Derived Notifier class that can redirect event to other Notifier without handling them
// this would permit to prevent infinite loop from Peer and the Class that listen for its event from Peer
