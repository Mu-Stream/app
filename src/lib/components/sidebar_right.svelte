<script lang="ts">
	import clsx from "clsx";
	import Playlist from "./playlist/playlist.svelte";
	import UsersList from "./users/users_list.svelte";
</script>

<div
	class={clsx(
		"hidden",
		"md:flex",
		"h-full",
		"flex-col",
		"mx-4",
		"relative",
	)}
>
	<div class={clsx("h-full", "space-y-2")}>
		<h3 class={clsx("text-xl", "font-bold", "text-center")}>
			Playlist
		</h3>
		<Playlist />
	</div>

	<div class={clsx("h-full", "space-y-2")}>
		<h3 class={clsx("text-xl", "font-bold", "text-center")}>
			Participants
		</h3>
		<UsersList />
	</div>
</div>
