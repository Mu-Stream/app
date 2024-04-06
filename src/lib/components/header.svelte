<script lang="ts">
  import RoomCode from '$lib/components/room_code.svelte';
  import clsx from 'clsx';
</script>

<div class={clsx('flex', 'justify-evenly', 'items-center', 'py-2', 'bg-tertiary-300')}>
  <h1 class={clsx('text-2xl', 'font-bold')}>Mu Stream</h1>
  <RoomCode />
</div>
