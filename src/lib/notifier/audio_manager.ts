import { Completer } from '$lib/completer';
import { Err, Ok, type Result } from 'bakutils-catcher';
import { App } from '$lib/app';
import { Notifier, type Events } from './i_notifier';
import { SyncCurrentlyPlaying } from '$lib/commands/sync_currently_playing';
import { SyncCurrentMetadata } from '$lib/commands/sync_current_metadata';
import imageCompression from 'browser-image-compression';
import { get } from 'svelte/store';
import { compression_rate } from '$lib/stores/compression_rate';
import { parseBlob } from 'music-metadata';

type AudioManagerEventType = 'CURRENTLY_PLAYING' | 'CURRENTLY_METADATA';

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
      img: any[];
    };
  }
>;

export class AudioManager extends Notifier<AudioManagerEventType, AudioManagerEvent> {
  private _context!: AudioContext;
  private _audio = new Audio();
  /// both of those are used when it's you that is streaming the current song
  private _node?: AudioBufferSourceNode;
  private _destination?: MediaStreamAudioDestinationNode;

  /// this one is used to store the stream recived from host that the host rebroadcast to others
  private _remote?: MediaStreamAudioSourceNode;

  private _current_time = 0;
  private _media_timer: NodeJS.Timeout | undefined = undefined;

  /// getter to get the current stream playing either if its you that created it or got by a remote
  get stream() {
    return this._destination?.stream ?? this._remote?.mediaStream;
  }

  try_init_audio_context() {
    this._context ??= new AudioContext();
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
          img: [],
        },
      },
    });
  }

  public async _prepareLocalStream(file: File): Promise<Result<null, Error>> {
    console.log('preparing local stream');
    const reader = new FileReader();
    const buffer = new Completer<AudioBuffer>();

    const tags = await parseBlob(file);

    reader.onload = async event => {
      const b = event.target?.result as ArrayBuffer;

      const evt: AudioManagerEvent['CURRENTLY_METADATA'] = {
        type: 'CURRENTLY_METADATA',
        title: tags.common.title ?? file.name.split('.')[0],
        artist: tags.common.artist ?? '',
        album: tags.common.album ?? '',
        year: tags.common.year?.toString() ?? '',
        img: tags.common.picture ?? [],
      };

      // compress image to make it go through webrtc and keep only the first one
      if (evt.img.length !== 0) {
        var blob = new Blob([new Uint8Array(evt.img[0].data)], { type: evt.img[0].format });
        const compressed = await imageCompression(new File([blob], 'temp', { type: evt.img[0].format }), {
          maxSizeMB: get(compression_rate),
        });
        evt.img[0].data = Array.from(new Uint8Array(await compressed.arrayBuffer()));
        evt.img = evt.img.slice(0, 1);
      }

      App.instance.executeCommand(new SyncCurrentMetadata(evt));
      return this._context?.decodeAudioData(b, b => buffer.completeValue(b));
    };

    reader.readAsArrayBuffer(file);
    this._node = this._context.createBufferSource();
    const buf = await buffer.future;
    if (buf.isNone()) return Err(Error('unable to create audio buffer from file'));
    this._node.buffer = buf.unwrap();
    this._destination = this._context.createMediaStreamDestination();
    this._node.connect(this._context.destination);
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
    this._remote.connect(this._context!.destination);
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

    this._node!.onended = () => clearInterval(this._media_timer);
  }

  public async playLocal(file: File) {
    this._current_time = 0;
    this.stop();

    console.log('playing local stream');
    await this._prepareLocalStream(file);
    this._node!.start();

    this._setupCurrentlyPlayingPeriodicPing();

    return;
  }
}
