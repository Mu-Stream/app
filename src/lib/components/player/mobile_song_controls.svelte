<script lang="ts">
	import { AudioManager } from "$lib/notifier/audio_manager";
	import { Room } from "$lib/notifier/room";
	import clsx from "clsx";
	import {
		CaretLeftOutline,
		CaretRightOutline,
		PauseOutline,
		PlayOutline,
	} from "flowbite-svelte-icons";

	const song_progress = AudioManager.instance.readable("CURRENTLY_PLAYING");
</script>

<div class={clsx("flex", "justify-center", "space-x-4")}>
	<button type="button" class="btn-icon !bg-transparent">
		<CaretLeftOutline size="xl" />
	</button>
	{#if $song_progress.status === "PLAYING"}
		<button
			on:click={Room.instance.pause}
			type="button"
			class={clsx(
				"btn-icon",
				"variant-filled-tertiary",
				"h-16",
				"w-16",
				"border-b-4",
				"border-black",
			)}
		>
			<PauseOutline size="xl" />
		</button>
	{:else}
		<button
			on:click={Room.instance.resume}
			type="button"
			class={clsx(
				"btn-icon",
				"variant-filled-tertiary",
				"h-16",
				"w-16",
				"border-b-4",
				"border-black",
			)}
		>
			<PlayOutline size="xl" />
		</button>
	{/if}
	<button type="button" class={clsx("btn-icon", "!bg-transparent")}>
		<CaretRightOutline size="xl" />
	</button>
</div>
