import { Notifier, type Events, type Listener } from '$lib/notifier/i_notifier';
import { App } from '$lib/app';
import { Ok } from 'bakutils-catcher';
import type { AudioManagerEvent } from '$lib/notifier/audio_manager';
import type { RoomEvents } from '$lib/notifier/room';

export interface Song {
  identity: string;
  uuid: string;
  title: string;
  artist: string;
  album: string;
  year: string;
  img: { data: Uint8Array; format: string }[];
}

export type PlaylistEventType =
  | 'ADD_TO_PLAYLIST'
  | 'REMOVE_FROM_PLAYLIST'
  | 'SWAP_IN_PLAYLIST'
  | 'PLAY_SONG_IN_PLAYLIST'
  | 'UPDATE_PLAYLIST';

export type PlaylistEvent = Events<
  PlaylistEventType,
  {
    ADD_TO_PLAYLIST: {
      type: 'ADD_TO_PLAYLIST';
      song: Song;
    };
    REMOVE_FROM_PLAYLIST: {
      type: 'REMOVE_FROM_PLAYLIST';
      uuid: string;
    };
    SWAP_IN_PLAYLIST: {
      type: 'SWAP_IN_PLAYLIST';
      uuid_a: string;
      uuid_b: string;
    };
    PLAY_SONG_IN_PLAYLIST: {
      type: 'PLAY_SONG_IN_PLAYLIST';
      uuid: string;
    };
    UPDATE_PLAYLIST: {
      type: 'UPDATE_PLAYLIST';
      queue: Song[];
    };
  }
>;

export class PlaylistManager extends Notifier<PlaylistEventType, PlaylistEvent> {
  constructor() {
    super({
      readable_default_values: {
        UPDATE_PLAYLIST: {
          type: 'UPDATE_PLAYLIST',
          queue: [],
        },
      },
    });
    App.instance.context.audio_manager.subscribe('SONG_ENDED', this._handleSongEnded);
    this.subscribe('ADD_TO_PLAYLIST', this._handleAddToPlaylist);
    this.subscribe('PLAY_SONG_IN_PLAYLIST', this._handlePlaySongInPlaylist);
    this.subscribe('REMOVE_FROM_PLAYLIST', this._handleRemoveFromPlaylist);
  }

  private _handleSongEnded: Listener<AudioManagerEvent['SONG_ENDED']> = async () => {
    console.log('SONG_ENDED');
    if (App.instance.context.room.is_client || this._queue.length === 0) return Ok(null);
    App.instance.context.room.broadcast({ type: 'REMOVE_FROM_PLAYLIST', uuid: this._queue[0].uuid });
    this._notify({ type: 'REMOVE_FROM_PLAYLIST', uuid: this._queue[0].uuid });
    if (this._queue.length === 0) return Ok(null);
    App.instance.context.room.broadcast({ type: 'PLAY_SONG_IN_PLAYLIST', uuid: this._queue[0].uuid });
    this._notify({ type: 'PLAY_SONG_IN_PLAYLIST', uuid: this._queue[0].uuid });
    return Ok(null);
  };

  private _local_media_queue: { file: File; uuid: string }[] = [];

  private _queue: Song[] = [];

  public addSongToPlaylist(song: Song, file: File) {
    this._local_media_queue.push({ file, uuid: song.uuid });
    const payload: PlaylistEvent['ADD_TO_PLAYLIST'] = { type: 'ADD_TO_PLAYLIST', song };
    this._notify(payload);
    App.instance.context.room.broadcast(payload);
    App.instance.context.room.send(payload);
  }

  public _handleAddToPlaylist: Listener<PlaylistEvent['ADD_TO_PLAYLIST']> = async payload => {
    this._queue.push(payload.song);
    this._notify({ type: 'UPDATE_PLAYLIST', queue: this._queue });

    if (
      this._queue.length === 1 &&
      !App.instance.context.audio_manager.stream &&
      !App.instance.context.room.is_client
    ) {
      App.instance.context.room.broadcast({ type: 'PLAY_SONG_IN_PLAYLIST', uuid: this._queue[0].uuid });
      this._notify({ type: 'PLAY_SONG_IN_PLAYLIST', uuid: this._queue[0].uuid });
    }

    return Ok(null);
  };

  public _handlePlaySongInPlaylist: Listener<PlaylistEvent['PLAY_SONG_IN_PLAYLIST']> = async payload => {
    const song = this._local_media_queue.find(s => s.uuid === payload.uuid);
    if (!song) return Ok(null);
    App.instance.context.room.playFile(song!.file);
    return Ok(null);
  };

  public _handleRemoveFromPlaylist: Listener<PlaylistEvent['REMOVE_FROM_PLAYLIST']> = async payload => {
    this._queue = this._queue.filter(s => s.uuid !== payload.uuid);
    this._notify({ type: 'UPDATE_PLAYLIST', queue: this._queue });
    return Ok(null);
  };

  public _handlePeerQuited: Listener<RoomEvents['PEER_QUIT']> = async payload => {
    const current_music_is_quiting_peer = this._queue.length && this._queue[0].identity === payload.id;

    this._queue = this._queue.filter(s => s.identity !== payload.id);
    this._notify({ type: 'UPDATE_PLAYLIST', queue: this._queue });

    if (current_music_is_quiting_peer) {
      this._handlePlaySongInPlaylist({ type: 'PLAY_SONG_IN_PLAYLIST', uuid: this._queue[0].uuid });
    }
    return Ok(null);
  };
}
