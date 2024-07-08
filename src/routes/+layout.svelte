<script lang="ts">
  import { AppShell, Modal, initializeStores, type ModalComponent, Toast, getToastStore } from '@skeletonlabs/skeleton';
  import 'driver.js/dist/driver.css';
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

  const toast_store = getToastStore();

  const room_id = App.instance.context.room.readable('ROOM_ID');

  const custom_modal_registery: Record<string, ModalComponent> = {
    room_code_input: { ref: RoomCodeInput },
  };

  onMount(App.instance.plugin_manager.registerAppUI);
  onMount(App.instance.context.toaster.init(toast_store));

  function persitWarningContentSeen() {
    localStorage.setItem('warningContentSeen', 'true');
  }

  onMount(() => {
    if (localStorage.getItem('warningContentSeen') === 'true') {
      return;
    }
    toast_store.trigger({
      autohide: false,
      background: 'bg-primary-100',
      action: {
        label: 'Ne plus afficher',
        response: persitWarningContentSeen,
      },
      message:
        "Mu Stream n'est pas resonsable du contenu audio diffusé par les participants, vous seul êtes responsable.",
    });
  });
</script>

<Modal components={custom_modal_registery} />
<Toast position="bl" />

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
