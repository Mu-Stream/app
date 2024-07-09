<script lang="ts">
  import clsx from 'clsx';
  import UsersList from './users/users_list.svelte';
  import { App } from '../app';
  import { onMount } from 'svelte';

  onMount(App.instance.plugin_manager.registerSidebarUI);
</script>

<div
  class={clsx(
    'hidden',
    'md:flex',
    'h-full',
    'flex-col',
    'relative',
    'text-white',
    'max-w-96',
    'w-96',
    'p-4',
    'space-y-4'
  )}
  bind:this={App.instance.plugin_manager.sidebar_ref}
>
  <UsersList />
</div>
