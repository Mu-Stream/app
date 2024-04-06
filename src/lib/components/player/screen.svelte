<script lang="ts">
  import StyledCover from '$lib/components/styled_cover.svelte';
  import SongProgress from './mobile_song_progress.svelte';
  import clsx from 'clsx';
  import SongControls from './mobile_song_controls.svelte';
  import UserActions from '$lib/components/user_actions.svelte';
  import { playlist } from '$lib/stores/playlist';
  import { is_mobile } from '$lib/stores/is_mobile';

  let current_song: any | undefined = $playlist !== undefined ? $playlist[0] : undefined;

  $: current_song = $playlist !== undefined ? $playlist[0] : undefined;
</script>

<div class={clsx('flex', 'flex-col', 'w-full', 'h-full', 'px-8', 'space-y-4', 'items-center', 'justify-center')}>
  {#if current_song !== undefined}
    <StyledCover alt="cover" src={current_song.cover} height="md:h-96" width="w-full md:w-96" />

    {#if $is_mobile}
      <div class={clsx('flex', 'flex-col', 'w-full', 'relative')}>
        <div class={clsx('space-y-2')}>
          <h1 class={clsx('text-3xl', 'font-bold')}>
            {current_song.title}
          </h1>
          <h4 class={clsx('text-sm')}>
            {current_song.artist}
          </h4>
        </div>

        <SongProgress />
        <SongControls />
        <UserActions />
      </div>
    {/if}
  {:else}
    <div>Pas de musique</div>
  {/if}
</div>
