<script lang="ts">
  import { App } from '$lib/app';
  import type { PluginContext } from '$lib/plugins/plugin_manager';
  import clsx from 'clsx';
  import { TextCommand } from '../commands/text';
  import type { TextChatPlugin } from '../text_chat';

  let text: string;
  const currentUuid = App.instance.context.room.client_peer?.id ?? '';
  const chat_msgs = (
    App.instance.context as unknown as PluginContext<'text_chat', TextChatPlugin>
  ).text_chat.text_chat_manager.readable('TEXT_ADDED_IN_LIST');

  function sendMessage() {
    App.instance.executeCommand(new TextCommand(text));
    text = '';
  }
</script>

<div class={clsx('space-y-2')} style="width: 250px;">
  <!-- Largeur fixe ajoutée -->
  <div class={clsx('text-xl', 'font-bold', 'text-center')}>Chat en direct</div>
  <div class="overflow-y-auto overflow-x-hidden h-[35vh]">
    {#each $chat_msgs.messages as text_msg}
      <div
        class={clsx('grid', 'grid-cols-[auto]', 'mb-1', text_msg.uuid === currentUuid && 'float-right')}
        style="width: 90%;"
      >
        <div
          class={clsx(
            'card',
            'p-0.5',
            'variant-soft',
            text_msg.uuid === currentUuid ? 'rounded-tr-none' : 'rounded-tl-none',
            text_msg.uuid === currentUuid && 'bg-[#DF4BC4]'
          )}
        >
          <header class="flex justify-between items-center">
            <p class="text-pretty break-all text-sm font-bold">{text_msg.nickname}</p>
          </header>
          <p class="text-pretty break-all text-sm">{text_msg.text}</p>
        </div>
      </div>
    {/each}
  </div>
  <div class="bottom-0 grid grid-cols-[auto]">
    <input bind:value={text} />
    <button on:click={sendMessage}>Envoyer !</button>
  </div>
</div>
