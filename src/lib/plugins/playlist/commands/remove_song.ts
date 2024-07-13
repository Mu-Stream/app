import { Command } from '$lib/commands/i_commands';
import type { AudioManager } from '$lib/notifier/audio_manager';
import type { Room } from '$lib/notifier/room';
import type { SignalingServer } from '$lib/notifier/signaling';
import type { Toaster } from '$lib/notifier/toaster';
import { Ok, type Result } from 'bakutils-catcher';
import type { PlaylistEvent, PlaylistManager } from '../notifier/playlist_manager';
import type { PlaylistPlugin } from '../playlist';

export class RemoveSong extends Command<PlaylistPlugin['context']> {
  constructor(private _id: string) {
    super();
  }

  public async execute(context: PlaylistPlugin['context']): Promise<Result<null, Error>> {
    context.playlist.playlist_manager.removeSong(this._id);
    return Ok(null);
  }
}
