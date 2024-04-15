<script lang="ts">
  import { App } from '$lib/app';
  import type { PluginContext } from '$lib/plugins/plugin_manager';
  import clsx from 'clsx';
  import { TextCommand } from '../commands/text';
  import type { TextChatPlugin } from '../text_chat';

  let text: string;

  const chat_msgs = (
    App.instance.context as unknown as PluginContext<'text_chat', TextChatPlugin>
  ).text_chat.text_chat_manager.readable('TEXT_ADDED_IN_LIST');

  function sendMessage() {
    App.instance.executeCommand(new TextCommand(text));
    text = '';
  }
</script>

<div class={clsx('h-full', 'space-y-2')}>
  <h3 class={clsx('text-xl', 'font-bold', 'text-center')}>Chat en direct</h3>
  <div class={clsx('h-full', 'space-y-2')}>
    {#each $chat_msgs.messages as text_msg}
      <div class="grid grid-cols-[auto_1fr] gap-1">
        <div class="card p-1 variant-soft rounded-tl-none space-y-2">
          <header class="flex justify-between items-center">
            <p class="font-bold">{text_msg.nickname}</p>
          </header>
          <p>{text_msg.text}</p>
        </div>
      </div>
      <br />
    {/each}
  </div>
  <div>
    <input bind:value={text} />
    <button on:click={sendMessage}>Envoyer !</button>
  </div>
</div>
