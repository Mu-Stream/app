import type { ClientPayload, ServerPayload } from './types'
import { PUBLIC_SIGNALING_SERVER_URL } from '$env/static/public'
import { Completer } from '$lib/completer'

export class MuWebSocket {
  private ws?: WebSocket

  public async init(on_message: (payload: ServerPayload) => void) {
    const ws = new WebSocket(PUBLIC_SIGNALING_SERVER_URL)
    const init = new Completer<void>()

    ws.onopen = () => {
      console.info(`ws connection established`)
      init.complete()
    }

    ws.onerror = (err) => {
      console.error(`ws error ${err}`)
    }

    ws.onmessage = ({ data }) => {
      on_message(JSON.parse(data))
    }

    this.ws = ws

    return init.future
  }

  public send(payload: ClientPayload) {
    this.ws!.send(JSON.stringify(payload))
  }
}
