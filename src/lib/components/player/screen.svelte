<script lang="ts">
	import StyledCover from "$lib/components/styled_cover.svelte";
	import SongProgress from "./mobile_song_progress.svelte";
	import clsx from "clsx";
	import SongControls from "./mobile_song_controls.svelte";
	const fakeUrl =
		"https://lh3.googleusercontent.com/IMHL2k6RwTNd67kckwLmxBmSw9Fb3ABSckIPcIV_UASrUBrkOf4dsu_HeH3_D_PbvCHkoIxFDb77R-k=w544-h544-l90-rj";
</script>

<div
	class={clsx(
		"flex",
		"flex-col",
		"w-full",
		"h-full",
		"px-8",
		"space-y-4",
		"items-center",
		"justify-center",
	)}
>
	<StyledCover
		alt="cover"
		src={fakeUrl}
		height="md:h-96"
		width="w-full md:w-96"
	/>

	<div class={clsx("md:hidden", "flex", "flex-col", "w-full")}>
		<div class={clsx("space-y-2")}>
			<h1 class={clsx("text-3xl", "font-bold")}>Test name</h1>
			<h4 class={clsx("text-sm")}>Test artist</h4>
		</div>

		<SongProgress current={78} max={97} />
		<SongControls />
	</div>
</div>
