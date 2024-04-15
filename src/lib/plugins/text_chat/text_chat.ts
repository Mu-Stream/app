import { Plugin, type Binder } from '$lib/plugins/i_plugin';
import { Ok, type Result } from 'bakutils-catcher';
import TextChat from './components/chat.svelte';
import { TextChatManager } from './notifiers/text_chat_manager';

export class TextChatPlugin extends Plugin<'text_chat'> {
  name: 'text_chat' = 'text_chat';

  plugin_context = {
    text_chat_manager: new TextChatManager(),
  };

  version = 0.01;

  async init(): Promise<Result<null, Error>> {
    return Ok(null);
  }

  async dispose(): Promise<Result<null, Error>> {
    return Ok(null);
  }

  async hookEvents(bind: Binder<string, any>): Promise<Result<null, Error>> {
    bind('ADD_TEXT_CHAT', this.context.text_chat.text_chat_manager.bind);
    return Ok(null);
  }
  public mountSidebarUI(target: HTMLDivElement): Result<null, Error> {
    new TextChat({ target });
    return Ok(null);
  }
}
