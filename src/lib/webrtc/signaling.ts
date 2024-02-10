import { PUBLIC_SIGNALING_SERVER_URL } from "$env/static/public"
import { Completer } from "$lib/completer"
import type { ClientPayload } from "./types/client";
import type { ServerPayload, ServerPayloadType } from "./types/server";

export class SignalingScoket {
  private _ws: WebSocket = new WebSocket(PUBLIC_SIGNALING_SERVER_URL)
  private _is_opened = new Completer<boolean>();

  constructor() {
    this._ws.onopen = () => this._is_opened.complete(true)
    this._ws.onerror = () => this._is_opened.complete(false)
  }

  public get isOpened() { return this._is_opened.future }

  public async waitForPayload<T extends ServerPayload>(type: ServerPayloadType) {

    const opened = await this.isOpened;
    if (!opened) throw new Error('Socket did not open correclty')


    const p = new Completer<T>();

    this._ws.onmessage = ({ data }) => {
      const payload: T = JSON.parse(data);
      if (payload.type === type) p.complete(payload)
    }

    return p.future
  }

  public send(payload: ClientPayload) {
    this._ws!.send(JSON.stringify(payload))
  }

  public onmessage(handler: (payload: ServerPayload) => void) {
    this._ws.onmessage = ({ data }) => handler(JSON.parse(data));
  }
}
