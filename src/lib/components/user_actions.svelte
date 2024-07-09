<script lang="ts">
  import clsx from 'clsx';
  import { showOpenFilePicker } from 'file-system-access';
  import { FileMusicSolid } from 'flowbite-svelte-icons';
  import { outline_style } from '$lib/global_styles';
  import { App } from '$lib/app';
  import { onMount } from 'svelte';

  onMount(App.instance.plugin_manager.registerUserShorcutUI);

  async function pick_songs() {
    const test = await showOpenFilePicker();
    const song = await test[0].getFile();
    App.instance.context.room.playFile(song);
  }
</script>

<div
  class={clsx('flex', 'items-center', 'justify-center md:justify-end', 'py-4 md:py-0', 'space-x-2', 'px-4')}
  bind:this={App.instance.plugin_manager.user_actions_shortcut_ref}
>
  <button id="btn-add-song" class={clsx('btn', 'variant-filled-tertiary', outline_style)} on:click={pick_songs}>
    <FileMusicSolid />
    <span class="hidden lg:inline">ajouter un son</span>
  </button>
</div>
