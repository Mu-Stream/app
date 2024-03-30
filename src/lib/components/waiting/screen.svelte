<script lang="ts">
	import { Completer } from "$lib/completer";
	import {
		ProgressRadial,
		getModalStore,
		getToastStore,
	} from "@skeletonlabs/skeleton";
	import { room } from "$lib/webrtc/room";
	import clsx from "clsx";
	import { room_id } from "$lib/stores/room_id";
	import { outline_style, shape_style } from "$lib/global_styles";
	import { None, Some } from "bakutils-catcher";
	const modalStore = getModalStore();
	const toastStore = getToastStore();
	let loading: boolean = false;

	async function join(): Promise<void> {
		loading = true;
		const completer = new Completer<string>();

		modalStore.trigger({
			type: "component",
			component: "room_code_input",
			response: (id?: string) => completer.completeValue(id),
		});

		const res = await completer.future;

		if (res.isNone()) {
			loading = false;
			return;
		}

		const join_res = await room.join(res.unwrap());

		join_res.match({
			Ok: (id) => room_id.set(id),
			Err: (err) => {
				toastStore.trigger({
					message: err.toString(),
					background: "variant-filled-error",
				});
			},
		});

		loading = false;
	}

	async function host() {
		loading = true;

		const res = await room.host();

		res.match({
			Ok: (id) => room_id.set(id),
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
				<div
					class={clsx(
						"h-[1px]",
						"w-full",
						"bg-black",
					)}
				/>
				<span class={clsx("px-4", "text-black")}>
					OU
				</span>
				<div
					class={clsx(
						"h-[1px]",
						"w-full",
						"bg-black",
					)}
				/>
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
