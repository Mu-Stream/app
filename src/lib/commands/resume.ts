import { DefaultCatch, Ok, type Result } from 'bakutils-catcher';
import { Command } from './i_commands';
import type { CoreAppContext } from '$lib/app';
import { prettyError } from '$lib/logging_utils';

export class ResumeCommand implements Command<CoreAppContext> {
  @DefaultCatch(prettyError)
  public async execute(context: CoreAppContext): Promise<Result<null, Error>> {
    context.room.send({ type: 'RESUME' }).unwrap();
    context.room.broadcast({ type: 'RESUME' }).unwrap();
    context.audio_manager.resume();
    return Ok(null);
  }
}
