<script lang="ts">
  import {App} from '$lib/app';
  import {outline_style} from '$lib/global_styles';
  import type {PluginContext} from '$lib/plugins/plugin_manager';
  import type {PlaylistPlugin} from '../playlist';
  import {showOpenFilePicker} from 'file-system-access';
  import PlaylistSong from './playlist_song.svelte';
  import clsx from 'clsx';
  import {AddToPlaylist} from '../commands/add_to_playlist';
  import LL from '../../../../i18n/i18n-svelte';

  const queue = (
    App.instance.context as unknown as PluginContext<'playlist', PlaylistPlugin>
  ).playlist.playlist_manager.readable('UPDATE_PLAYLIST');

  async function onAddSongToPlaylist() {
    const handler = await showOpenFilePicker({ multiple: true });
    for (const song of handler) {
      App.instance.executeCommand(new AddToPlaylist(await song.getFile()));
    }
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
    'flex-col',
    'shadow-lg'
  )}
>
  <div class={clsx('flex', 'justify-between', 'items-center')}>
    <div />
    <div class={clsx('text-xl', 'font-bold', 'text-center')}><span
      class="hidden lg:inline">{$LL.roomScreen.playlist()}</span></div>
    <button
      type="button"
      on:click={onAddSongToPlaylist}
      class={clsx('btn', 'btn-sm', 'variant-filled-tertiary w-8 h-8', outline_style)}>+
    </button
    >
  </div>
  <div class="overflow-y-auto grow flex flex-col space-y-2 my-4">
    {#each $queue.queue as song, idx}
      <PlaylistSong {song} currently_playing={idx === 0} isFirst={idx === 1} isLast={idx === $queue.queue.length - 1} />
    {/each}
  </div>
</div>
