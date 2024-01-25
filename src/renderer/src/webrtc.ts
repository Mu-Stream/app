import Peer from 'simple-peer'
import { identity } from './store/identity'
import {
  ServerPayloadType,
  type ServerPayload,
  type ClientUpdatePeerPayload,
  ClientPayloadType,
  type ClientCreateRoomPayload,
  type ClientJoinRoomPayload
  // @ts-ignore
} from './types.d.ts'

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

export let me: Peer.Instance

export async function createRoom() {
  const signaling_ws = connectToSignalingServer()

  me = new Peer({ initiator: true, trickle: false })

  console.log('create room')

  signaling_ws.onmessage = ({ data }) => {
    const payload: ServerPayload = JSON.parse(data)

    switch (payload.type) {
      case ServerPayloadType.INIT_ROOM:
        identity.set(payload.roomId)
        break
      case ServerPayloadType.CONNECT_TO_ROOM:
        console.log('connect to room', payload.signals.length)
        for (const signal of payload.signals) {
          console.log('signal', signal)
          me.signal(signal)
        }
        break
    }
  }
  me.on('connect', () => {
    console.info('connected to new client')
    me.send('hello')
  })
  me.on('signal', (signal: any) => {
    console.log('sending signal')
    const init_payload: ClientUpdatePeerPayload = {
      type: ClientPayloadType.UPDATE_PEER,
      signal
    }
    signaling_ws.send(JSON.stringify(init_payload))
  })
  me.once('signal', () => {
    console.log('create room sent')
    const payload: ClientCreateRoomPayload = {
      type: ClientPayloadType.CREATE_ROOM
    }
    signaling_ws.send(JSON.stringify(payload))
  })
}

export async function createMediaSource(file: File) {
  const audio_context = new AudioContext()
  const gain = audio_context.createGain()
  gain.connect(audio_context.destination)
  const file_reader = new FileReader()
  const buffer = new Promise<AudioBuffer>((resolve) => {
    file_reader.onload = (event) => {
      audio_context.decodeAudioData(event.target.result! as ArrayBuffer, (buffer) => {
        resolve(buffer)
      })
    }
  })
  file_reader.readAsArrayBuffer(file)
  const media_source = audio_context.createBufferSource()
  media_source.buffer = await buffer
  media_source.connect(gain)
  const remote_stream = audio_context.createMediaStreamDestination()
  media_source.connect(remote_stream)
  return { media_source, remote_stream }
}

export async function joinRoom(roomId: string) {
  const signaling_ws = connectToSignalingServer()

  me = new Peer({ trickle: false })

  console.log('join room', roomId)

  signaling_ws.onmessage = ({ data }) => {
    const payload: ServerPayload = JSON.parse(data)

    switch (payload.type) {
      case ServerPayloadType.CONNECT_TO_ROOM:
        console.log('connect to room', payload.signals.length)
        for (const signal of payload.signals) {
          console.log('signal', signal)
          me.signal(signal)
        }
        break
    }
  }
  me.on('connect', () => {
    console.info('connected to new server')
  })
  me.on('stream', (stream) => {
    console.log('got stream', stream)
    /// play the media stream
    const audio = new Audio()
    audio.srcObject = stream
    audio.play()
  })
  me.on('signal', (signal) => {
    console.log('sending signal')
    const init_payload: ClientUpdatePeerPayload = {
      type: ClientPayloadType.UPDATE_PEER,
      signal
    }
    signaling_ws.send(JSON.stringify(init_payload))
  })
  signaling_ws.onopen = (_) => {
    const payload: ClientJoinRoomPayload = {
      type: ClientPayloadType.JOIN_ROOM,
      roomId
    }
    signaling_ws.send(JSON.stringify(payload))
  }
}
