import type { ClientPayload, ServerPayload } from './types'
import { PUBLIC_SIGNALING_SERVER_URL } from '$env/static/public'

export class MuWebSocket {
  private ws?: WebSocket

  public async init(on_message: (payload: ServerPayload) => void) {
    const ws = new WebSocket(PUBLIC_SIGNALING_SERVER_URL)
    await new Promise<void>((resolve) => {
      ws.onopen = () => {
        console.info(`ws connection established`)
        resolve()
      }
    })

    ws.onerror = (err) => {
      console.error(`ws error ${err}`)
    }

    ws.onmessage = ({ data }) => {
      on_message(JSON.parse(data))
    }

    this.ws = ws
  }

  public send(payload: ClientPayload) {
    this.ws!.send(JSON.stringify(payload))
  }
}
