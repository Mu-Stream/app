import { Command } from '$lib/commands/i_commands';
import { Ok, type Result } from 'bakutils-catcher';
import type { PlaylistPlugin } from '../playlist';

export class MoveSongUp extends Command<PlaylistPlugin['context']> {
  constructor() {
    super();
  }

  public async execute(context: PlaylistPlugin['context']): Promise<Result<null, Error>> {
    return Ok(null);
  }
}
