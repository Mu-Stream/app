import { Notifier, type Events, type Listener } from '$lib/notifier/i_notifier';
import type { MP3TagAPICFrame } from 'mp3tag.js/types/id3v2/frames';
import { App } from '$lib/app';
import { Ok } from 'bakutils-catcher';
import type { WithPeerIentity } from '$lib/notifier/peer';

export interface Song {
  identity: string;
  title: string;
  artist: string;
  album: string;
  year: string;
  img: any[];
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
  }

  private _queue: Song[] = [];

  public addSongToPlaylist(song: Song) {
    this._queue.push(song);
    const payload: PlaylistEvent['UPDATE_PLAYLIST'] = { type: 'UPDATE_PLAYLIST', queue: this._queue };
    this._notify(payload);
    App.instance.context.room.broadcast(payload);
    App.instance.context.room.send(payload);
  }

  public _handleUpdatePlaylist: Listener<WithPeerIentity<PlaylistEvent['UPDATE_PLAYLIST']>> = async payload => {
    console.log('handleUpdatePlaylist', payload);
    this._queue = payload.queue;
    console.log('queue', this._queue);
    this._notify(payload);
    return Ok(null);
  };
}
