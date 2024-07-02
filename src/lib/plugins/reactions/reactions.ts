import { Plugin, type Binder } from '$lib/plugins/i_plugin';
import { Ok, type Result } from 'bakutils-catcher';
import Reaction from './components/react.svelte';
import { ReactionManager } from './notifiers/reaction_manager';

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

  public mountUserShortcutUI(target: HTMLDivElement): Result<null, Error> {
    new Reaction({ target });
    return Ok(null);
  }
}
