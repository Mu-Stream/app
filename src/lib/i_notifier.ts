import { Err, Ok, type Result } from "bakutils-catcher";
import { Completer } from "./completer";

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

export type Listener<Payload> = (payload: Payload) => Promise<Result<null, ListenerError>>;

export type Payloads<EventType extends string> = { [key in EventType]: { type: EventType } }


/**
* Notifier class that can be used to notify subscribers of a given event type
* That emits an payload, all your payloads should contain a type field
*/
export abstract class Notifier<EventType extends string, Payload extends Payloads<EventType>> {
	protected _subscribers = new Map<EventType, Listener<Payload[EventType]>[]>();

	/**
	* Subscribe one time to an event type as a promise and return the payload
	*/
	public async once<T extends EventType>(type: T): Promise<Result<Payload[T], PayloadTimeout>> {
		const completer = new Completer<Payload[T]>();
		const handler: Listener<Payload[EventType]> = async (payload) => {
			completer.completeValue(payload as Payload[T]);
			return Ok(null);
		};
		this.subscribe(type, handler);
		await completer.future;
		this.unsubscribe(handler);
		return (await completer.future).okOr(new PayloadTimeout);
	}

	/**
	* Subscribe to an event type registering a handler
	*/
	public subscribe<T extends EventType>(type: T, handler: Listener<Payload[T]>): void {
		const listeners = this._subscribers.get(type) || [];
		this._subscribers.set(type, [
			...listeners,
			handler as Listener<Payload[EventType]>
		])
	}

	/**
	* Unsubscribe a listener via it's ref 
	*/
	public unsubscribe<T extends EventType>(handler: Listener<Payload[T]>): void {
		for (const [type, listeners] of this._subscribers) {
			this._subscribers.set(type, listeners.filter(l => l !== handler));
		}
	}

	public abstract send(payload: Payload[EventType]): Result<null, NotifierError>;

	/**
    * Handle the notify logic.
	* Call this method with the recived playload from your source
	* It will trigger all the registered listeners
    */
	protected async _notify(payload: Payload[EventType]): Promise<Result<null, ListenerError[]>> {
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
}
