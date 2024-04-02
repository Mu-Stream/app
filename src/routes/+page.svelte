<script lang="ts">
	import { navigation } from "$lib/stores/navigation";
	import PlayerScreen from "$lib/components/player/screen.svelte";
	import PlaylistScreen from "$lib/components/playlist/screen.svelte";
	import UsersListScreen from "$lib/components/users/screen.svelte";
	import { App } from "$lib/app";

	let files: FileList;

	// FIXME: JUST FOR QUICK TESTING
	const playImediatly = async () => {
		App.instance.context.room.playFile(files[0]);
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
