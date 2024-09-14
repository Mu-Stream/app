<script lang="ts">
  import { outline_style } from '$lib/global_styles';
  import clsx from 'clsx';
  import { getDrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
  import { DotsVerticalOutline } from 'flowbite-svelte-icons';
  import HeaderActions from './header_actions.svelte';

  const drawer_store = getDrawerStore();

  function openMobileMenu() {
    const drawerSettings: DrawerSettings = {
      id: 'mobile-menu',
      position: 'right',
      bgDrawer: 'bg-semi-transparent-tertiary',
      width: 'w-[280px] md:w-[480px]',
      padding: 'p-4',
      rounded: 'rounded-xl',
    };
    drawer_store.open(drawerSettings);
  }
</script>

<div
  class={clsx(
    'flex',
    'justify-between',
    'items-center',
    'py-2',
    'px-4',
    'text-white',
    'bg-transparent-tertiary',
    'rounded-3xl',
    'm-4',
    'shadow-lg'
  )}
>
  <h1 class={clsx('text-2xl', 'font-bold')}>Mu Stream</h1>
  <button
    class={clsx('btn', 'btn-icon', 'variant-filled-tertiary', outline_style, 'md:hidden')}
    on:click={openMobileMenu}
  >
    <DotsVerticalOutline size="xl" />
  </button>
  <div class={clsx('items-center', 'hidden', 'md:flex')}>
    <HeaderActions />
  </div>
</div>
