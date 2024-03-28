<script lang="ts">
	import clsx from "clsx";
	import User from "./user.svelte";

	const fakeUsers = [
		{ id: 1, name: "John Doe" },
		{ id: 2, name: "Jane Doe" },
	];
</script>

<div class={clsx("space-y-2")}>
	{#each fakeUsers as user}
		<User {user} />
	{/each}
</div>
