import { Plugin, type Binder } from '$lib/plugins/i_plugin';
import { Ok, type Result } from 'bakutils-catcher';
import { PlaylistManager } from './notifier/playlist_manager';
import Playlist from './components/playlist.svelte';

export class PlaylistPlugin extends Plugin<'playlist'> {
	name: 'playlist' = 'playlist'

	version = 0.1

	plugin_context = {
		playlist_manager: new PlaylistManager()
	}

	async hookEvents(binder: Binder<string, any>): Promise<Result<null, Error>> {
		binder('UPDATE_PLAYLIST', this.plugin_context.playlist_manager._handleUpdatePlaylist)
		return Ok(null)
	}

	async init(): Promise<Result<null, Error>> {
		return Ok(null)
	}

	async dispose(): Promise<Result<null, Error>> {
		return Ok(null)
	}

	public mountSidebarUI(target: HTMLDivElement): Result<null, Error> {
		new Playlist({ target })
		return Ok(null)
	}

}
