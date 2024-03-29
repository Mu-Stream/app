<script lang="ts">
	import { Avatar } from "@skeletonlabs/skeleton";
	import clsx from "clsx";
	export let user: any;

	const initials = user.name
		.split(" ")
		.map((name: string) => name[0])
		.join("");
</script>

<div class={clsx("flex", "items-center", "space-x-4")}>
	<Avatar {initials} border="border-b-4 border-b-black" />
	<h3>{user.name}</h3>
</div>
