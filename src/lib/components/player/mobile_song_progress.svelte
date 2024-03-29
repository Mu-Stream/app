<script lang="ts">
	import { ProgressBar, RangeSlider } from "@skeletonlabs/skeleton";
	import clsx from "clsx";
	import { formatSeconds } from "$lib/duration_formatter";
	export let current: number;
	export let max: number;
</script>

<div>
	<ProgressBar value={current} {max} meter={"bg-tertiary-500"} />
	<div class={clsx("flex", "justify-between")}>
		<h5>{formatSeconds(current)}</h5>
		<h5>{formatSeconds(max)}</h5>
	</div>
</div>
