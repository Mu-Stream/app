import { Completer } from '$lib/completer'
import { Notifier, NotifierError, type Events } from '$lib/i_notifier'
import { Err, Ok, type Result } from 'bakutils-catcher'

type MediaManagerEventsType = 'CURRENTLY_PLAYING'

export type MediaManagerEvents = Events<MediaManagerEventsType, {
	CURRENTLY_PLAYING: {
		type: 'CURRENTLY_PLAYING',
		current_time: number,
		total_time: number,
	}
}>

export class MediaManager extends Notifier<MediaManagerEventsType, MediaManagerEvents> {

	private static _instance: MediaManager

	public static get instance() { return this._instance ??= new MediaManager() }

	private constructor() {
		super(
			{
				readable_default_values: {
					CURRENTLY_PLAYING: {
						type: 'CURRENTLY_PLAYING',
						current_time: 0,
						total_time: 0,
					}
				}
			}
		)
	}

	public send(payload: MediaManagerEvents[keyof MediaManagerEvents]): Result<null, NotifierError> {
		this._notify(payload)
		return Ok(null)
	}

	private _context: AudioContext = new AudioContext()
	private _audio = new Audio()

	/// both of those are used when it's you that is streaming the current song
	private _node?: AudioBufferSourceNode
	private _destination?: MediaStreamAudioDestinationNode

	/// this one is used to store the stream recived from host that the host rebroadcast to others
	private _remote?: MediaStreamAudioSourceNode

	/// getter to get the current stream playing either if its you that created it or got by a remote
	get stream() { return this._destination?.stream ?? this._remote?.mediaStream }

	public async prepareLocalStream(file: File): Promise<Result<null, Error>> {
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

	public stop() {
		this._remote?.disconnect()
		this._node?.stop()
		this._node?.stop()
		this._destination?.disconnect()
		this._node = undefined
		this._destination = undefined
	}

	public playRemote(stream: MediaStream) {
		this.stop()
		this._remote = this._context.createMediaStreamSource(stream);
		this._remote.connect(this._context!.destination)
		this._audio.srcObject = this._remote.mediaStream
	}

	private _current_time: number = 0;

	private _media_timer: NodeJS.Timeout | undefined = undefined;

	public async playLocal(file: File) {
		this.stop()

		await this.prepareLocalStream(file);
		this._node!.start()

		// setup current time interval to synchronize song progress
		this._current_time = 0
		this._media_timer = setInterval(() => {
			this._notify({
				type: 'CURRENTLY_PLAYING',
				total_time: this._node!.buffer!.duration,
				current_time: ++this._current_time,
			});
		}, 1000);

		/// clear it once music stops
		this._node!.onended = () => {
			if (this._media_timer) clearInterval(this._media_timer);
		};

		return;
	}
}
