<script lang="ts">
  import { Completer } from '$lib/completer';
  import { ProgressRadial, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
  import clsx from 'clsx';
  import { outline_style } from '$lib/global_styles';
  import { JoinRoomCommand } from '$lib/commands/join';
  import { HostCommand } from '$lib/commands/host';
  import { App } from '$lib/app';
  import { waves_store_instance } from '$lib/stores/waves';
  import { driver } from 'driver.js';

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
      new JoinRoomCommand(infos.unwrap().room_id, infos.unwrap().username)
    );

    command.match({
      Err: e =>
        toastStore.trigger({
          message: e.message,
          background: 'variant-filled-error',
        }),
      Ok: _ => {},
    });

    App.instance.context.audio_manager.try_init_audio_context();

    loading = false;
  }

  async function host() {
    loading = true;

    const command = await App.instance.executeCommand(new HostCommand());

    command.match({
      Ok: _ => {},
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
      progressText: "Etape {{current}} sur {{total}}" ,
      nextBtnText: '→',
      prevBtnText: '←',
      doneBtnText: '✕',

      steps: [
        {
          element: '#btn-create-room',
          popover: {
            title: 'Créer une salle',
            description:
              "Clique ici pour créer une salle.\nUn code seras créer, tu pourras le copier et le partager avec tes amis pour qu'il te rejoigne.",
          },
        },
        {
          element: '#btn-join-room',
          popover: {
            title: 'Rejoindre une salle',
            description: 'Clique ici pour rejoindre une salle.',
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
            title: 'Rejoindre une salle',
            description: "Rensigne ton nom d'utilisateur ici",
          },
        },
        {
          element: '#code-input',
          popover: {
            title: 'Rejoindre une salle',
            description: 'Rensigne le code de la salle ici',
          },
        },
        {
          element: '#join-room-btn',
          popover: {
            title: 'Rejoindre une salle',
            description: "Et c'est parti !",
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
</script>

<div class={clsx('h-full', 'w-full', 'flex', 'flex-col', 'relative')}>
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
  <div bind:this={bg_ref} class={clsx('absolute', 'bottom-0', 'left-0', 'w-full', 'z-[-1]', 'h-1/3')} />
  <div class={clsx('w-full', 'h-full', 'flex', 'flex-col', 'items-center', 'justify-center', 'space-y-8', 'md:p-4')}>
    <img src="/logo.svg" alt="logo" class={clsx('w-64', 'h-64', 'animate-pulse')} />
    <h1 class={clsx('text-6xl', 'text-center', 'nowrap')}>Mu Stream</h1>
    <h4 class="text-center">Partage des sessions d'écoute instense avec tes amis !</h4>

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

        Créer une salle
      </button>
      <div class={clsx('flex', 'w-full', 'justify-evenly', 'items-center', 'px-4')}>
        <div class={clsx('h-[1px]', 'w-full', 'bg-black')} />
        <span class={clsx('px-4', 'text-black')}> OU </span>
        <div class={clsx('h-[1px]', 'w-full', 'bg-black')} />
      </div>
      <button
        id="btn-join-room"
        type="button"
        on:click={join}
        disabled={loading}
        class={clsx('btn', 'btn-lg', 'variant-filled-tertiary', outline_style)}
      >
        {#if loading}
          <ProgressRadial width="w-6 mr-4" />
        {/if}
        Rejoindre une Salle
      </button>
    </div>
  </div>
</div>
