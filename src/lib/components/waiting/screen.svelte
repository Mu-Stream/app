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
	const modalStore = getModalStore();
	const toastStore = getToastStore();
	let connected_room_id: Completer<string> | undefined = undefined;

	async function join() {
		try {
			connected_room_id = new Completer<string>();
			modalStore.trigger({
				type: "component",
				component: "connect_to_room",
				response: connected_room_id.complete,
			});
			const id = await connected_room_id.future;
			await room.join(id);
			if (id) room_id.set(id);
		} catch (e: any) {
			toastStore.trigger({
				message: e.toString(),
				background: "variant-filled-error",
			});
		} finally {
			connected_room_id = undefined;
		}
	}

	async function host() {
		try {
			connected_room_id = new Completer<string>();
			connected_room_id.complete(await room.host());
			const id = await connected_room_id.future;
			if (id) room_id.set(id);
		} catch (e: any) {
			toastStore.trigger({
				message: e.toString(),
				background: "variant-filled-error",
			});
		} finally {
			connected_room_id = undefined;
		}
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
				disabled={connected_room_id !== undefined}
				class={clsx(
					"btn",
					"btn-lg",
					"variant-filled-tertiary",
					outline_style,
				)}
			>
				{#if connected_room_id !== undefined}
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
				disabled={connected_room_id !== undefined}
				class={clsx(
					"btn",
					"btn-lg",
					"variant-filled-tertiary",
					outline_style,
				)}
			>
				{#if connected_room_id !== undefined}
					<ProgressRadial width="w-6 mr-4" />
				{/if}
				Rejoindre une Salle
			</button>
		</div>
	</div>
</div>
