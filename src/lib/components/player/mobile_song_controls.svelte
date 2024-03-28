<script lang="ts">
	import clsx from "clsx";
	import {
		CaretLeftOutline,
		CaretRightOutline,
		PauseOutline,
	} from "flowbite-svelte-icons";
</script>

<div class={clsx("flex", "justify-center", "space-x-4")}>
	<button type="button" class="btn-icon !bg-transparent">
		<CaretLeftOutline size="xl" />
	</button>
	<button
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
	<button type="button" class={clsx("btn-icon", "!bg-transparent")}>
		<CaretRightOutline size="xl" />
	</button>
</div>
