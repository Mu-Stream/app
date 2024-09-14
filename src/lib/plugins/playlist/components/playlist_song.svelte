<script lang="ts">
  import clsx from 'clsx';
  import {
    ArrowDownOutline,
    ArrowUpOutline,
    DotsVerticalOutline,
    FileMusicSolid,
    PlayOutline,
    TrashBinSolid,
  } from 'flowbite-svelte-icons';
  import type {Song} from '../notifier/playlist_manager';
  import {App} from '$lib/app';
  import {RemoveSong} from '../commands/remove_song';
  import {MoveSongDown} from "$lib/plugins/playlist/commands/move_song_down";
  import {MoveSongUp} from "$lib/plugins/playlist/commands/move_song_up";

  export let song: Song;
  export let currently_playing: boolean = false;
  export let isFirst: boolean = false;
  export let isLast: boolean = false;

  const img = () => {
    if (!song.localImg) return '';
    return URL.createObjectURL(song.localImg as Blob);
  };

  let image: string;

  $: song && (image = img());

  const user_list = App.instance.context.room.readable('USER_LIST');

  const name = song.identity === 'host' ? 'hôte' : $user_list.users.find(p => p.id === song.identity)?.username;

  const id = `song-controls-${song.uuid}`;

  let options_open = false;

  function moveUp() {
    App.instance.executeCommand(new MoveSongUp(song.uuid));
    options_open = false;
  }

  function moveDown() {
    App.instance.executeCommand(new MoveSongDown(song.uuid));
    options_open = false;
  }

  function remove() {
    App.instance.executeCommand(new RemoveSong(song.uuid));
  }
</script>

<div class="items-center bg-transparent-tertiary rounded-3xl p-2 relative flex h-32 max-h-32 text-nowrap text-ellipsis">
  {#if currently_playing}
    <div class="bg-tertiary-500 rounded-3xl w-6 h-6 flex items-center justify-center absolute top-2 right-2">
      <PlayOutline size="md" />
    </div>
  {/if}
  {#if !song.localImg}
    <div class={clsx('w-28', 'h-16', 'flex', 'items-center', 'justify-center')}>
      <FileMusicSolid size="xl" />
    </div>
  {:else}
    <img src={image} alt={`cover-${song.title}`} class={clsx('w-16', 'h-16', 'rounded-2xl', 'shadow-lg')} />
  {/if}
  <div class={clsx(options_open ? 'w-0 opacity-0' : 'w-full', 'overflow-hidden transition-all ease-out pl-2')}>
    <div class={clsx('flex space-x-2')}>
      <div class={clsx('pr-2', 'w-full')}>
        <h5 class={clsx('font-bold', 'text-sm', 'text-ellipsis')}>{song.title}</h5>
        <h4 class="text-xs">{song.artist}</h4>
        <span class="chip variant-filled-tertiary rounded-2xl">{name}</span>
      </div>
    </div>
  </div>
  <div
    class={clsx(
      !options_open ? 'w-0 opacity-0' : 'w-full',
      'overflow-hidden transition-all ease-out flex flex-row space-x-2 items-center justify-center'
    )}
  >
    <button class="btn btn-icon variant-filled-tertiary border-b-4 border-black" on:click={moveUp} disabled={isFirst}>
      <ArrowUpOutline size="md" />
    </button>
    <button class="btn btn-icon variant-filled-tertiary border-b-4 border-black" on:click={moveDown} disabled={isLast}>
      <ArrowDownOutline size="md" />
    </button>
    <button class="btn btn-icon variant-filled-tertiary border-b-4 border-black" on:click={remove}>
      <TrashBinSolid size="md" />
    </button>
  </div>
  {#if !currently_playing}
    <button class={clsx('btn')} on:click={() => (options_open = !options_open)}>
      <DotsVerticalOutline size="xl" />
    </button>
  {/if}
</div>
