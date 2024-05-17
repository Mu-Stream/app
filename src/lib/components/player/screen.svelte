<script lang="ts">
  import StyledCover from '$lib/components/styled_cover.svelte';
  import SongProgress from './mobile_song_progress.svelte';
  import clsx from 'clsx';
  import SongControls from './mobile_song_controls.svelte';
  import UserActions from '$lib/components/user_actions.svelte';
  import { playlist } from '$lib/stores/playlist';
  import { is_mobile } from '$lib/stores/is_mobile';
  import { App } from '$lib/app';
  import { derived } from 'svelte/store';

  const current_meta = App.instance.context.audio_manager.readable('CURRENTLY_METADATA');

  const image = derived(current_meta, $current_meta => {
    if ($current_meta.img.length === 0) return '';
    var blob = new Blob([new Uint8Array($current_meta.img[0].data)], { type: $current_meta.img[0].format });
    return URL.createObjectURL(blob);
  });
</script>

<div class={clsx('flex', 'flex-col', 'w-full', 'h-full', 'px-8', 'space-y-4', 'items-center', 'justify-center')}>
  <!-- {#if current_song !== undefined} -->
  <StyledCover alt="cover" src={$image} height="md:h-96" width="w-full md:w-96" />

  {#if $is_mobile}
    <div class={clsx('flex', 'flex-col', 'w-full', 'relative')}>
      <div class={clsx('space-y-2')}>
        <h1 class={clsx('text-3xl', 'font-bold')}>
          {$current_meta.title}
        </h1>
        <h4 class={clsx('text-sm')}>
          {$current_meta.artist}
        </h4>
      </div>

      <SongProgress />
      <SongControls />
      <UserActions />
    </div>
  {/if}
  <!-- {:else}
    <div>Pas de musique</div>
  {/if} -->
</div>
