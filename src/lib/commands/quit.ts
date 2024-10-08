import type { CoreAppContext } from '$lib/app';
import { Ok, type Result } from 'bakutils-catcher';
import { Command } from './i_commands';

export class QuitCommand extends Command<CoreAppContext> {
  public async execute(context: CoreAppContext): Promise<Result<null, Error>> {
    if (context.room.is_client) {
      context.room.quit();
    } else {
      context.room.delete();
    }
    context.audio_manager.stop();
    // TODO: maybe find other solution than hard reload page
    window.location.reload();
    return Ok(null);
  }
}
