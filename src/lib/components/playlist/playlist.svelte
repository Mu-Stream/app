<script lang="ts">
	import { playlist } from "$lib/stores/playlist";
	import PlaylistSong from "./playlist_song.svelte";
</script>

{#each $playlist as song}
	<PlaylistSong {song} />
{/each}
