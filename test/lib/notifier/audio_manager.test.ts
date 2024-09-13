import {beforeEach, describe, expect, it, vi} from 'vitest';
import {AudioManager} from "../../../src/lib/notifier/audio_manager";

vi.mock('browser-image-compression');
vi.mock('music-metadata');
vi.mock('svelte/store', () => {
  const originalModule = vi.importActual('svelte/store');
  return {
    ...originalModule,
    get: vi.fn(),
    readable: vi.fn(),
  };
});
vi.mock('$lib/app', () => ({
  App: {
    instance: {
      executeCommand: vi.fn(),
      context: {
        room: {
          send: vi.fn(),
        },
      },
    },
  },
}));
global.Audio = vi.fn().mockImplementation(() => ({
  srcObject: null,
  play: vi.fn(),
  pause: vi.fn(),
}));

describe('AudioManager', () => {
  let audioManager: AudioManager;

  beforeEach(() => {
    audioManager = new AudioManager();
  });

  it('should initialize with default values', () => {
    expect(audioManager['_readable_default_values']).toEqual({
      CURRENTLY_PLAYING: {
        type: 'CURRENTLY_PLAYING',
        total_time: 0,
        current_time: 0,
        status: 'PAUSED',
      },
      CURRENTLY_METADATA: {
        type: 'CURRENTLY_METADATA',
        title: '',
        artist: '',
        album: '',
        year: '',
        img: [],
      },
      VOLUME: { type: 'VOLUME', value: 1 },
    });
  });

  it('should stop and disconnect audio nodes', () => {
    audioManager.stop();
    expect(audioManager['_node']).toBeUndefined();
    expect(audioManager['_destination']).toBeUndefined();
  });

});