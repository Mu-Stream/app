<script lang="ts">
  import { App } from '$lib/app';
  import clsx from 'clsx';
  import RoomCode from './room_code.svelte';
  import { driver } from 'driver.js';
  import { getDrawerStore } from '@skeletonlabs/skeleton';
  import { QuitCommand } from '$lib/commands/quit';
  import { outline_style } from '$lib/global_styles';
  import LL from '../../i18n/i18n-svelte';

  function onQuit() {
    App.instance.executeCommand(new QuitCommand());
  }

  const drawer_store = getDrawerStore();

  function onTutorial() {
    const d = driver({
      progressText: $LL.common.tutorialStep({ current: '{{current}}', total: '{{total}}' }),
      nextBtnText: '→',
      prevBtnText: '←',
      doneBtnText: '✕',
      showProgress: true,
      steps: [
        {
          element: '#btn-create-room',
          popover: {
            title: $LL.roomScreenTutorial.stepWelcome.title(),
            description: $LL.roomScreenTutorial.stepWelcome.description(),
          },
        },
        {
          element: '#access-room-code',
          popover: {
            title: $LL.roomScreenTutorial.stepCode.title(),
            description: $LL.roomScreenTutorial.stepCode.description(),
          },
        },
        {
          element: '#btn-add-song',
          popover: {
            title: $LL.roomScreenTutorial.stepAddSong.title(),
            description: $LL.roomScreenTutorial.stepAddSong.description(),
          },
        },
        {
          element: '#btn-add-reaction',
          popover: {
            title: $LL.roomScreenTutorial.stepReact.title(),
            description: $LL.roomScreenTutorial.stepReact.description(),
          },
        },
        {
          element: '#song-controls',
          popover: {
            title: $LL.roomScreenTutorial.stepMusicControl.title(),
            description: $LL.roomScreenTutorial.stepMusicControl.description(),
          },
        },
        {
          element: '#btn-leave-room',
          popover: {
            title: $LL.roomScreenTutorial.stepQuitRoom.title(),
            description: $LL.roomScreenTutorial.stepQuitRoom.description(),
          },
        },
        {
          popover: {
            title: $LL.roomScreenTutorial.stepFinal.title(),
            description: $LL.roomScreenTutorial.stepFinal.description(),
          },
        },
      ],
    });
    d.drive();
  }
</script>

<div
  class={clsx('flex', 'flex-col', 'md:flex-row', 'p-4', 'md:px-0', 'space-y-4', 'md:space-y-0', 'md:space-x-2')}>
  <RoomCode />
  <button id="btn-leave-room"
          class={clsx('btn', 'btn-md', 'variant-filled-tertiary', outline_style)} on:click={onQuit}>
    {#if App.instance.context.room.is_client}
      {$LL.roomScreen.logOut()}
    {:else}
      {$LL.roomScreen.deleteRoom()}
    {/if}
  </button>
  <button
    on:click={onTutorial}
    class={clsx('btn-icon', 'variant-filled-tertiary', 'text-white', 'border-b-4', 'border-black')}
  >
    ?
  </button>
</div>
