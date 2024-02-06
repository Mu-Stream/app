import { Completer } from '$lib/completer'

export let current_audio_node: AudioBufferSourceNode | undefined
export let current_destination_node: MediaStreamAudioDestinationNode | undefined

export async function createMediaSource(file: File) {
  if (current_audio_node || current_destination_node) {
    current_audio_node?.stop()
    current_destination_node?.disconnect()
  }

  const audio_context = new AudioContext()
  const gain = audio_context.createGain()

  gain.connect(audio_context.destination)

  const file_reader = new FileReader()
  const buffer = new Completer<AudioBuffer>()

  file_reader.onload = (event) => {
    audio_context.decodeAudioData(event.target!.result! as ArrayBuffer, (b) => {
      buffer.complete(b)
    })
  }

  file_reader.readAsArrayBuffer(file)
  const audio_node = audio_context.createBufferSource()
  audio_node.buffer = await buffer.future
  audio_node.connect(gain)
  const audio_destination_node = audio_context.createMediaStreamDestination()
  audio_node.connect(audio_destination_node)

  current_audio_node = audio_node
  current_destination_node = audio_destination_node
}
