import type { User } from '$lib/webrtc/types/general';
import { writable } from 'svelte/store'

export const users = writable<User[]>([]);

export function updateUsers(new_users: User[]) {
	users.set(new_users)
}
