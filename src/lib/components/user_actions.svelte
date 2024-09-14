<script lang="ts">
  import clsx from 'clsx';
  import { App } from '$lib/app';
  import { onMount } from 'svelte';

  onMount(App.instance.plugin_manager.registerUserShorcutUI);
</script>

<div
  class={clsx('flex', 'items-center', 'justify-center md:justify-end', 'py-4 md:py-0', 'space-x-2', 'px-4')}
  bind:this={App.instance.plugin_manager.user_actions_shortcut_ref}
/>
