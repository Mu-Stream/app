<script lang="ts">
  import { App } from '$lib/app';
  import { outline_style } from '$lib/global_styles';
  import { ReactCommand } from '../commands/react';
  import clsx from 'clsx';
  import type { PopupSettings } from '@skeletonlabs/skeleton';
  import { popup } from '@skeletonlabs/skeleton';

  let emojis = [
    '😁',
    '😂',
    '😃',
    '😄',
    '😅',
    '😆',
    '🤮',
    '🤩',
    '🤨',
    '🤐',
    '😴',
    '🤡',
    '❤️',
    '☠️',
    '💩',
    '🫦',
    '🕺',
    '💃',
    '🏎️',
    '🔥',
    '🎶',
  ];
  let dropdownOpen = false;
  let selectedEmoji = emojis[0];

  function selectEmoji(emoji) {
    selectedEmoji = emoji;
    App.instance.executeCommand(new ReactCommand(selectedEmoji));
  }

  const popupFeatured: PopupSettings = {
    event: 'click',
    target: 'popupFeatured',
    placement: 'bottom',
    closeQuery: '#btn-add-reaction',
  };
</script>

<button id="btn-add-reaction" class={clsx('btn', 'variant-filled-tertiary', outline_style)} use:popup={popupFeatured}>
  <span>😁</span>
  <span class="hidden md:inline">réagir</span>
</button>

<div class="card p-4 w-72 shadow-xl" data-popup="popupFeatured">
  {#each emojis as emoji}
    <button class="btn text-3xl" on:click={event => selectEmoji(emoji)}>{emoji}</button>
  {/each}
</div>
