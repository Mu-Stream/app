<script lang="ts">
	import { CommandManager } from "$lib/commands/command_manager";
	import { PauseCommand } from "$lib/commands/pause";
	import { ResumeCommand } from "$lib/commands/resume";
	import { Room } from "$lib/notifier/room";
	import { getToastStore } from "@skeletonlabs/skeleton";
	import clsx from "clsx";
	import {
		CaretLeftOutline,
		CaretRightOutline,
		PauseOutline,
		PlayOutline,
	} from "flowbite-svelte-icons";

	const toastStore = getToastStore();

	const song_progress = Room.instance.readable("CURRENTLY_PLAYING");

	async function pause() {
		const res = await CommandManager.instance.execute(
			new PauseCommand(),
		);
		res.match({
			Ok: () => {},
			Err: (e) => toastStore.trigger({ message: e.message }),
		});
	}

	async function resume() {
		const res = await CommandManager.instance.execute(
			new ResumeCommand(),
		);
		res.match({
			Ok: () => {},
			Err: (e) => toastStore.trigger({ message: e.message }),
		});
	}
</script>

<div class={clsx("flex", "justify-center", "space-x-4")}>
	<button type="button" class="btn-icon !bg-transparent">
		<CaretLeftOutline size="xl" />
	</button>
	{#if $song_progress.status === "PLAYING"}
		<button
			on:click={pause}
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
			on:click={resume}
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
