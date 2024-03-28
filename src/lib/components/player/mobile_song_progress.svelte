<script lang="ts">
	import { RangeSlider } from "@skeletonlabs/skeleton";
	import clsx from "clsx";
	import { formatSeconds } from "$lib/duration_formatter";
	export let current: number;
	export let max: number;
</script>

<div>
	<RangeSlider
		accent="accent-tertiary-500"
		name="song-progress"
		bind:value={current}
		{max}
		step={1}
	/>
	<div class={clsx("flex", "justify-between")}>
		<h5>{formatSeconds(current)}</h5>
		<h5>{formatSeconds(max)}</h5>
	</div>
</div>
