import { Plugin, type Binder } from '$lib/plugins/i_plugin';
import { Ok, type Result } from 'bakutils-catcher';
import { PlaylistManager } from './notifier/playlist_manager';
import Playlist from './components/playlist.svelte';

export class PlaylistPlugin extends Plugin<'playlist'> {
  name: 'playlist' = 'playlist';

  version = 0.1;

  plugin_context = {
    playlist_manager: new PlaylistManager(),
  };

  async hookEvents(binder: Binder<string, any>): Promise<Result<null, Error>> {
    binder('ADD_TO_PLAYLIST', this.plugin_context.playlist_manager._handleAddToPlaylist);
    binder('PLAY_SONG_IN_PLAYLIST', this.plugin_context.playlist_manager._handlePlaySongInPlaylist);
    binder('REMOVE_FROM_PLAYLIST', this.plugin_context.playlist_manager._handleRemoveFromPlaylist);
    return Ok(null);
  }

  async init(): Promise<Result<null, Error>> {
    this.context.room.subscribe('PEER_QUIT', this.plugin_context.playlist_manager._handlePeerQuited);
    this.context.room.subscribe('NEW_PEER', this.plugin_context.playlist_manager._initPlyalistPeer);
    return Ok(null);
  }

  async dispose(): Promise<Result<null, Error>> {
    return Ok(null);
  }

  public mountSidebarUI(target: HTMLDivElement): Result<null, Error> {
    new Playlist({ target });
    return Ok(null);
  }
}
