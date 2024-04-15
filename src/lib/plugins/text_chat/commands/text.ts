import { Command } from '$lib/commands/i_commands';
import { Ok, type Result } from 'bakutils-catcher';
import type { TextChatPlugin } from '../text_chat';
import type { TextChatEvent } from '../notifiers/text_chat_manager';

export class TextCommand extends Command<TextChatPlugin['context']> {
  constructor(private text: string) {
    super();
  }

  public async execute(context: TextChatPlugin['context']): Promise<Result<null, Error>> {
    let username = 'admin';
    if (context.room.client_peer) {
      username = context.room.client_peer.username;
    }

    const event: TextChatEvent['ADD_TEXT_CHAT'] = {
      type: 'ADD_TEXT_CHAT',
      text: this.text,
      nickname: username,
    };
    context.room.send(event);
    context.room.broadcast(event);
    context.text_chat.text_chat_manager.addTextChat(event.nickname, event.text);
    return Ok(null);
  }
}
