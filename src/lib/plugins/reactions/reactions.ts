import { Notifier, type Events } from '$lib/notifier/i_notifier';
import { Plugin, type Binder } from '$lib/plugins/i_plugin';
import { Ok, type Result } from 'bakutils-catcher';

export class ReactionPlugin extends Plugin<'reaction'> {
  name: 'reaction' = 'reaction';

  plugin_context = {
    reaction_manager: new ReactionManager(),
  };

  version = 0.01;

  async init(): Promise<Result<null, Error>> {
    return Ok(null);
  }

  async dispose(): Promise<Result<null, Error>> {
    return Ok(null);
  }

  async hookEvents(bind: Binder<string, any>): Promise<Result<null, Error>> {
    bind('ADD_REACTION', this.context.reaction.reaction_manager.bind);
    return Ok(null);
  }
}

type ReactionEventType = 'ADD_REACTION';

type ReactionEvent = Events<
  ReactionEventType,
  {
    ADD_REACTION: {
      type: 'ADD_REACTION';
      emoji: string;
    };
  }
>;

export class ReactionManager extends Notifier<ReactionEventType, ReactionEvent> {
  constructor() {
    super();
  }
}
