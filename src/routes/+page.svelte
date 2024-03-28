<script lang="ts">
	import { room } from "$lib/webrtc/room";
	import { navigation } from "$lib/stores/navigation";
	import PlayerScreen from "$lib/components/player/screen.svelte";

	let files: FileList;

	// FIXME: JUST FOR QUICK TESTING
	const playImediatly = async () => {
		room.playFile(files[0]);
	};

	$: files && playImediatly();
</script>

<div class="md:hidden w-full h-full">
	{#if $navigation == 0}
		<PlayerScreen />
	{/if}
</div>

<div class="hidden md:block w-full h-full">
	<PlayerScreen />
</div>
