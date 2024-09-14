<script lang="ts">
  import {
    AppShell,
    Drawer,
    getDrawerStore,
    getToastStore,
    initializeStores,
    Modal,
    type ModalComponent,
    storePopup,
    Toast,
  } from '@skeletonlabs/skeleton';
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
  import { afterUpdate, onMount } from 'svelte';
  import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
  import DynamicBg from '$lib/components/dynamic_bg.svelte';
  import HeaderActions from '$lib/components/header_actions.svelte';
  import LL from '../i18n/i18n-svelte';
  import { get } from 'svelte/store';
  import { initI18nSvelte } from 'typesafe-i18n/svelte';

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  initializeStores();

  const toast_store = getToastStore();
  const drawer_store = getDrawerStore();

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
    setTimeout(
      () =>
        toast_store.trigger({
          autohide: false,
          background: 'bg-primary-100',
          action: {
            label: get(LL).warningPopup.quit(),
            response: persitWarningContentSeen,
          },
          message: get(LL).warningPopup.description(),
        }),
      1000
    );
  });
</script>

<Modal components={custom_modal_registery} />
<Toast position="bl" />
<Drawer position="right">
  {#if $drawer_store.id === 'mobile-menu'}
    <HeaderActions />
  {/if}
</Drawer>

<DynamicBg />

<div bind:this={App.instance.plugin_manager.app_ref} class={clsx('w-screen', 'h-screen', 'overflow-hidden')}>
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
