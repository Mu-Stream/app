import { writable } from 'svelte/store';

export const playlist = writable([
	{
		title: 'test',
		artist: 'test',
		cover:
			'https://lh3.googleusercontent.com/IMHL2k6RwTNd67kckwLmxBmSw9Fb3ABSckIPcIV_UASrUBrkOf4dsu_HeH3_D_PbvCHkoIxFDb77R-k=w544-h544-l90-rj',
		total_time: 78,
		current_time: 14,
	},
]);

export function updatePlaylist(new_playlist: any) {
	playlist.set(new_playlist);
}
