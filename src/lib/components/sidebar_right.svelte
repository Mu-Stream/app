<script lang="ts">
  import clsx from 'clsx';
  import UsersList from './users/users_list.svelte';
  import { App } from '../app';
  import { onMount } from 'svelte';

  onMount(App.instance.plugin_manager.registerSidebarUI);
</script>

<div
  class={clsx('hidden', 'md:flex', 'h-full', 'flex-col', 'mx-4', 'relative', 'text-white', 'max-w-96', 'w-96', 'py-8')}
  bind:this={App.instance.plugin_manager.sidebar_ref}
>
  <div class={clsx('h-full', 'space-y-2')}>
    <h3 class={clsx('text-xl', 'font-bold', 'text-center')}>Participants</h3>
    <UsersList />
  </div>
</div>
