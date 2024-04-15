<script lang="ts">
  import clsx from 'clsx';
  import User from './user.svelte';
  import { App } from '$lib/app';
  const user_list = App.instance.context.room.readable('USER_LIST');
</script>

<div class={clsx('space-y-2')}>
  {#each $user_list.users as user}
    <User {user} />
  {/each}
</div>
