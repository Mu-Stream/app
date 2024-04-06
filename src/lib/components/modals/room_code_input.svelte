<script lang="ts">
	//	import type { SvelteComponent } from "svelte";

	import { getModalStore } from "@skeletonlabs/skeleton";
	import { PinInput, Toggle } from "bits-ui";
	import clsx from "clsx";
	import { EyeOutline, EyeSlashOutline } from "flowbite-svelte-icons";

	// export let parent: SvelteComponent;

	const modal_store = getModalStore();

	let unlocked: boolean = false;
	let username: string = "";
	let values: string[] | undefined = ["", "", "", ""];
	let input_type: "text" | "password" = "password";

	$: input_type = unlocked ? "text" : "password";

	function submit() {
		if ($modal_store[0].response)
			$modal_store[0].response({
				room_id: values!.join(""),
				username,
			});
		modal_store.close();
	}

	const input_style = clsx("w-5", "text-center", "border", "rounded-lg");
</script>

{#if $modal_store[0]}
	<div class={clsx("card", "p-4", "space-y-4")}>
		<header>
			<h1 class={clsx("text-2xl")}>Entrer Votre Code</h1>
		</header>
		<section
			class={clsx(
				"flex",
				"justify-center",
				"align-center",
				"flex-col",
			)}
		>
			<input
				type="text"
				class={clsx("input", "w-full")}
				bind:value={username}
			/>
			<PinInput.Root
				bind:value={values}
				class={clsx(
					"min-h-input",
					"flex",
					"h-full",
					"items-center",
					"gap-2",
					"py-1",
					"px-1.5",
				)}
			>
				<PinInput.Input class={input_style} />
				<PinInput.Input class={input_style} />
				<PinInput.Input class={input_style} />
				<PinInput.Input class={input_style} />
				<Toggle.Root
					aria-label="Toggle Room code visibility"
					class={clsx(
						"transition-all",
						"active:scale-98",
					)}
					bind:pressed={unlocked}
				>
					{#if unlocked}
						<EyeOutline />
					{:else}
						<EyeSlashOutline />
					{/if}
				</Toggle.Root>
			</PinInput.Root>
		</section>
		<footer class="card-footer">
			<button
				class={clsx(
					"btn",
					"variant-filled-tertiary",
					"border-b-4",
					"border-b-black",
					"w-full",
				)}
				on:click={submit}
				disabled={values?.join("").length !== 4}
			>
				Rejoindre
			</button>
		</footer>
	</div>
{/if}
