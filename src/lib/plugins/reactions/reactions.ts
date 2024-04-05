import { Notifier, type Events } from '$lib/notifier/i_notifier';
import { Plugin, type Binder } from '$lib/plugins/i_plugin';
import { Ok, type Result } from 'bakutils-catcher';
import Reaction from './components/react.svelte';
import type { SvelteComponent } from 'svelte';

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

	private _player_screen_widget: SvelteComponent[] = [];

	mountPlayerScreen(userActionContainer: HTMLDivElement): void {
		this._player_screen_widget.push(new Reaction({ target: document.body }));
	}

	unmountPlayerScreen(): void {
		console.log('unmounting player screen');
		this._player_screen_widget.forEach(w => w.$destroy());
		this._player_screen_widget = [];
	}
}

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
	constructor() {
		super();
	}
}
