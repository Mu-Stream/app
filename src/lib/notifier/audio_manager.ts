import { Completer } from '$lib/completer';
import { Err, Ok, type Result } from 'bakutils-catcher';
import { App } from '$lib/app';
import { Notifier, type Events } from './i_notifier';
import { SyncCurrentlyPlaying } from '$lib/commands/sync_currently_playing';
import { SyncCurrentMetadata } from '$lib/commands/sync_current_metadata';
import { parseBlob } from 'music-metadata';

type AudioManagerEventType = 'CURRENTLY_PLAYING' | 'CURRENTLY_METADATA' | 'SONG_ENDED' | 'VOLUME';

export type AudioManagerEvent = Events<
	AudioManagerEventType,
	{
		CURRENTLY_PLAYING: {
			type: 'CURRENTLY_PLAYING';
			total_time: number;
			current_time: number;
			status: 'PLAYING' | 'PAUSED';
		};
		CURRENTLY_METADATA: {
			type: 'CURRENTLY_METADATA';
			title: string;
			artist: string;
			album: string;
			year: string;
			hasImg: boolean;
			localImg: File | null;
		};
		SONG_ENDED: { type: 'SONG_ENDED' };
		VOLUME: { type: 'VOLUME'; value: number };
	}
>;

export class AudioManager extends Notifier<AudioManagerEventType, AudioManagerEvent> {
	private _context!: AudioContext;
	private _gain!: GainNode;
	private _audio = new Audio();
	/// both of those are used when it's you that is streaming the current song
	private _node?: AudioBufferSourceNode;
	private _destination?: MediaStreamAudioDestinationNode;

	/// this one is used to store the stream recived from host that the host rebroadcast to others
	private _remote?: MediaStreamAudioSourceNode;

	private _current_time = 0;
	private _media_timer: NodeJS.Timeout | undefined = undefined;

	set gain(value: number) {
		this._gain.gain.value = value;
		this._audio.volume = value;
		this._notify({ type: 'VOLUME', value });
	}

	/// getter to get the current stream playing either if its you that created it or got by a remote
	get stream() {
		return this._destination?.stream ?? this._remote?.mediaStream;
	}

	try_init_audio_context() {
		this._context ??= new AudioContext();
		this._gain ??= this._context.createGain();
	}

	constructor() {
		super({
			readable_default_values: {
				CURRENTLY_PLAYING: {
					type: 'CURRENTLY_PLAYING',
					total_time: 0,
					current_time: 0,
					status: 'PAUSED',
				},
				CURRENTLY_METADATA: {
					type: 'CURRENTLY_METADATA',
					title: '',
					artist: '',
					album: '',
					year: '',
					hasImg: false,
					localImg: null,
				},
				VOLUME: { type: 'VOLUME', value: 1 },
			},
		});
	}

	public async _prepareLocalStream(file: File): Promise<Result<null, Error>> {
		const reader = new FileReader();
		const buffer = new Completer<AudioBuffer>();

		let tags: {
			common: {
				title?: string;
				artist?: string;
				album?: string;
				year?: number;
				picture?: {
					data: Uint8Array;
					format: string;
				}[];
			};
		};

		try {
			tags = await parseBlob(file);
		} catch (e) {
			tags = { common: {} };
		}

		reader.onload = async event => {
			const b = event.target?.result as ArrayBuffer;

			const evt: AudioManagerEvent['CURRENTLY_METADATA'] = {
				type: 'CURRENTLY_METADATA',
				title: tags.common.title ?? file.name.split('.')[0],
				artist: tags.common.artist ?? '',
				album: tags.common.album ?? '',
				year: tags.common.year?.toString() ?? '',
				hasImg: !!tags.common.picture && tags.common.picture!.length !== 0,
				localImg: null,
			};

			let img = evt.hasImg ? tags.common.picture![0] : null;
			evt.localImg = img
				? new File([new Blob([new Uint8Array(img!.data)], { type: img!.format })], `${evt.title}`)
				: null;

			App.instance.executeCommand(new SyncCurrentMetadata(evt));
			return this._context?.decodeAudioData(b, b => buffer.completeValue(b));
		};

		reader.readAsArrayBuffer(file);
		this._node = this._context.createBufferSource();
		const buf = await buffer.future;
		if (buf.isNone()) return Err(Error('unable to create audio buffer from file'));
		this._node.buffer = buf.unwrap();
		this._destination = this._context.createMediaStreamDestination();
		this._node.connect(this._gain);
		this._gain.connect(this._context.destination);
		this._node.connect(this._destination);
		return Ok(null);
	}

	public stop() {
		try {
			this._remote?.disconnect();
			this._node?.stop();
			this._node?.stop();
			this._destination?.disconnect();
			this._node = undefined;
			this._destination = undefined;
		} catch (e) {
			console.error(e);
		}
	}

	public playRemote(stream: MediaStream) {
		this._current_time = 0;
		this.stop();
		this._remote = this._context.createMediaStreamSource(stream);
		this._remote.connect(this._gain);
		this._gain.connect(this._context.destination);
		this._audio.srcObject = this._remote.mediaStream;
	}

	public async resume() {
		if (!this._node) return;
		await this._context.resume();
		const event: AudioManagerEvent['CURRENTLY_PLAYING'] = {
			type: 'CURRENTLY_PLAYING',
			total_time: this._node!.buffer!.duration,
			current_time: this._current_time,
			status: 'PLAYING',
		};
		App.instance.executeCommand(new SyncCurrentlyPlaying(event));
		this._notify(event);
		this._setupCurrentlyPlayingPeriodicPing();
	}

	public async pause() {
		if (!this._node) return;

		await this._context.suspend();
		const event: AudioManagerEvent['CURRENTLY_PLAYING'] = {
			type: 'CURRENTLY_PLAYING',
			total_time: this._node!.buffer!.duration,
			current_time: this._current_time,
			status: 'PAUSED',
		};
		App.instance.executeCommand(new SyncCurrentlyPlaying(event));
		this._notify(event);
		clearInterval(this._media_timer);
	}

	public syncCurrentMetadata(metadata: AudioManagerEvent['CURRENTLY_METADATA']) {
		this._notify(metadata);
	}

	private _setupCurrentlyPlayingPeriodicPing() {
		clearInterval(this._media_timer);
		this._media_timer = setInterval(() => {
			const event: AudioManagerEvent['CURRENTLY_PLAYING'] = {
				type: 'CURRENTLY_PLAYING',
				total_time: this._node!.buffer!.duration,
				current_time: ++this._current_time,
				status: 'PLAYING',
			};
			this._notify(event);
			App.instance.executeCommand(new SyncCurrentlyPlaying(event));
		}, 1000);

		this._node!.onended = () => {
			this._notify({ type: 'SONG_ENDED' });
			App.instance.context.room.send({ type: 'SONG_ENDED' });
			clearInterval(this._media_timer);
		};
	}

	public async playLocal(file: File) {
		this._current_time = 0;
		this.stop();

		await this._prepareLocalStream(file);
		this._node!.start();

		this._setupCurrentlyPlayingPeriodicPing();

		return;
	}
}
