import { MuRoom } from './room'

export async function createMediaSource(file: File) {
  const audio_context = new AudioContext()
  const gain = audio_context.createGain()
  gain.connect(audio_context.destination)
  const file_reader = new FileReader()
  const buffer = new Promise<AudioBuffer>((resolve) => {
    file_reader.onload = (event) => {
      audio_context.decodeAudioData(event.target!.result! as ArrayBuffer, (buffer) => {
        resolve(buffer)
      })
    }
  })
  file_reader.readAsArrayBuffer(file)
  const audio_node = audio_context.createBufferSource()
  audio_node.buffer = await buffer
  audio_node.connect(gain)
  const audio_destination_node = audio_context.createMediaStreamDestination()
  audio_node.connect(audio_destination_node)
  return { audio_node, audio_destination_node }
}

export const room = new MuRoom()
