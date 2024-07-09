<script lang="ts">
  import StyledCover from '$lib/components/styled_cover.svelte';
  import clsx from 'clsx';
  import { DotsVerticalOutline, FileMusicSolid } from 'flowbite-svelte-icons';
  import type { Song } from '../notifier/playlist_manager';
  import { App } from '$lib/app';
  export let song: Song;

  const image = () => {
    if (song.img?.length === 0) return '';
    var blob = new Blob([new Uint8Array(song.img[0].data)], { type: song.img[0].format });
    return URL.createObjectURL(blob);
  };

  const user_list = App.instance.context.room.readable('USER_LIST');
  console.log($user_list);

  const name = song.identity === 'host' ? 'hôte' : $user_list.users.find(p => p.id === song.identity)?.username;
</script>

<div class="flex space-x-2 px-2 items-center my-2">
  {#if song.img?.length === 0}
    <div class={clsx('w-28', 'h-16', 'flex', 'items-center', 'justify-center')}>
      <FileMusicSolid size="xl" />
    </div>
  {:else}
    <img src={image()} alt={`cover-${song.title}`} class={clsx('w-16', 'h-16', 'rounded-2xl', 'shadow-lg')} />
  {/if}
  <div class={clsx('pr-2', 'w-full')}>
    <h5 class={clsx('font-bold', 'text-sm', 'text-ellipsis')}>{song.title}</h5>
    <h4 class="text-xs">{song.artist}</h4>
    <span class="chip variant-filled-tertiary rounded-2xl">{name}</span>
  </div>
  <DotsVerticalOutline size="xl" />
</div>
