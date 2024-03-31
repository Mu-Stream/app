<script lang="ts">
	import { ProgressBar } from "@skeletonlabs/skeleton";
	import clsx from "clsx";
	import { formatSeconds } from "$lib/duration_formatter";
	import { MediaManager } from "$lib/webrtc/music_streamer";
	const song_progress =
		MediaManager.instance.readable("CURRENTLY_PLAYING");
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
