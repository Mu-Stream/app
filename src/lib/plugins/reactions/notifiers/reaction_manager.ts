import { Notifier, type Events } from "$lib/notifier/i_notifier";

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
