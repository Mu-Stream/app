import { writable } from 'svelte/store';

type Navigation = 'PLAYER' | 'PLAYLIST' | 'PARTICIPANTS' | 'SETTINGS';
export const navigation = writable<Navigation>('PLAYLIST');
