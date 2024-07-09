<script lang="ts">
  import StyledCover from '$lib/components/styled_cover.svelte';
  import SongProgress from './mobile_song_progress.svelte';
  import clsx from 'clsx';
  import SongControls from './mobile_song_controls.svelte';
  import UserActions from '$lib/components/user_actions.svelte';
  import { is_mobile } from '$lib/stores/is_mobile';
  import { App } from '$lib/app';
  import { derived } from 'svelte/store';
  import { FileMusicSolid } from 'flowbite-svelte-icons';

  const current_meta = App.instance.context.audio_manager.readable('CURRENTLY_METADATA');

  const image = derived(current_meta, $current_meta => {
    if ($current_meta.img?.length === 0) return '';
    var blob = new Blob([new Uint8Array($current_meta.img[0].data)], { type: $current_meta.img[0].format });
    return URL.createObjectURL(blob);
  });
</script>

<div class={clsx('flex', 'flex-col', 'w-full', 'h-full', 'px-8', 'items-center', 'justify-center', 'grow')}>
  {#if $image !== ''}
    <StyledCover id="main-cover" alt="cover" src={$image} />
  {:else}
    <FileMusicSolid size="xl" class={clsx('grow')} />
  {/if}
  {#if $is_mobile}
    <div class={clsx('flex', 'flex-col', 'w-full', 'relative', 'justify-end', 'grow', 'text-white')}>
      <UserActions />
      <div class={clsx('space-y-2')}>
        <h1 class={clsx('text-xl', 'md:text-3xl', 'font-bold')}>
          {$current_meta.title}
        </h1>
        <h4 class={clsx('text-sm')}>
          {$current_meta.artist}
        </h4>
      </div>

      <SongProgress />
      <SongControls />
    </div>
  {/if}
</div>
