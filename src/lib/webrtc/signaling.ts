import { PUBLIC_SIGNALING_SERVER_URL } from "$env/static/public"
import { Completer } from "$lib/completer"
import { Notifier } from "$lib/i_notifier";
import type SimplePeer from "simple-peer";
import type { ClientPayload } from "./types/client";
import { None, Some } from "bakutils-catcher";

export enum ServerPayloadType {
	HOST_OK = 'HOST_OK',
	JOIN_OK = 'JOIN_OK',
	SIGNAL_REQUESTER = 'SIGNAL_REQUESTER'
}

export type ServerPayload = {
	[ServerPayloadType.SIGNAL_REQUESTER]: {
		type: ServerPayloadType.SIGNAL_REQUESTER;
		uuid: string;
		signal: SimplePeer.SignalData;
		username: string;
	},
	[ServerPayloadType.HOST_OK]: {
		type: ServerPayloadType.HOST_OK;
		roomId: string;
	},
	[ServerPayloadType.JOIN_OK]: {
		type: ServerPayloadType.JOIN_OK;
		signal: SimplePeer.SignalData;
		uuid: string;
		username: string;
	}
}

export class SignalingServerNotifier extends Notifier<ServerPayloadType, ServerPayload> {

	private _is_opened = new Completer<boolean>({ timeout: Some(5000) });

	private _ws: WebSocket = new WebSocket(PUBLIC_SIGNALING_SERVER_URL)

	constructor() {
		super()
		this._ws.onopen = () => this._is_opened.complete(Some(true))
		this._ws.onerror = () => this._is_opened.complete(None)
		this._ws.onmessage = ({ data }) => this._notify(JSON.parse(data))
	}

	public send(payload: ClientPayload) {
		this._ws!.send(JSON.stringify(payload))
	}

	public get is_opened() { return this._is_opened.future }
}
