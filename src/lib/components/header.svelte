<script lang="ts">
  import RoomCode from '$lib/components/room_code.svelte';
  import { outline_style } from '$lib/global_styles';
  import clsx from 'clsx';
  import { App } from '$lib/app';
  import { QuitCommand } from '$lib/commands/quit';

  function onQuit() {
    App.instance.executeCommand(new QuitCommand());
  }
</script>

<div class={clsx('flex', 'justify-around', 'items-center', 'py-2', 'bg-tertiary-300')}>
  <h1 class={clsx('text-2xl', 'font-bold')}>Mu Stream</h1>
  <RoomCode />
  <button class={clsx('btn', 'btn-sm', 'variant-filled-tertiary', outline_style)} on:click={onQuit}>
    {#if App.instance.context.room.is_client}
      Déconnexion
    {:else}
      Supprimer la salle
    {/if}
  </button>
</div>
