import { Completer } from '$lib/completer'
import { Notifier, NotifierError } from '$lib/i_notifier'
import { Err, Ok, type Result } from 'bakutils-catcher'

export type MediaManagerEvents = {
	CURRENTLY_PLAYING: {
		type: 'CURRENTLY_PLAYING',
		current_time: number,
		total_time: number,
	}
}

export class MediaManager extends Notifier<MediaManagerEvents> {

	public send(payload: MediaManagerEvents[keyof MediaManagerEvents]): Result<null, NotifierError> {
		this._notify(payload)
		return Ok(null)
	}

	private _context?: AudioContext

	/// both of those are used when it's you that is streaming the current song
	private _node?: AudioBufferSourceNode
	private _destination?: MediaStreamAudioDestinationNode

	/// this one is used to store the stream recived from host that the host rebroadcast to others
	private _remote?: MediaStreamAudioSourceNode

	/// getter to get the current stream playing either if its you that created it or got by a remote
	get stream() { return this._destination?.stream ?? this._remote?.mediaStream }

	private _stopMediaStreamFromFile() {
		/// cancel previous media thaht we were streaming if any
		if (this._node) {
			this._node.stop()
			this._destination?.disconnect()
			this._node = undefined
			this._destination = undefined
		}
	}

	async createMediaStreamFromFile(file: File): Promise<Result<null, Error>> {

		this._stopMediaStreamFromFile()

		this._context ??= new AudioContext()
		const reader = new FileReader()
		const buffer = new Completer<AudioBuffer>()

		reader.onload = event =>
			this._context?.decodeAudioData(event.target?.result as ArrayBuffer, b => buffer.completeValue(b))

		reader.readAsArrayBuffer(file)
		this._node = this._context.createBufferSource()
		const buf = await buffer.future;
		if (buf.isNone()) return Err(Error("unable to create audio buffer from file"));
		this._node.buffer = buf.unwrap()
		this._destination = this._context.createMediaStreamDestination()
		this._node.connect(this._context.destination)
		this._node.connect(this._destination)
		return Ok(null)
	}


	public play(remote_destination?: MediaStream) {
		this._context ??= new AudioContext()

		if (this._remote) {
			this._remote.disconnect()
			this._remote = undefined
		}

		// if we play a local media
		if (!remote_destination && this._node) {
			console.log('playing a local stream')
			this._node!.start()
			let current_time = 0
			const interval = setInterval(() => {
				this._notify(
					{
						type: 'CURRENTLY_PLAYING',
						total_time: this._node!.buffer!.duration,
						current_time: ++current_time,
					}
				);
			}, 1000);
			this._node.onended = () => clearInterval(interval);
			this._node.connect
			return;
		}

		/// if we play a remote media
		if (remote_destination) {
			this._stopMediaStreamFromFile()
			console.log('playing a remote stream')
			// connect the new stream to the audio context
			this._remote = this._context.createMediaStreamSource(remote_destination);
			this._remote.connect(this._context!.destination)
			// this hack is needed to make audio play as the action is not done by trusted user interaction
			const hack = new Audio()
			hack.srcObject = this._remote.mediaStream
			return
		}
	}
}
