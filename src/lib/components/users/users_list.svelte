<script lang="ts">
	import clsx from "clsx";
	import User from "./user.svelte";
	import { users } from "$lib/stores/users";
</script>

<div class={clsx("space-y-2")}>
	{#each $users as user}
		<User {user} />
	{/each}
</div>
