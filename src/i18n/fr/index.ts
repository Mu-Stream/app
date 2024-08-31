import type { Translation } from '../i18n-types';

const fr = {
  title: 'Mu Stream',
  waitingScreen: {
    slogan: "Partage des sessions d'écoute instense avec tes amis !",
    createRoomBtn: 'Créer une salle',
    joinRoomBtn: 'Rejoindre une salle',
    roomChoiceSeparator: 'OU',
    roomCodeInput: 'Code de la salle',
  },
  joinRoomPopup: {
    userName: "Nom d'utilisateur",
    roomCodeInput: 'Code de la salle',
    joinBtn: 'Rejoindre',
  },
  waitingScreenTutorial: {
    stepWelcome: {
      title: 'Bienvenue sur Mu Stream',
      description:
        "Mu Stream est une application qui te permet de partager des sessions d'écoute avec tes amis. Voici un tuto pour t'aider à démarrer.",
    },
    stepCreateRoom: {
      title: 'Créez une salle',
      description:
        "Clique ici pour créer une salle. Un code sera créé, tu pourras le copier et le partager avec tes amis pour qu'ils te rejoignent.",
    },
    stepJoinRoom: {
      title: 'Rejoindre une salle',
      description:
        "Clique ici pour créer une salle. Un code de salle seras créer, tu pourras le copier et le partager avec tes amis pour qu'ils puissent te rejoindre.",
      description1: 'Cliquer ici pour rejoindre une salle.',
      description2: "Renseigner ton nom d'utilisateur ici.",
      description3: 'Renseigner le code de la salle ici.',
      description4: "Est c'est parti !",
    },
  },
  roomScreen: {
    code: 'code',
    deleteRoom: 'Supprimer la salle',
    logOut: 'Déconnexion',
    participants: 'Participants',
    playlist: 'Playlist',
    chat: 'Chat en direct',
    react: 'Réagir',
  },
  warningPopup: {
    description:
      "Mu Stream n'est pas responsable du contenu audio diffusé par les participants. Vous en êtes seul responsable.",
    quit: 'Ne plus afficher',
  },
  roomScreenTutorial: {
    stepWelcome: {
      title: 'Bienvenue dans cette salle',
      description: "Tu es dans une salle d`'écoute privé de musique. Voici un tuto pour t'aider à naviguer.",
    },
    stepCode: {
      title: 'Code de la salle',
      description:
        "Tu peux partager ce code avec tes amis pour qu'ils rejoignent ta salle.<br>L'œil permet de l'afficher et l'icône copier de le copier directement dans ton presse-papier.",
    },
    stepAddSong: {
      title: 'Ajouter un son',
      description: 'Tu peux ajouter une musique à la salle en appuyant ici.',
    },
    stepReact: {
      title: 'Ajouter une réaction',
      description: 'Tu peux reagir a la musique !',
    },
    stepMusicControl: {
      title: 'Contrôles de la musique',
      description: 'Tu peux contrôler la musique avec les boutons ici.',
    },
    stepQuitRoom: {
      title: 'Quitter la salle',
      description: 'Tu peux quitter ou dissoudre la salle en cliquant ici.',
    },
    stepFinal: {
      title: 'Amuse-toi bien !',
      description: 'Et voilà, tu sais tout, tu es prêt à profiter pleinement de Mu Stream.',
    },
  },
  common: {
    tutorialStep: 'Etape {current} sur {total}',
  },
  alertToast: {
    newParticipant: '{name} a rejoint la salle',
    participantLeft: '{name} a quitté la salle',
    copiedRoomCode: 'Code copié dans le presse papier',
  },
  settingsPopup: {
    language: 'Langue',
    plugins: 'Extensions',
  },
} satisfies Translation;

export default fr;
