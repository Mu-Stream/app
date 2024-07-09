<script lang="ts">
  import { App } from '$lib/app';
  import { outline_style } from '$lib/global_styles';
  import type { PluginContext } from '$lib/plugins/plugin_manager';
  import type { PlaylistPlugin } from '../playlist';
  import { showOpenFilePicker } from 'file-system-access';
  import PlaylistSong from './playlist_song.svelte';
  import clsx from 'clsx';
  import { AddToPlaylist } from '../commands/add_to_playlist';
  const queue = (
    App.instance.context as unknown as PluginContext<'playlist', PlaylistPlugin>
  ).playlist.playlist_manager.readable('UPDATE_PLAYLIST');

  async function onAddSongToPlaylist() {
    const test = await showOpenFilePicker();
    const song = await test[0].getFile();
    App.instance.executeCommand(new AddToPlaylist(song));
  }
</script>

<div
  class={clsx(
    'bg-transparent-tertiary',
    'p-4',
    'rounded-3xl',
    'grow-[3]',
    'overflow-y-hidden',
    'h-full',
    'flex',
    'flex-col'
  )}
>
  <div class={clsx('flex', 'justify-between', 'items-center')}>
    <div />
    <div class={clsx('text-xl', 'font-bold', 'text-center')}>Playlist</div>
    <button
      type="button"
      on:click={onAddSongToPlaylist}
      class={clsx('btn', 'btn-sm', 'variant-filled-tertiary', outline_style)}>+</button
    >
  </div>
  <div class="overflow-y-auto grow flex flex-col">
    {#each $queue.queue as song}
      <PlaylistSong {song} />
    {/each}
  </div>
</div>
