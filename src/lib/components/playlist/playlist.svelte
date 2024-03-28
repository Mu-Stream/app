<script lang="ts">
	import PlaylistSong from "./playlist_song.svelte";

	const songs = [
		{
			img: "https://lh3.googleusercontent.com/IMHL2k6RwTNd67kckwLmxBmSw9Fb3ABSckIPcIV_UASrUBrkOf4dsu_HeH3_D_PbvCHkoIxFDb77R-k=w544-h544-l90-rj",
			title: "Toto",
			artist: "Tata",
		},
	];
</script>

{#each songs as song}
	<PlaylistSong {song} />
{/each}
