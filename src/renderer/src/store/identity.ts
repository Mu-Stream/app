import { writable } from "svelte/store";

export const identity = writable<string | undefined>(undefined);

