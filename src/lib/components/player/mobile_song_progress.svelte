<script lang="ts">
	import { ProgressBar } from "@skeletonlabs/skeleton";
	import clsx from "clsx";
	import { formatSeconds } from "$lib/duration_formatter";
	import { room } from "$lib/webrtc/room";
	const song_progress = room.song_progress;
	console.log($song_progress);
</script>

<div>
	<ProgressBar
		value={$song_progress.current_time}
		max={$song_progress.total_time}
		meter={"bg-tertiary-500"}
	/>
	<div class={clsx("flex", "justify-between")}>
		<h5>{formatSeconds($song_progress.current_time)}</h5>
		<h5>{formatSeconds($song_progress.total_time)}</h5>
	</div>
</div>
