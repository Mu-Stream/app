import { DefaultCatch, Ok, type Result } from 'bakutils-catcher';
import { Command } from './i_commands';
import type { CoreAppContext } from '$lib/app';
import { prettyError } from '$lib/logging_utils';

export class PauseCommand extends Command<CoreAppContext> {
  @DefaultCatch(prettyError)
  public async execute(context: CoreAppContext): Promise<Result<null, Error>> {
    context.room.send({ type: 'PAUSE' }).unwrap();
    context.room.broadcast({ type: 'PAUSE' }).unwrap();
    context.audio_manager.pause();
    return Ok(null);
  }
}
