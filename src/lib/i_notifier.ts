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

export type Payloads = Record<string, { type: string }>;
export type Listener<Payload> = (payload: Payload) => Promise<Result<null, ListenerError>>;
export type Subscription<Payload> = Listener<Payload>;

/**
 * Notifier class that can be used to notify subscribers of a given event type
 * That emits an payload, all your payloads should contain a type field
 */
export abstract class Notifier<P extends Payloads> {
	private _subscribers = new Map<keyof P, Listener<P[keyof P]>[]>();


	/**
	 * Subscribe to an event type registering a handler
	 */
	public subscribe<T extends keyof P = keyof P>(type: T, listener: Listener<P[T]>): Subscription<P[T]> {
		const listeners = this._subscribers.get(type) || [];
		this._subscribers.set(type, [
			...listeners,
			listener as Listener<P[keyof P]>
		]);
		return listener
	}

	/**
	* Unsubscribe a listener via it's ref 
	*/
	public unsubscribe(subscription: Subscription<P[keyof P]>): void {
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
	public async once<T extends keyof P = keyof P>(type: T): Promise<Result<P[T], PayloadTimeout>> {
		const completer = new Completer<P[T]>();
		const sub = this.subscribe(type, async (payload) => {
			completer.completeValue(payload);
			return Ok(null);
		});
		await completer.future;
		this.unsubscribe(sub as Subscription<P[keyof P]>);
		return (await completer.future).okOr(new PayloadTimeout);
	}



	/**
    * Handle the notify logic.
	* Call this method with the recived playload from your source
	* It will trigger all the registered listeners
    */
	protected async _notify(payload: P[keyof P]): Promise<Result<null, ListenerError[]>> {
		const errors: ListenerError[] = []
		const listeners = this._subscribers.get(payload.type) || []

		// c rigolo eheh
		console.debug(
			`%c ${this.constructor.name} %c %c ${payload.type} %c subs ${listeners.length}`,
			'color:black; background: #bada55; font-weight: bold;',
			'',
			'color:black; background: #ffda55; font-weight: bold;',
			``
		)
		for (const listener of listeners) {
			const res = await listener(payload);
			if (res.isErr()) {
				console.error(
					`%c ${this.constructor.name} %c %c ${payload.type} %c %c ERROR %c ${res.error.message}`,
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

	public getSvelteReadable<T extends keyof P = keyof P>(value: P[T]): Readable<P[T]> {
		return readable(value, (set) => {
			const sub = this.subscribe(value.type as T, async payload => {
				set(payload);
				return Ok(null);
			});
			return () => this.unsubscribe(sub as Subscription<P[keyof P]>)
		});

	}

	public abstract send(payload: P[keyof P]): Result<null, NotifierError>;
}

