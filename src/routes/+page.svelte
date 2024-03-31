<script lang="ts">
	import { Room } from "$lib/webrtc/room";
	import { navigation } from "$lib/stores/navigation";
	import PlayerScreen from "$lib/components/player/screen.svelte";
	import PlaylistScreen from "$lib/components/playlist/screen.svelte";
	import UsersListScreen from "$lib/components/users/screen.svelte";

	let files: FileList;

	// FIXME: JUST FOR QUICK TESTING
	const playImediatly = async () => {
		Room.instance.playFile(files[0]);
	};

	$: files && playImediatly();
</script>

<div class="md:hidden w-full h-full">
	{#if $navigation == 0}
		<PlayerScreen />
	{:else if $navigation == 1}
		<PlaylistScreen />
	{:else if $navigation == 2}
		<UsersListScreen />
	{/if}
</div>

<div class="hidden md:block w-full h-full">
	<PlayerScreen />
</div>
