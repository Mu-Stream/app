import { PUBLIC_SIGNALING_SERVER_URL } from "$env/static/public"
import { Completer } from "$lib/completer"
import type SimplePeer from "simple-peer";
import { None, Ok, Some, type Result } from "bakutils-catcher";
import { Notifier, type Events } from "./i_notifier";


type SignalingEventType =
	"SIGNAL_REQUESTER" |
	"HOST_OK" |
	"JOIN_OK" |
	"HOST" |
	"JOIN_HOST";

export type SignalingEvent = Events<
	SignalingEventType, {
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
>

export class SignalingServer extends Notifier<SignalingEventType, SignalingEvent> {
	private _is_opened = new Completer<boolean>({ timeout: Some(5000) });

	private _ws: WebSocket = new WebSocket(PUBLIC_SIGNALING_SERVER_URL)

	private static _instance: SignalingServer;

	public static get instance() { return SignalingServer._instance ??= new SignalingServer() }

	private constructor() {
		super()
		this._ws.onopen = () => this._is_opened.complete(Some(true))
		this._ws.onerror = () => this._is_opened.complete(None)
		this._ws.onmessage = ({ data }) => this._notify(JSON.parse(data))
	}

	public send(payload: SignalingEvent[keyof SignalingEvent]): Result<null, Error> {
		this._ws!.send(JSON.stringify(payload))
		return Ok(null)
	}

	public get is_opened() { return this._is_opened.future }
}
