<script lang="ts">
  import { navigation } from '$lib/stores/navigation';
  import PlayerScreen from '$lib/components/player/screen.svelte';
  import UsersListScreen from '$lib/components/users/screen.svelte';
  import { App } from '$lib/app';
  import { is_mobile } from '$lib/stores/is_mobile';
  import clsx from 'clsx';
  import Playlist from '$lib/plugins/playlist/components/playlist.svelte';

  let files: FileList;

  // FIXME: JUST FOR QUICK TESTING
  const playImediatly = async () => {
    App.instance.context.room.playFile(files[0]);
  };

  $: files && playImediatly();
</script>

{#if $is_mobile}
  {#if $navigation === 'PLAYER'}
    <PlayerScreen />
  {:else if $navigation === 'PARTICIPANTS'}
    <UsersListScreen />
  {:else if $navigation === 'PLAYLIST'}
    <div class="px-4 w-full h-full">
      <Playlist />
    </div>
  {:else}
    <div class="px-4 w-full h-full">
      <div class={clsx('bg-transparent-tertiary w-full h-full rounded-3xl flex items-center justify-center')}>
        <h1>Comming soon ?</h1>
      </div>
    </div>
  {/if}
{:else}
  <PlayerScreen />
{/if}
