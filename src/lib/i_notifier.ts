import { Err, Ok, type Result } from "bakutils-catcher";
import { Completer } from "./completer";
import { readable, type Readable } from "svelte/store";

export class ListenerError extends Error {
	constructor(message?: string) {
		super(message ?? 'An unexpected error occurred during a listener call');
	}
}

export class NotifierError extends Error {
	constructor(message?: string) {
		super(message ?? 'An unexpected error occurred in the notifier');
	}
}

class PayloadTimeout extends NotifierError {
	constructor() {
		super('Timeout reached while waiting for a payload');
	}
}

type Event<K extends string> = Record<K, { type: K }>;

export type Events<K extends string, E extends Event<K>> = E;
export type Listener<Payload> = (payload: Payload) => Promise<Result<null, ListenerError>>;
export type Subscription<Payload> = Listener<Payload>;

/**
 * Notifier class that can be used to notify subscribers of a given event type
 * That emits an payload, all your payloads should contain a type field
 */
export abstract class Notifier<K extends string, E extends Event<K>> {

	private _readable_default_values: Partial<Events<K, E>> = {};

	private _subscribers = new Map<K, Listener<E[K]>[]>();

	constructor({ readable_default_values }: { readable_default_values?: Partial<Events<K, E>> } = {}) {
		this._readable_default_values = readable_default_values ?? {}
	}


	/**
	 * Subscribe to an event type registering a handler
	 */
	public subscribe<T extends K = K>(type: T, listener: Listener<E[T]>): Subscription<E[T]> {
		const listeners = this._subscribers.get(type) || [];
		this._subscribers.set(type, [
			...listeners,
			listener as Listener<E[K]>
		]);
		return listener
	}

	/**
	* Unsubscribe a listener via it's ref 
	*/
	public unsubscribe<T extends K = K>(subscription: Subscription<E[T]>): void {
		for (const [type, listeners] of this._subscribers) {
			const index = listeners.findIndex(s => s === subscription)
			if (index !== -1) {
				console.log(`Unsubscribing from ${type.toString()}`);
				this._subscribers.set(type, listeners.filter(s => s === listeners[index]));
			}
		}
	}

	/**
	* Subscribe one time to an event type as a promise and return the payload
	*/
	public async once<T extends K = K>(type: T): Promise<Result<E[T], PayloadTimeout>> {
		const completer = new Completer<E[T]>();
		const sub = this.subscribe(type, async (payload) => {
			completer.completeValue(payload);
			return Ok(null);
		});
		await completer.future;
		this.unsubscribe(sub as Subscription<E[K]>);
		return (await completer.future).okOr(new PayloadTimeout);
	}



	/**
    * Handle the notify logic.
	* Call this method with the recived playload from your source
	* It will trigger all the registered listeners
    */
	protected async _notify(event: E[K]): Promise<Result<null, ListenerError[]>> {
		const errors: ListenerError[] = []
		const listeners = this._subscribers.get(event.type) || []

		// c rigolo eheh
		console.debug(
			`%c ${this.constructor.name} %c %c ${event.type} %c subs ${listeners.length}`,
			'color:black; background: #bada55; font-weight: bold;',
			'',
			'color:black; background: #ffda55; font-weight: bold;',
			``
		)
		for (const listener of listeners) {
			const res = await listener(event);
			if (res.isErr()) {
				console.error(
					`%c ${this.constructor.name} %c %c ${event.type} %c %c ERROR %c ${res.error.message}`,
					'color:black; background: #bada55; font-weight: bold;',
					'',
					'color:black; background: #ffda55; font-weight: bold;',
					'',
					'color:black; background: red; font-weight: bold;',
					'',
				)
				errors.push(res.error)
			};
		}
		return errors.length ? Err(errors) : Ok(null)
	}

	private _readable_instances: Map<K, Readable<E[K]>> = new Map;

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

		const new_one = readable(this._readable_default_values[type], (set) => {
			const sub = this.subscribe(type, async payload => {
				set(payload);
				return Ok(null);
			});
			return () => {
				// when no listener left remove internal subscribition and remove from readable store cache
				this.unsubscribe(sub as Subscription<E[K]>)
				this._readable_instances.delete(type);
			}
		});
		this._readable_instances.set(type, new_one as Readable<E[K]>);
		return new_one as Readable<E[T]>
	}

	public abstract send(payload: E[K]): Result<null, NotifierError>;
}
