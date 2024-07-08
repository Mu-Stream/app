<script lang="ts">
  import RoomCode from '$lib/components/room_code.svelte';
  import { outline_style } from '$lib/global_styles';
  import clsx from 'clsx';
  import { App } from '$lib/app';
  import { QuitCommand } from '$lib/commands/quit';
  import { driver } from 'driver.js';

  function onQuit() {
    App.instance.executeCommand(new QuitCommand());
  }

  function onTutorial() {
    const d = driver({
      nextBtnText: '→',
      prevBtnText: '←',
      doneBtnText: '✕',

      steps: [
        {
          // element: '#btn-create-room',
          popover: {
            title: 'Bienvenue sur Mu Stream',
            description: 'Voici un tutoriel pour vous aider à démarrer',
          },
        },
        {
          element: '#access-room-code',
          popover: {
            title: 'Code de la salle',
            description:
              "Tu peux partager ce code avec tes amis pour qu'ils rejoignent ta salle.L'oeil permet de l'afficher et licone copier de le copier directement dans ton presse papier !",
          },
        },
        {
          element: '#btn-add-song',
          popover: {
            title: 'Ajouter un son',
            description: 'Tu peux ajouter une musique à la salle en appuyant ici',
          },
        },
        {
          element: '#btn-add-reaction',
          popover: {
            title: 'Ajouter une reaction',
            description: 'Tu peux reagir a la musique !',
          },
        },
        {
          element: '#song-controls',
          popover: {
            title: 'Contrôles de la musique',
            description: 'Tu peux contrôler avec les boutons ici',
          },
        },
        {
          element: '#btn-leave-room',
          popover: {
            title: 'Quitter la salle',
            description: 'Tu peux quitter ou dissoudre la salle en cliquant ici',
          },
        },
        {
          popover: {
            title: 'Enjoy Sharing',
            description: 'Et voila tu sais tout sur Mu Stream',
          },
        },
      ],
    });
    d.drive();
  }
</script>

<div class={clsx('flex', 'justify-between', 'items-center', 'py-2', 'bg-tertiary-300', 'px-4')}>
  <h1 class={clsx('text-2xl', 'font-bold')}>Mu Stream</h1>
  <div class={clsx('flex', 'items-center')}>
    <RoomCode />
    <button
      id="btn-leave-room"
      class={clsx('btn', 'btn-sm', 'variant-filled-tertiary', outline_style)}
      on:click={onQuit}
    >
      {#if App.instance.context.room.is_client}
        Déconnexion
      {:else}
        Supprimer la salle
      {/if}
    </button>
    <button
      on:click={onTutorial}
      class={clsx('ml-2', 'btn-icon', 'variant-filled-tertiary', 'text-white', 'border-b-4', 'border-black')}
    >
      ?
    </button>
  </div>
</div>
