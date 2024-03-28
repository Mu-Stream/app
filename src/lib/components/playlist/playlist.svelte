<script lang="ts">
	import clsx from "clsx";
	import StyledCover from "../styled_cover.svelte";
	import { DotsVerticalOutline } from "flowbite-svelte-icons";

	const songs = [
		{
			img: "https://lh3.googleusercontent.com/IMHL2k6RwTNd67kckwLmxBmSw9Fb3ABSckIPcIV_UASrUBrkOf4dsu_HeH3_D_PbvCHkoIxFDb77R-k=w544-h544-l90-rj",
			title: "Toto",
			artist: "Tata",
		},
	];
</script>

{#each songs as song}
	<div class="flex space-x-2 px-2 items-center">
		<StyledCover
			alt={`cover-${song.title}`}
			src={song.img}
			width={"w-full"}
			height="h-14"
			thiccness="medium"
		/>
		<div class={clsx("pr-8")}>
			<h5 class={clsx("font-bold")}>{song.title}</h5>
			<h4>{song.artist}</h4>
		</div>
		<DotsVerticalOutline size="xl" />
	</div>
{/each}
