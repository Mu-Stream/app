import { writable } from 'svelte/store';

export const roomId = writable<string | undefined>(undefined);
