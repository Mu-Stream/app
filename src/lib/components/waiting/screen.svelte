<script lang="ts">
  import { Completer } from '$lib/completer';
  import {
    getModalStore,
    getToastStore,
    popup,
    type PopupSettings,
    ProgressRadial,
  } from '@skeletonlabs/skeleton';
  import clsx from 'clsx';
  import { outline_style } from '$lib/global_styles';
  import { JoinRoomCommand } from '$lib/commands/join';
  import { HostCommand } from '$lib/commands/host';
  import { App } from '$lib/app';
  import { waves_store_instance } from '$lib/stores/waves';
  import { driver } from 'driver.js';
  import { CogOutline } from 'flowbite-svelte-icons';
  import { onMount } from 'svelte';
  import { detectLocale, locales } from '../../../i18n/i18n-util';
  import { localStorageDetector } from 'typesafe-i18n/detectors';
  import LL, { locale, setLocale } from '../../../i18n/i18n-svelte';
  import type { Locales } from '../../../i18n/i18n-types';
  import { loadLocaleAsync } from '../../../i18n/i18n-util.async';

  const modalStore = getModalStore();
  const toastStore = getToastStore();
  let loading: boolean = false;

  async function join(): Promise<void> {
    loading = true;

    const completer = new Completer<{
      room_id: string;
      username: string;
    }>();

    modalStore.trigger({
      type: 'component',
      component: 'room_code_input',
      response: (infos: { room_id: string; username: string }) => completer.completeValue(infos),
    });

    const infos = await completer.future;

    if (infos.isNone()) {
      loading = false;
      return;
    }

    const command = await App.instance.executeCommand(
      new JoinRoomCommand(infos.unwrap().room_id, infos.unwrap().username),
    );

    command.match({
      Err: e =>
        toastStore.trigger({
          message: e.message,
          background: 'variant-filled-error',
        }),
      Ok: _ => {
      },
    });

    App.instance.context.audio_manager.try_init_audio_context();

    loading = false;
  }

  async function host() {
    loading = true;

    const command = await App.instance.executeCommand(new HostCommand());

    command.match({
      Ok: _ => {
      },
      Err: err => {
        toastStore.trigger({
          message: err.toString(),
          background: 'variant-filled-error',
        });
      },
    });

    App.instance.context.audio_manager.try_init_audio_context();

    loading = false;
  }

  let bg_ref: HTMLDivElement | undefined;

  $: if (bg_ref) {
    $waves_store_instance.mount(bg_ref);
  }

  function onTutorial() {
    const d = driver({
      showProgress: true,
      progressText: $LL.common.tutorialStep({ current: '{{current}}', total: '{{total}}' }),
      nextBtnText: '→',
      prevBtnText: '←',
      doneBtnText: '✕',
      steps: [
        {
          element: '#btn-create-room',
          popover: {
            title: $LL.waitingScreenTutorial.stepWelcome.title(),
            description: $LL.waitingScreenTutorial.stepWelcome.description(),
          },
        },
        {
          element: '#btn-create-room',
          popover: {
            title: $LL.waitingScreenTutorial.stepCreateRoom.title(),
            description: $LL.waitingScreenTutorial.stepCreateRoom.description(),
          },
        },
        {
          element: '#btn-join-room',
          popover: {
            title: $LL.waitingScreenTutorial.stepJoinRoom.title(),
            description: $LL.waitingScreenTutorial.stepJoinRoom.description1(),
            onNextClick: () => {
              document.getElementById('btn-join-room')!.click();
              setTimeout(() => {
                d.moveNext();
              }, 200);
            },
          },
        },
        {
          element: '#username-input',
          popover: {
            title: $LL.waitingScreenTutorial.stepJoinRoom.title(),
            description: $LL.waitingScreenTutorial.stepJoinRoom.description2(),
          },
        },
        {
          element: '#code-input',
          popover: {
            title: $LL.waitingScreenTutorial.stepJoinRoom.title(),
            description: $LL.waitingScreenTutorial.stepJoinRoom.description3(),
          },
        },
        {
          element: '#join-room-btn',
          popover: {
            title: $LL.waitingScreenTutorial.stepJoinRoom.title(),
            description: $LL.waitingScreenTutorial.stepJoinRoom.description4(),
          },
          onDeselected: () => {
            modalStore.close();
            loading = false;
            d.moveNext();
          },
        },
      ],
    });
    d.drive();
  }

  const popupFeatured: PopupSettings = {
    event: 'click',
    target: 'popupFeatured',
    placement: 'top-start',
    closeQuery: '#btn-open-settings',
  };

  onMount(async () => {
    const detectedLocale = detectLocale(localStorageDetector);
    await chooseLocale(detectedLocale);
    localeToSelect = $locale;
  });

  const chooseLocale = async (locale: Locales) => {
    await loadLocaleAsync(locale);
    setLocale(locale);
  };

  let localeToSelect = 'fr' as Locales;
  $: localeToSelect && chooseLocale(localeToSelect);

  $: $locale && localStorage.setItem('lang', $locale);

  const localeAliases: Record<string, string> = {
    en: 'English',
    fr: 'Français',
  };


</script>

<div class={clsx('h-full', 'w-full', 'flex', 'flex-col', 'relative', 'text-white')}>

  <button
    class={clsx(
      'absolute',
      'left-5',
      'top-5',
      'btn-icon',
      'variant-filled-tertiary',
      'text-white',
      'border-b-4',
      'border-black'
    )}
    id="btn-open-settings"
    use:popup={popupFeatured}
  >
    <CogOutline />
  </button>

  <div class="card p-4 w-60 shadow-xl text-black" data-popup="popupFeatured">
    <label class="flex justify-between items-center">
      {$LL.settingsPopup.language()}
      <select bind:value={localeToSelect} class={clsx(
        'bg-gray-200',
        'border',
        'rounded',
        'focus:border-blue-500',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-blue-200'
              )}>
        {#each locales as locale}
          <option value={locale}>{localeAliases[locale]}</option>
        {/each}
      </select>
    </label>
  </div>


  <button
    on:click={onTutorial}
    class={clsx(
      'absolute',
      'right-5',
      'top-5',
      'btn-icon',
      'variant-filled-tertiary',
      'text-white',
      'border-b-4',
      'border-black'
    )}
  >
    ?
  </button>
  <div bind:this={bg_ref}
       class={clsx('absolute', 'bottom-0', 'left-0', 'w-full', 'z-[-1]', 'h-1/3')} />
  <div
    class={clsx('w-full', 'h-full', 'flex', 'flex-col', 'items-center', 'justify-center', 'space-y-8', 'md:p-4')}>
    <img src="/logo.svg" alt="logo" class={clsx('w-64', 'h-64', 'animate-pulse')} />
    <h1 class={clsx('text-6xl', 'text-center', 'nowrap')}>{$LL.title()}</h1>
    <h4 class="text-center">{$LL.waitingScreen.slogan()}</h4>

    <div class={clsx('flex', 'flex-col', 'space-y-4')}>
      <button
        id="btn-create-room"
        type="button"
        on:click={host}
        disabled={loading}
        class={clsx('btn', 'btn-lg', 'variant-filled-tertiary', outline_style)}
      >
        {#if loading}
          <ProgressRadial width="w-6 mr-4" />
        {/if}

        {$LL.waitingScreen.createRoomBtn()}
      </button>
      <div class={clsx('flex', 'w-full', 'justify-evenly', 'items-center', 'px-4')}>
        <div class={clsx('h-[1px]', 'w-full', 'bg-black')} />
        <span class={clsx('px-4', 'text-black')}> {$LL.waitingScreen.roomChoiceSeparator()} </span>
        <div class={clsx('h-[1px]', 'w-full', 'bg-black')} />
      </div>
      <button
        id="btn-join-room"
        type="button"
        on:click={join}
        disabled={loading}
        class={clsx('btn', 'btn-lg', 'variant-filled-tertiary', 'w-60', outline_style)}
      >
        {#if loading}
          <ProgressRadial width="w-6 mr-4" />
        {/if}
        {$LL.waitingScreen.joinRoomBtn()}
      </button>
    </div>
  </div>
</div>
