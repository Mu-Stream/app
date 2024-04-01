<script lang="ts">
	import { App } from "$lib/app";
	import clsx from "clsx";

	const room_id = App.instance.context["room"].readable("ROOM_ID");
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
