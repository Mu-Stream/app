import { Notifier, type Events, type Listener } from '$lib/notifier/i_notifier';
import { Ok } from 'bakutils-catcher';
import { v4 } from 'uuid';
import Particles from '../components/particles.svelte';
import { App } from '$lib/app';
import type { WithPeerIentity } from '$lib/notifier/peer';

export type ReactionEventType = 'ADD_REACTION';

export type ReactionEvent = Events<
  ReactionEventType,
  {
    ADD_REACTION: {
      type: 'ADD_REACTION';
      emoji: string;
    };
  }
>;

export class ReactionManager extends Notifier<ReactionEventType, ReactionEvent> {
  private _reactions: Record<string, Particles> = {};

  constructor() {
    super({
      readable_default_values: {
        ADD_REACTION: {
          type: 'ADD_REACTION',
          emoji: '👍',
        },
      },
    });
    this.subscribe('ADD_REACTION', this._onReaction);
  }

  public addReaction(emoji: string) {
    const uuid = v4();
    const particle = new Particles({
      target: document.body,
      props: { emoji },
    });
    this._reactions = { ...this._reactions, [uuid]: particle };
    setTimeout(() => {
      const { [uuid]: p, ...rest } = this._reactions;
      p.$destroy();
      this._reactions = rest;
    }, 5000);
  }

  public _onReaction: Listener<WithPeerIentity<ReactionEvent['ADD_REACTION']>> = async event => {
    this.addReaction(event.emoji);
    App.instance.context.room.broadcast(event, { excluded_ids: [event.identity] });
    return Ok(null);
  };
}
