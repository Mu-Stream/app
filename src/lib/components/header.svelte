<script lang="ts">
	import { room_id } from "$lib/stores/room_id";
	import clsx from "clsx";
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
	<h1 class={clsx("text-2xl", "font-bold")}>Salle : {$room_id}</h1>
</div>
