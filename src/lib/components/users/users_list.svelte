<script lang="ts">
  import clsx from 'clsx';
  import User from './user.svelte';
  import { App } from '$lib/app';
  const user_list = App.instance.context.room.readable('USER_LIST');
</script>

<div class={clsx('h-full', 'space-y-2', 'bg-transparent-tertiary', 'p-4', 'rounded-3xl', 'grow', 'shadow-lg')}>
  <h3 class={clsx('text-xl', 'font-bold', 'text-center')}>Participants</h3>
  <div class={clsx('space-y-2')}>
    {#each $user_list.users as user}
      <User {user} />
    {/each}
  </div>
</div>
