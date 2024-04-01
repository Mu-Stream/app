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
	import RoomCodeInput from "$lib/components/modals/room_code_input.svelte";
	import WaitingScreen from "$lib/components/waiting/screen.svelte";
	import SidebarRight from "$lib/components/sidebar_right.svelte";
	import { Room } from "$lib/notifier/room";

	initializeStores();

	const room_id = Room.instance.readable("ROOM_ID");

	const custom_modal_registery: Record<string, ModalComponent> = {
		room_code_input: { ref: RoomCodeInput },
	};
</script>

<Modal components={custom_modal_registery} />
<Toast />

{#if $room_id.id}
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
			<SidebarRight />
		</svelte:fragment>
	</AppShell>
{:else}
	<WaitingScreen />
{/if}
