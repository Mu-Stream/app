<script lang="ts">
	import {
		AppShell,
		Modal,
		initializeStores,
		type ModalComponent,
		Toast,
	} from "@skeletonlabs/skeleton";
	import "../app.pcss";
	import Header from "$lib/components/header.svelte";
	import MobileNavbar from "$lib/components/mobile_navbar.svelte";
	import DesktopSongProgress from "$lib/components/player/desktop_song_progress.svelte";
	import Playlist from "$lib/components/playlist/playlist.svelte";
	import ConnectToRoom from "$lib/components/modals/connect_to_room.svelte";
	import WaitingScreen from "$lib/components/waiting/screen.svelte";
	import clsx from "clsx";
	import { room_id } from "$lib/stores/room_id";
	import UsersList from "$lib/components/users/users_list.svelte";

	initializeStores();

	const custom_modal_registery: Record<string, ModalComponent> = {
		connect_to_room: { ref: ConnectToRoom },
	};
</script>

<Modal components={custom_modal_registery} />
<Toast />

{#if $room_id}
	<AppShell>
		<svelte:fragment slot="header">
			<Header />
		</svelte:fragment>

		<slot />

		<svelte:fragment slot="pageFooter">
			<div class="md:hidden">
				<MobileNavbar />
			</div>
			<div class="hidden md:block">
				<DesktopSongProgress />
			</div>
		</svelte:fragment>

		<svelte:fragment slot="sidebarRight">
			<div
				class={clsx(
					"hidden",
					"md:flex",
					"bg-tertiary-300",
					"h-full",
					"flex-col",
				)}
			>
				<div class={clsx("h-full", "space-y-2")}>
					<h3
						class={clsx(
							"text-xl",
							"font-bold",
							"text-center",
						)}
					>
						Playlist
					</h3>
					<Playlist />
				</div>

				<div class={clsx("h-full", "space-y-2")}>
					<h3
						class={clsx(
							"text-xl",
							"font-bold",
							"text-center",
						)}
					>
						Participants
					</h3>
					<UsersList />
				</div>
			</div>
		</svelte:fragment>
	</AppShell>
{:else}
	<WaitingScreen />
{/if}
