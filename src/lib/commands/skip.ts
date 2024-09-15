import {DefaultCatch, Ok, type Result} from 'bakutils-catcher';
import {Command} from './i_commands';
import type {CoreAppContext} from '$lib/app';
import {prettyError} from '$lib/logging_utils';

export class SkipCommand implements Command<CoreAppContext> {
  @DefaultCatch(prettyError)
  public async execute(context: CoreAppContext): Promise<Result<null, Error>> {
    context.audio_manager.skipToNext();
    return Ok(null);
  }
}
