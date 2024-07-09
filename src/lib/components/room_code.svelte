<script lang="ts">
  import { EyeOutline, EyeSlashOutline, FileCopyOutline } from 'flowbite-svelte-icons';
  import { Toggle } from 'bits-ui';
  import { App } from '$lib/app';
  import { getToastStore } from '@skeletonlabs/skeleton';
  import clsx from 'clsx';

  const room_id = App.instance.context.room.readable('ROOM_ID');

  let unlocked = false;

  function copy() {
    if ($room_id.id) navigator.clipboard.writeText($room_id.id);
    App.instance.context.toaster.trigger({ message: 'Code copié dans le presse papier' });
  }
</script>

<div class="gap-2 flex items-center justify-center" id="access-room-code">
  <h1 class="pr-4">Code</h1>
  <div class="relative px-2">
    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <span class={clsx('text-6xl font-bold pb-1 opacity-0 ', !unlocked && 'opacity-100')}>····</span>
    </div>
    <span class={clsx('text-xl font-bold pb-1 opacity-0 ease-in-out duration-300', unlocked && 'opacity-100')}>
      {$room_id.id}
    </span>
  </div>
  <Toggle.Root
    aria-label="toggle code visibility"
    class="btn-icon variant-filled-tertiary border-b-4 border-black"
    bind:pressed={unlocked}
  >
    {#if unlocked}
      <EyeOutline />
    {:else}
      <EyeSlashOutline />
    {/if}
  </Toggle.Root>
  <button class="btn-icon variant-filled-tertiary border-b-4 border-black" on:click={copy}>
    <FileCopyOutline />
  </button>
</div>
