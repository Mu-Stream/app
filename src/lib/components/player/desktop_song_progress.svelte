<script lang="ts">
  import SongControls from '$lib/components/player/mobile_song_controls.svelte';
  import { ProgressBar } from '@skeletonlabs/skeleton';
  import clsx from 'clsx';
  import { formatSeconds } from '$lib/duration_formatter';
  import UserActions from '$lib/components/user_actions.svelte';
  import { playlist } from '$lib/stores/playlist';
  import { App } from '$lib/app';

  const song_progress = App.instance.context.audio_manager.readable('CURRENTLY_PLAYING');
  const song_meta = App.instance.context.audio_manager.readable('CURRENTLY_METADATA');
</script>

<div class={clsx('p-2', 'space-x-4', 'space-y-2', 'text-white')}>
  <!-- {#if current_song !== undefined} -->
  <ProgressBar value={$song_progress.current_time} max={$song_progress.total_time} meter={'bg-tertiary-500'} />
  <div class={clsx('flex', 'items-center', 'space-x-4')}>
    <SongControls />

    <div class={clsx('flex', 'justify-between')}>
      <h5>
        {`${formatSeconds($song_progress.current_time)} / ${formatSeconds($song_progress.total_time)}`}
      </h5>
    </div>
    <div class={clsx('flex-1')}></div>
    <div>
      <h5 class={clsx('txt-xl', 'font-bold', 'capitalize')}>
        {$song_meta.title}
      </h5>
      <h4 class={clsx('capitalize')}>
        {$song_meta.artist}
      </h4>
    </div>
    <div class={clsx('flex-1')}></div>
    <UserActions />
  </div>
  <!-- {:else}
    <UserActions />
  {/if} -->
</div>
