import { PUBLIC_SIGNALING_SERVER_URL } from "$env/static/public"
import { Completer } from "$lib/completer"
import { Notifier } from "$lib/i_notifier";
import type SimplePeer from "simple-peer";
import type { ClientPayload } from "./types/client";
import { None, Some } from "bakutils-catcher";

export enum SignalingGetPayloadType {
	HOST_OK = 'HOST_OK',
	JOIN_OK = 'JOIN_OK',
	SIGNAL_REQUESTER = 'SIGNAL_REQUESTER'
}

export type SignalingGetPayloads = {
	[SignalingGetPayloadType.SIGNAL_REQUESTER]: {
		type: SignalingGetPayloadType.SIGNAL_REQUESTER;
		uuid: string;
		signal: SimplePeer.SignalData;
		username: string;
	},
	[SignalingGetPayloadType.HOST_OK]: {
		type: SignalingGetPayloadType.HOST_OK;
		roomId: string;
	},
	[SignalingGetPayloadType.JOIN_OK]: {
		type: SignalingGetPayloadType.JOIN_OK;
		signal: SimplePeer.SignalData;
		uuid: string;
		username: string;
	}
}

export class SignalingServerNotifier extends Notifier<SignalingGetPayloadType, SignalingGetPayloads> {

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

export const signaling_server_notifier = new SignalingServerNotifier()
