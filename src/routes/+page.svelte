<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { room_id } from '$lib/stores/room_id';
	import { room, createMediaSource } from '$lib/webrtc/webrtc';
	let id: string;

	async function onChangeHandler(e) {
		console.log(e);
		const { remote_stream, media_source } = await createMediaSource(e.target.files[0]);
		media_source.start();
		room.sendStream(remote_stream.stream);
	}
</script>

<div class="grid h-screen w-screen grid-cols-[1fr_3fr_2fr] grid-rows-[11fr_1fr]">
	<div class="flex flex-col items-center space-y-8 border border-red-500">
		<h1>Room : {$room_id}</h1>
		{#if !$room_id}
			<Button variant="outline" on:click={room.hostRoom}>createRoom</Button>
			<div class="flex flex-row space-x-2">
				<Input placeholder="RoomId" bind:value={id}></Input>
				<Button variant="outline" on:click={() => room.joinRoom(id)}>joinRoom</Button>
			</div>
		{/if}
	</div>
	<div class="flex flex-col items-center justify-center border border-blue-500">
		<Avatar.Root class="h-96 w-96 rounded-2xl">
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
		<Input type="file" placeholder="music to stream" on:change={onChangeHandler} />
	</div>
	<div class="border border-yellow-500">playlist</div>
	<div class="col-span-3 border border-green-500">current_playing</div>
</div>
