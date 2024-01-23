import Peer from 'simple-peer'
//@ts-ignore
import { MessageType, type SocketMessage } from './types.d.ts'
import { identity } from './store/identity'

export function connectToSignalingServer(): WebSocket {
  const signaling_ws = new WebSocket(`ws://127.0.0.1:8080`)

  signaling_ws.onopen = (_) => {
    console.info(`ws connection established`)
  }

  signaling_ws.onerror = (err) => {
    console.error(`ws error ${err}`)
  }

  return signaling_ws
}

export async function createRoom() {
  const signaling_ws = connectToSignalingServer()

  const initiator = new Peer({ initiator: true, trickle: false })
  console.log('create room')

  signaling_ws.onmessage = ({ data }) => {
    const payload: SocketMessage = JSON.parse(data)

    switch (payload.type) {
      case MessageType.INIT:
        console.log('init payload recived')
        identity.set(payload.uuid)

        initiator.on('signal', (peer: any) => {
          console.log('sending signal')
          signaling_ws.send(JSON.stringify({ type: MessageType.CREATE_ROOM, peer }))
        })
        break
      case MessageType.ACCEPT_ROOM_JOIN:
        initiator.signal(payload.peer)
        initiator.on('connect', () => {
          console.info('connected')
          initiator.send('hello')
        })
        break
    }
  }
}

export async function joinRoom(room: string) {
  const signaling_ws = connectToSignalingServer()

  const joiner = new Peer({ trickle: false })
  console.log('join room', room)

  signaling_ws.onmessage = ({ data }) => {
    const payload: SocketMessage = JSON.parse(data)
    switch (payload.type) {
      case MessageType.INIT:
        console.log('init payload recived')
        identity.set(payload.uuid)
        signaling_ws.send(JSON.stringify({ type: MessageType.REQUEST_JOIN_ROOM, room }))
        break
      case MessageType.CONNECT_TO_ROOM:
        console.log('connect to room')
        joiner.signal(payload.peer)
        joiner.on('data', (data) => {
          console.log('webrtc data', data.toString())
        })
        joiner.on('signal', (peer) => {
          console.log('sending signal')
          signaling_ws.send(JSON.stringify({ type: MessageType.ACCEPT_ROOM_JOIN, peer, room }))
        })
        break
    }
  }
}
