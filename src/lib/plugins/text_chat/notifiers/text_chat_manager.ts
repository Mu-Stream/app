import { Notifier, type Events, type Listener } from '$lib/notifier/i_notifier';
import { Ok } from 'bakutils-catcher';

export type TextChatEventType = 'ADD_TEXT_CHAT' | 'TEXT_ADDED_IN_LIST';

export type TextChatEvent = Events<
  TextChatEventType,
  {
    ADD_TEXT_CHAT: {
      type: 'ADD_TEXT_CHAT';
      text: string;
      nickname: string;
    };
    TEXT_ADDED_IN_LIST: {
      type: 'TEXT_ADDED_IN_LIST';
      messages: { nickname: string; text: string }[];
    };
  }
>;

export class TextChatManager extends Notifier<TextChatEventType, TextChatEvent> {
  public listOfMessages: { nickname: string; text: string }[] = [];

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
  }

  public addTextChat(nickname: string, text: string) {
    this.listOfMessages.push({ nickname, text });
    this._notify({ type: 'TEXT_ADDED_IN_LIST', messages: this.listOfMessages });
  }

  public _onTextChat: Listener<TextChatEvent['ADD_TEXT_CHAT']> = async event => {
    this.addTextChat(event.nickname, event.text);
    return Ok(null);
  };
}
