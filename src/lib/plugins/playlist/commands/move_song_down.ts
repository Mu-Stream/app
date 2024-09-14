import {Command} from '$lib/commands/i_commands';
import {Ok, type Result} from 'bakutils-catcher';
import type {PlaylistPlugin} from '../playlist';

export class MoveSongDown extends Command<PlaylistPlugin['context']> {
  constructor(private _id: string) {
    super();
  }

   public async execute(context: PlaylistPlugin['context']): Promise<Result<null, Error>> {
    context.playlist.playlist_manager.moveSongDown(this._id);
    return Ok(null);
  }
}
