<script lang="ts">
  import { AppShell, Modal, initializeStores, type ModalComponent, Toast } from '@skeletonlabs/skeleton';
  import '../app.pcss';
  import Header from '$lib/components/header.svelte';
  import MobileNavbar from '$lib/components/mobile_navbar.svelte';
  import DesktopSongProgress from '$lib/components/player/desktop_song_progress.svelte';
  import RoomCodeInput from '$lib/components/modals/room_code_input.svelte';
  import WaitingScreen from '$lib/components/waiting/screen.svelte';
  import SidebarRight from '$lib/components/sidebar_right.svelte';
  import { App } from '$lib/app';
  import { is_mobile } from '$lib/stores/is_mobile';
  import clsx from 'clsx';
  import { onMount } from 'svelte';
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  initializeStores();

  const room_id = App.instance.context.room.readable('ROOM_ID');

  const custom_modal_registery: Record<string, ModalComponent> = {
    room_code_input: { ref: RoomCodeInput },
  };

  onMount(App.instance.plugin_manager.registerAppUI);
</script>

<Modal components={custom_modal_registery} />
<Toast />

<div bind:this={App.instance.plugin_manager.app_ref} class={clsx('w-full', 'h-full', 'overflow-hidden')}>
  {#if $room_id.id}
    <AppShell>
      <svelte:fragment slot="header">
        <Header />
      </svelte:fragment>
      <slot />
      <svelte:fragment slot="pageFooter">
        {#if $is_mobile}
          <MobileNavbar />
        {:else}
          <DesktopSongProgress />
        {/if}
      </svelte:fragment>
      <svelte:fragment slot="sidebarRight">
        <SidebarRight />
      </svelte:fragment>
    </AppShell>
  {:else}
    <WaitingScreen />
  {/if}
</div>
