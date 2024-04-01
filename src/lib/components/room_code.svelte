<script lang="ts">
	import {
		EyeOutline,
		EyeSlashOutline,
		FileCopyOutline,
	} from "flowbite-svelte-icons";
	import { Toggle } from "bits-ui";
	import { Room } from "$lib/webrtc/room";

	const room_id = Room.instance.readable("ROOM_ID");

	let unlocked = false;

	function copy() {
		if ($room_id.id) navigator.clipboard.writeText($room_id.id);
	}
</script>

<div class="variant-filled gap-2 flex items-center center pl-4">
	<h1 class="pr-4">Code</h1>
	{#if unlocked}
		<span class="text-xl font-bold pb-1">{$room_id.id}</span>
	{:else}
		<span class="text-3xl font-bold pb-1">····</span>
	{/if}
	<Toggle.Root
		aria-label="toggle code visibility"
		class="transition-all active:scale-98"
		bind:pressed={unlocked}
	>
		{#if unlocked}
			<EyeOutline />
		{:else}
			<EyeSlashOutline />
		{/if}
	</Toggle.Root>
	<button class="btn-icon" on:click={copy}>
		<FileCopyOutline />
	</button>
</div>
