<script lang="ts">
	import clsx from "clsx";
	import StyledCover from "../styled_cover.svelte";
	import { DotsVerticalOutline } from "flowbite-svelte-icons";
	export let song: any;
</script>

<div class="flex space-x-2 px-2 items-center">
	<StyledCover
		alt={`cover-${song.title}`}
		src={song.cover}
		height="h-14"
		width="w-full max-w-16"
		thiccness="medium"
	/>
	<div class={clsx("pr-8", "w-full")}>
		<h5 class={clsx("font-bold")}>{song.title}</h5>
		<h4>{song.artist}</h4>
	</div>
	<DotsVerticalOutline size="xl" />
</div>
