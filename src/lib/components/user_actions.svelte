<script lang="ts">
	import { Room } from "$lib/webrtc/room";
	import clsx from "clsx";
	import { showOpenFilePicker } from "file-system-access";
	import { FileMusicSolid } from "flowbite-svelte-icons";
	import { outline_style } from "$lib/global_styles";

	async function pick_songs() {
		const test = await showOpenFilePicker();
		const song = await test[0].getFile();
		Room.instance.playFile(song);
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
	<button class={clsx("btn", "variant-filled-tertiary", outline_style)}>
		<span>😁</span>
		<span class="hidden md:inline">réagir</span>
	</button>
	<button
		class={clsx("btn", "variant-filled-tertiary", outline_style)}
		on:click={pick_songs}
	>
		<FileMusicSolid />
		<span class="hidden md:inline">ajouter un son</span>
	</button>
</div>
