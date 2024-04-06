import { Command } from '$lib/commands/i_commands';
import { Ok, type Result } from 'bakutils-catcher';
import type { ReactionPlugin } from '../reactions';
import type { ReactionEvent } from '../notifiers/reaction_manager';

export class ReactCommand extends Command<ReactionPlugin['context']> {
  constructor(private emoji: string) {
    super();
  }

  public async execute(context: ReactionPlugin['context']): Promise<Result<null, Error>> {
    const event: ReactionEvent['ADD_REACTION'] = {
      type: 'ADD_REACTION',
      emoji: this.emoji,
    };
    context.room.send(event);
    context.room.broadcast(event);
    context.reaction.reaction_manager.addReaction(event.emoji);
    return Ok(null);
  }
}
