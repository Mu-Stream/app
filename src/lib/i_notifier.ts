import { Err, Ok, type Result } from "bakutils-catcher";
import { Completer } from "./completer";


export class ListenerError extends Error { }

export type Listener<Payload> = (payload: Payload) => Promise<Result<null, ListenerError>>;

export type Payloads<EventType extends string> = { [key in EventType]: { type: EventType } }

class NotiferError extends Error { }

class PayloadTimeout extends NotiferError { }

/**
* Notifier class that can be used to notify subscribers of a given event type
* That emits an payload, all your payloads should contain a type field
*/
export abstract class Notifier<EventType extends string, Payload extends Payloads<EventType>> {
	protected _subscribers = new Map<EventType, Listener<Payload[EventType]>[]>();

	/**
	* Subscribe one time to an event type as a promise and return the payload
	*/
	public async singleSubscribe<T extends EventType>(type: T): Promise<Result<Payload[T], PayloadTimeout>> {
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

	/**
    * Handle the notify logic.
	* Call this method with the recived playload from your source
	* It will trigger all the registered listeners
    */
	protected async _notify(payload: Payload[EventType]): Promise<Result<null, ListenerError>> {
		const listeners = this._subscribers.get(payload.type) || []
		for (const listener of listeners) {
			const res = await listener(payload);
			if (res.isErr()) return Err(res.error)
		}
		return Ok(null)
	}
}
