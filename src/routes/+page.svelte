<script lang="ts">
  import { navigation } from '$lib/stores/navigation';
  import PlayerScreen from '$lib/components/player/screen.svelte';
  import UsersListScreen from '$lib/components/users/screen.svelte';
  import { App } from '$lib/app';
  import { is_mobile } from '$lib/stores/is_mobile';

  let files: FileList;

  // FIXME: JUST FOR QUICK TESTING
  const playImediatly = async () => {
    App.instance.context.room.playFile(files[0]);
  };

  $: files && playImediatly();
</script>

<div class="w-full h-full">
  {#if $is_mobile}
    {#if $navigation === 'PLAYER'}
      <PlayerScreen />
    {:else if $navigation === 'PARTICIPANTS'}
      <UsersListScreen />
    {/if}
  {:else}
    <PlayerScreen />
  {/if}
</div>
