<script lang="ts">
	import { room } from "$lib/webrtc/room";
	import clsx from "clsx";
	import { showOpenFilePicker } from "file-system-access";
	import { FileMusicSolid } from "flowbite-svelte-icons";

	async function pick_songs() {
		const test = await showOpenFilePicker();
		const song = await test[0].getFile();
		room.playFile(song);
	}
</script>

<div
	class={clsx(
		"flex",
		"items-center",
		"justify-center md:justify-end",
		"py-4 md:py-0",
		"space-x-2",
		"px-4",
	)}
>
	<button
		class={clsx(
			"btn",
			"variant-filled-tertiary",
			"border-b-4",
			"border-black",
		)}
	>
		<span>😁</span>
		<span class="hidden md:inline">réagir</span>
	</button>
	<button
		class={clsx(
			"btn",
			"variant-filled-tertiary",
			"border-b-4",
			"border-black",
		)}
		on:click={pick_songs}
	>
		<FileMusicSolid />
		<span class="hidden md:inline">ajouter un son</span>
	</button>
</div>
