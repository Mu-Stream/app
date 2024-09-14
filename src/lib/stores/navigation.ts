import { writable } from 'svelte/store';

type Navigation = 'PLAYER' | 'PLAYLIST' | 'PARTICIPANTS';
export const navigation = writable<Navigation>('PLAYLIST');
