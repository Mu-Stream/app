<script lang="ts">
  import { App } from '$lib/app';
  import type { PluginContext } from '$lib/plugins/plugin_manager';
  import clsx from 'clsx';
  import { TextCommand } from '../commands/text';
  import type { TextChatPlugin } from '../text_chat';
  import { PaperPlaneOutline } from 'flowbite-svelte-icons';

  let text: string;
  const currentUuid = App.instance.context.room.client_peer?.id ?? '';
  const chat_msgs = (
    App.instance.context as unknown as PluginContext<'text_chat', TextChatPlugin>
  ).text_chat.text_chat_manager.readable('TEXT_ADDED_IN_LIST');

  let input: HTMLInputElement;
  let lastMessage: HTMLDivElement;

  function sendMessage() {
    if (text.length === 0 || text.trim() === '') return;
    App.instance.executeCommand(new TextCommand(text));
    text = '';
    // refocus on the input
    input.focus();
  }

  $: $chat_msgs.messages && lastMessage && lastMessage.scrollIntoView({ behavior: 'smooth' });
</script>

<div
  class={clsx(
    'space-y-2',
    'bg-transparent-tertiary',
    'p-4',
    'rounded-3xl',
    'grow-[3]',
    'h-full',
    'flex',
    'flex-col',
    'overflow-y-hidden'
  )}
>
  <div class={clsx('text-xl', 'font-bold', 'text-center')}>Chat en direct</div>
  <div class="overflow-y-auto grow">
    {#each $chat_msgs.messages as text_msg}
      <div
        id="message-{text_msg.uuid}"
        bind:this={lastMessage}
        class={clsx('grid', 'grid-cols-[auto]', 'mb-1', text_msg.uuid === currentUuid && 'float-right', 'w-[90%]')}
      >
        <div
          class={clsx(
            'card',
            'py-1',
            'px-4',
            text_msg.uuid === currentUuid ? 'rounded-tr-none' : 'rounded-tl-none',
            text_msg.uuid === currentUuid && 'bg-tertiary',
            text_msg.uuid === currentUuid ? 'border-r-1' : 'border-l-1',
            text_msg.uuid === currentUuid ? 'variant-soft-tertiary' : 'variant-soft-primary',
            'border-b-4',
            'rounded-3xl',
            'border-black',
            'text-white'
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
    <div class={clsx('relative')}>
      <form>
        <input
          bind:this={input}
          class={clsx('input', 'w-full', 'h-8', 'px-4', 'text-black', 'bg-transparent-tertiary')}
          bind:value={text}
        />
        <button
          class={clsx(
            'absolute',
            'right-1',
            'top-1',
            'btn-icon',
            'w-6',
            'h-6',
            'variant-filled-tertiary',
            'border-b-4',
            'border-black'
          )}
          disabled={text?.length === 0 || text?.trim() === ''}
          on:click={sendMessage}
        >
          <PaperPlaneOutline class={clsx('rotate-90')} size="sm" />
        </button>
      </form>
    </div>
  </div>
</div>
