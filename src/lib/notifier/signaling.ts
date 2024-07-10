import { PUBLIC_SIGNALING_SERVER_URL } from '$env/static/public';
import { Completer } from '$lib/completer';
import type SimplePeer from 'simple-peer';
import { None, Ok, Some, type Result } from 'bakutils-catcher';
import { Notifier, type Events } from './i_notifier';
import { App } from '$lib/app';

type SignalingEventType = 'SIGNAL_REQUESTER' | 'HOST_OK' | 'JOIN_OK' | 'HOST' | 'JOIN_HOST';

export type SignalingEvent = Events<
	SignalingEventType,
	{
		SIGNAL_REQUESTER: {
			type: 'SIGNAL_REQUESTER';
			uuid: string;
			signal: SimplePeer.SignalData;
		};
		HOST_OK: {
			type: 'HOST_OK';
			room_id: string;
		};
		JOIN_OK: {
			type: 'JOIN_OK';
			signal: SimplePeer.SignalData;
			uuid: string;
			username: string;
		};
		HOST: {
			type: 'HOST';
		};
		JOIN_HOST: {
			type: 'JOIN_HOST';
			room_id: string;
			username: string;
			signal: SimplePeer.SignalData;
		};
	}
>;

export class SignalingServer extends Notifier<SignalingEventType, SignalingEvent> {
	private _is_opened = new Completer<boolean>({ timeout: Some(5000) });

	private _ws: WebSocket = new WebSocket(PUBLIC_SIGNALING_SERVER_URL);

	private _reconnect_delay = 3000;

	constructor() {
		super();
		this.init();
	}

	public init() {
		this._ws = new WebSocket(PUBLIC_SIGNALING_SERVER_URL);
		this._ws.onopen = () => this._is_opened.complete(Some(true));
		this._ws.onerror = () => this._is_opened.complete(None);
		this._ws.onmessage = ({ data }) => this._notify(JSON.parse(data));
		this._is_opened.future
			// try reconnect if the connection is closed
			.then(v => {
				if (v.isNone()) {
					this.reconnect()
				}
			})
			.catch(this.reconnect);
	}

	public reconnect = async () => {
		App.instance.context.toaster.trigger({ message: `Unable to connect to server retrying in ${(this._reconnect_delay / 1000).toFixed(2)}s...` })
		await new Promise(resolve => setTimeout(resolve, this._reconnect_delay));
		this._reconnect_delay *= 2;
		this._ws.close();
		this._is_opened = new Completer<boolean>({ timeout: Some(5000) });
		this.init();
	}

	public send(payload: SignalingEvent[keyof SignalingEvent]): Result<null, Error> {
		this._ws!.send(JSON.stringify(payload));
		return Ok(null);
	}

	public get is_opened() {
		return this._is_opened.future;
	}
}
