import type { BaseTranslation } from '../i18n-types';

const en = {
  title: 'Mu Stream',
  waitingScreen: {
    slogan: 'Share intense listening sessions with your friends!',
    createRoomBtn: 'Create a Room',
    joinRoomBtn: 'Join a Room',
    roomChoiceSeparator: 'OR',
    roomCodeInput: 'Room Code',
  },
  joinRoomPopup: {
    userName: 'Username',
    roomCodeInput: 'Room Code',
    joinBtn: 'Join',
  },
  waitingScreenTutorial: {
    stepWelcome: {
      title: 'Welcome to Mu Stream',
      description:
        'Mu Stream is an app that lets you share listening sessions with your friends. Here’s a tutorial to help you get started.',
    },
    stepCreateRoom: {
      title: 'Create a Room',
      description:
        'Click here to create a room. A code will be generated, and you can copy and share it with your friends so they can join you.',
    },
    stepJoinRoom: {
      title: 'Join a Room',
      description:
        'Click here to create a room. A room code will be generated, and you can copy and share it with your friends so they can join you.',
      description1: 'Click here to join a room.',
      description2: 'Enter your username here.',
      description3: 'Enter the room code here.',
      description4: 'And you’re good to go!',
    },
  },
  roomScreen: {
    code: 'Code',
    deleteRoom: 'Delete Room',
    logOut: 'Log Out',
    participants: 'Participants',
    playlist: 'Playlist',
    chat: 'Live Chat',
    react: 'React',
  },
  warningPopup: {
    description:
      'Mu Stream is not responsible for the audio content shared by participants. You are solely responsible for it.',
    quit: 'Do not show again',
  },
  roomScreenTutorial: {
    stepWelcome: {
      title: 'Welcome to the Room',
      description: 'You’re in a private music listening room. Here’s a tutorial to help you navigate.',
    },
    stepCode: {
      title: 'Room Code',
      description:
        'You can share this code with your friends so they can join your room. The eye icon allows you to view it, and the copy icon lets you copy it directly to your clipboard.',
    },
    stepAddSong: {
      title: 'Add a Song',
      description: 'You can add a song to the room by pressing here.',
    },
    stepReact: {
      title: 'Add a Reaction',
      description: 'You can react to the music!',
    },
    stepMusicControl: {
      title: 'Music Controls',
      description: 'You can control the music using the buttons here.',
    },
    stepQuitRoom: {
      title: 'Leave the Room',
      description: 'You can leave or dissolve the room by clicking here.',
    },
    stepFinal: {
      title: 'Have Fun!',
      description: 'That’s it, you know everything, you’re ready to fully enjoy Mu Stream.',
    },
  },
  common: {
    tutorialStep: 'Step {current:string} of {total:string}',
  },
  alertToast: {
    newParticipant: '{name:string} has joined the room',
    participantLeft: '{name:string} has left the room',
    copiedRoomCode: 'Code copied to clipboard',
  },
  settingsPopup: {
    language: 'Language',
  },
} satisfies BaseTranslation;

export default en;
