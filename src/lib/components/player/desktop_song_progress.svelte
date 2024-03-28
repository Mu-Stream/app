<script lang="ts">
	import SongControls from "$lib/components/player/mobile_song_controls.svelte";
	import { RangeSlider } from "@skeletonlabs/skeleton";
	import clsx from "clsx";
	import { formatSeconds } from "$lib/duration_formatter";
</script>

<div class={clsx("py-2")}>
	<RangeSlider
		accent="accent-tertiary-500"
		name="song-progress"
		value={78}
		max={97}
		step={1}
	/>
	<div class={clsx("flex", "items-center")}>
		<SongControls />
		<div class={clsx("flex", "justify-between")}>
			<h5>{`${formatSeconds(78)} / ${formatSeconds(97)}`}</h5>
		</div>
	</div>
</div>
