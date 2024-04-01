<script lang="ts">
	import { Completer } from "$lib/completer";
	import {
		ProgressRadial,
		getModalStore,
		getToastStore,
	} from "@skeletonlabs/skeleton";
	import clsx from "clsx";
	import { outline_style, shape_style } from "$lib/global_styles";
	import { CommandManager } from "$lib/commands/command_manager";
	import { JoinRoomCommand } from "$lib/commands/join";
	import { HostCommand } from "$lib/commands/host";

	const modalStore = getModalStore();
	const toastStore = getToastStore();
	let loading: boolean = false;

	async function join(): Promise<void> {
		loading = true;

		const completer = new Completer<{
			room_id: string;
			username: string;
		}>();

		modalStore.trigger({
			type: "component",
			component: "room_code_input",
			response: (infos: { room_id: string; username: string }) =>
				completer.completeValue(infos),
		});

		const infos = await completer.future;

		if (infos.isNone()) {
			loading = false;
			return;
		}

		const command = await CommandManager.instance.execute(
			new JoinRoomCommand(
				infos.unwrap().room_id,
				infos.unwrap().username,
			),
		);

		command.match({
			Err: (e) =>
				toastStore.trigger({
					message: e.message,
					background: "variant-filled-error",
				}),
			Ok: (_) => {},
		});

		loading = false;
	}

	async function host() {
		loading = true;

		const command = await CommandManager.instance.execute(
			new HostCommand(),
		);

		command.match({
			Ok: (_) => {},
			Err: (err) => {
				toastStore.trigger({
					message: err.toString(),
					background: "variant-filled-error",
				});
			},
		});

		loading = false;
	}
</script>

<div
	class={clsx(
		"h-full",
		"w-full",
		"flex",
		"flex-col",
		"items-center",
		"justify-evenly",
	)}
>
	<div
		class={clsx(
			"w-full",
			"h-full",
			"flex",
			"flex-col",
			"items-center",
			"justify-evenly",
			"space-y-8",
			"md:h-96",
			"md:w-96",
			"md:card",
			"md:p-4",
			"md:variant-filled-surface",
			shape_style,
		)}
	>
		<h1 class={clsx("text-3xl", "text-center")}>
			Bienvenue sur <br /> Mu Stream !
		</h1>

		<div class={clsx("flex", "flex-col", "space-y-4")}>
			<button
				type="button"
				on:click={host}
				disabled={loading}
				class={clsx(
					"btn",
					"btn-lg",
					"variant-filled-tertiary",
					outline_style,
				)}
			>
				{#if loading}
					<ProgressRadial width="w-6 mr-4" />
				{/if}

				Créer une salle
			</button>
			<div
				class={clsx(
					"flex",
					"w-full",
					"justify-evenly",
					"items-center",
					"px-4",
				)}
			>
				<div class={clsx("h-[1px]", "w-full", "bg-black")} />
				<span class={clsx("px-4", "text-black")}> OU </span>
				<div class={clsx("h-[1px]", "w-full", "bg-black")} />
			</div>
			<button
				type="button"
				on:click={join}
				disabled={loading}
				class={clsx(
					"btn",
					"btn-lg",
					"variant-filled-tertiary",
					outline_style,
				)}
			>
				{#if loading}
					<ProgressRadial width="w-6 mr-4" />
				{/if}
				Rejoindre une Salle
			</button>
		</div>
	</div>
</div>
