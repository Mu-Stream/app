import { PUBLIC_SIGNALING_SERVER_URL } from "$env/static/public"
import { Completer } from "$lib/completer"
import { Notifier, NotifierError } from "$lib/i_notifier";
import type SimplePeer from "simple-peer";
import { None, Ok, Some, type Result } from "bakutils-catcher";


export type SignalingEvent = {
	SIGNAL_REQUESTER: {
		type: 'SIGNAL_REQUESTER';
		uuid: string;
		signal: SimplePeer.SignalData;
		username: string;
	},
	HOST_OK: {
		type: 'HOST_OK';
		roomId: string;
	},
	JOIN_OK: {
		type: 'JOIN_OK';
		signal: SimplePeer.SignalData;
		uuid: string;
		username: string;
	},
	HOST: {
		type: 'HOST',
	},
	JOIN_HOST: {
		type: 'JOIN_HOST',
		roomId: string;
		signal: SimplePeer.SignalData;
	}
}

export class SignalingServerNotifier extends Notifier<SignalingEvent> {

	private _is_opened = new Completer<boolean>({ timeout: Some(5000) });

	private _ws: WebSocket = new WebSocket(PUBLIC_SIGNALING_SERVER_URL)

	constructor() {
		super()
		this._ws.onopen = () => this._is_opened.complete(Some(true))
		this._ws.onerror = () => this._is_opened.complete(None)
		this._ws.onmessage = ({ data }) => this._notify(JSON.parse(data))
	}

	public send(payload: SignalingEvent[keyof SignalingEvent]): Result<null, NotifierError> {
		this._ws!.send(JSON.stringify(payload))
		return Ok(null)
	}

	public get is_opened() { return this._is_opened.future }
}

export const signaling_server_notifier = new SignalingServerNotifier()
