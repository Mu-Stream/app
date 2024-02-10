import { Completer } from '$lib/completer'

class MuMediaManager {
  current_audio_node?: AudioBufferSourceNode
  current_destination_node?: MediaStreamAudioDestinationNode
  remote_media_stream?: MediaStream
  audio_context = new AudioContext()


  public get media_stream() { return this.current_destination_node?.stream ?? this.remote_media_stream }


  public async initMediaSource(file: File) {
    if (this.current_audio_node || this.current_destination_node) {
      this.current_audio_node?.stop()
      this.current_destination_node?.disconnect()
    }

    const gain = this.audio_context.createGain()

    gain.connect(this.audio_context.destination)

    const file_reader = new FileReader()
    const buffer = new Completer<AudioBuffer>()

    file_reader.onload = (event) => {
      this.audio_context.decodeAudioData(event.target!.result! as ArrayBuffer, (b) => {
        buffer.complete(b)
      })
    }

    file_reader.readAsArrayBuffer(file)
    const audio_node = this.audio_context.createBufferSource()
    audio_node.buffer = await buffer.future
    audio_node.connect(gain)
    const audio_destination_node = this.audio_context.createMediaStreamDestination()
    audio_node.connect(audio_destination_node)

    this.current_audio_node = audio_node
    this.current_destination_node = audio_destination_node
    console.log('audio stream created')
  }

  public broadcastRemoteStream(stream: MediaStream) {
    this.remote_media_stream = stream;
  }

  public play() {
    if (this.current_audio_node) {
      console.log('start stream current audio node')
      this.current_audio_node!.start()
    } else if (this.remote_media_stream) {
      /// TODO send p2p play message
    }
  }
}


export let mediaManager = new MuMediaManager()

//
// export async function createMediaSource(file: File) {
//   if (current_audio_node || current_destination_node) {
//     current_audio_node?.stop()
//     current_destination_node?.disconnect()
//   }
//
//   const audio_context = new AudioContext()
//   const gain = audio_context.createGain()
//
//   gain.connect(audio_context.destination)
//
//   const file_reader = new FileReader()
//   const buffer = new Completer<AudioBuffer>()
//
//   file_reader.onload = (event) => {
//     audio_context.decodeAudioData(event.target!.result! as ArrayBuffer, (b) => {
//       buffer.complete(b)
//     })
//   }
//
//   file_reader.readAsArrayBuffer(file)
//   const audio_node = audio_context.createBufferSource()
//   audio_node.buffer = await buffer.future
//   audio_node.connect(gain)
//   const audio_destination_node = audio_context.createMediaStreamDestination()
//   audio_node.connect(audio_destination_node)
//
//   current_audio_node = audio_node
//   current_destination_node = audio_destination_node
// }
