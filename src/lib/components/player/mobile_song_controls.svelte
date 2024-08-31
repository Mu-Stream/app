<script lang="ts">
  import { App } from '$lib/app';
  import { PauseCommand } from '$lib/commands/pause';
  import { ResumeCommand } from '$lib/commands/resume';
  import { getToastStore, RangeSlider } from '@skeletonlabs/skeleton';
  import clsx from 'clsx';
  import {
    CaretLeftOutline,
    CaretRightOutline,
    PauseOutline,
    PlayOutline,
    VolumeDownOutline,
  } from 'flowbite-svelte-icons';

  const toastStore = getToastStore();

  const song_progress = App.instance.context.audio_manager.readable('CURRENTLY_PLAYING');
  const volume = App.instance.context.audio_manager.readable('VOLUME');

  async function pause() {
    const res = await App.instance.executeCommand(new PauseCommand());
    res.match({
      Ok: () => {},
      Err: e => toastStore.trigger({ message: e.message }),
    });
  }

  async function resume() {
    const res = await App.instance.executeCommand(new ResumeCommand());
    res.match({
      Ok: () => {},
      Err: e => toastStore.trigger({ message: e.message }),
    });
  }
</script>

<div id="song-controls" class={clsx('flex', 'justify-center', 'space-x-4')}>
  {#if $song_progress.status === 'PLAYING'}
    <button
      on:click={pause}
      type="button"
      class={clsx('btn-icon', 'variant-filled-tertiary', 'h-16', 'w-16', 'border-b-4', 'border-black')}
    >
      <PauseOutline size="xl" />
    </button>
  {:else}
    <button
      on:click={resume}
      type="button"
      class={clsx('btn-icon', 'variant-filled-tertiary', 'h-16', 'w-16', 'border-b-4', 'border-black')}
    >
      <PlayOutline size="xl" />
    </button>
  {/if}
  <button type="button" class={clsx('btn-icon', '!bg-transparent')} disabled>
    <CaretRightOutline size="xl" />
  </button>

  <div class={clsx('flex', 'space-x-2', 'items-center', 'justify-center', 'px-2')}>
    <VolumeDownOutline size="xl" />
    <RangeSlider
      name="range-slider"
      value={$volume.value}
      max={1}
      step={0.1}
      ticked
      on:change={e => (App.instance.context.audio_manager.gain = e.target.value)}
    />
  </div>
</div>
