<script lang="ts">
	import { Room } from "$lib/notifier/room";
	import clsx from "clsx";

	const room_id = Room.instance.readable("ROOM_ID");
</script>

<div
	class={clsx(
		"flex",
		"justify-evenly",
		"items-center",
		"py-2",
		"bg-tertiary-300",
	)}
>
	<h1 class={clsx("text-2xl", "font-bold")}>Mu Stream</h1>
	<h1 class={clsx("text-2xl", "font-bold")}>Salle : {$room_id.id}</h1>
</div>
