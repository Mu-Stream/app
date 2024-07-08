import { App } from '$lib/app';
import { Notifier, type Events, type Listener } from '$lib/notifier/i_notifier';
import type { WithPeerIentity } from '$lib/notifier/peer';
import { Ok } from 'bakutils-catcher';

export type TextChatEventType = 'ADD_TEXT_CHAT' | 'TEXT_ADDED_IN_LIST' | 'ADD_HISTORY_TO_TEXT_CHAT';

export type TextChatEvent = Events<
	TextChatEventType,
	{
		ADD_TEXT_CHAT: {
			type: 'ADD_TEXT_CHAT';
			text: string;
			nickname: string;
			uuid: string;
		};
		TEXT_ADDED_IN_LIST: {
			type: 'TEXT_ADDED_IN_LIST';
			messages: { nickname: string; text: string; uuid: string }[];
		};
		ADD_HISTORY_TO_TEXT_CHAT: {
			type: 'ADD_HISTORY_TO_TEXT_CHAT';
			list: { nickname: string; text: string; uuid: string }[];
		};
	}
>;

export class TextChatManager extends Notifier<TextChatEventType, TextChatEvent> {
	public listOfMessages: { nickname: string; text: string; uuid: string }[] = [];

	constructor() {
		super({
			readable_default_values: {
				TEXT_ADDED_IN_LIST: {
					type: 'TEXT_ADDED_IN_LIST',
					messages: [],
				},
			},
		});
		this.subscribe('ADD_TEXT_CHAT', this._onTextChat);
		this.subscribe('ADD_HISTORY_TO_TEXT_CHAT', this._onhistoryLoaded);
	}

	public addTextChat(nickname: string, text: string, uuid: string) {
		this.listOfMessages.push({ nickname, text, uuid });
		this._notify({ type: 'TEXT_ADDED_IN_LIST', messages: this.listOfMessages });
	}

	public _onhistoryLoaded: Listener<TextChatEvent['ADD_HISTORY_TO_TEXT_CHAT']> = async event => {
		this.listOfMessages = event.list;
		this._notify({ type: 'TEXT_ADDED_IN_LIST', messages: this.listOfMessages });
		return Ok(null);
	};

	public _onTextChat: Listener<WithPeerIentity<TextChatEvent['ADD_TEXT_CHAT']>> = async event => {
		this.addTextChat(event.nickname, event.text, event.uuid);
		App.instance.context.room.broadcast(event, { excluded_ids: [event.identity] });
		return Ok(null);
	};
}
