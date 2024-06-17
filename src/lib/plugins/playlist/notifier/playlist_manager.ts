import { Notifier, type Events } from "$lib/notifier/i_notifier";
import type { MP3TagAPICFrame } from "mp3tag.js/types/id3v2/frames";

export type PlaylistEventType = 'ADD_TO_PLAYLIST' | 'REMOVE_FROM_PLAYLIST' | 'SWAP_IN_PLAYLIST' | 'PLAY_SONG_IN_PLAYLIST' | 'UPDATE_PLAYLIST'

export type PlaylistEvent = Events<
	PlaylistEventType,
	{
		ADD_TO_PLAYLIST: {
			type: 'ADD_TO_PLAYLIST',
			uuid: string;
			title: string;
			artist: string;
			album: string;
			year: string;
			img: MP3TagAPICFrame[];
		},
		REMOVE_FROM_PLAYLIST: {
			type: 'REMOVE_FROM_PLAYLIST';
			uuid: string;
		},
		SWAP_IN_PLAYLIST: {
			type: 'SWAP_IN_PLAYLIST';
			uuida: string;
			uuidb: string;
		},
		PLAY_SONG_IN_PLAYLIST: {
			type: 'PLAY_SONG_IN_PLAYLIST';
			uuid: string;
		},
		UPDATE_PLAYLIST: {
			type: 'UPDATE_PLAYLIST';
			queue: {
				uuid: string;
				title: string;
				artist: string;
				album: string;
				year: string;
				img: MP3TagAPICFrame[];
			}[]
		},
	}
>


export class PlaylistManager extends Notifier<PlaylistEventType, PlaylistEvent> {
	constructor() {
		super({
			readable_default_values: {
				UPDATE_PLAYLIST: {
					type: 'UPDATE_PLAYLIST',
					queue: []
				}
			}
		})
	}

	private _queue: {
		uuid: string;
		title: string;
		artist: string;
		album: string;
		year: string;
		img: MP3TagAPICFrame[];
	}[] = []

	public addSongToPlaylist(song: {
		uuid: string;
		title: string;
		artist: string;
		album: string;
		year: string;
		img: MP3TagAPICFrame[];
	}) {
		this._queue.push(song)
		this._notify({ type: 'UPDATE_PLAYLIST', queue: this._queue })
	}

}
