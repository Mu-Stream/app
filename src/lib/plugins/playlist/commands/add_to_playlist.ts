import { Command } from "$lib/commands/i_commands";
import { Ok, Option, type Result } from "bakutils-catcher";
import type { PlaylistPlugin } from "../playlist";
import { Completer } from "$lib/completer";
import Mp3Tag from 'mp3tag.js';
import type { MP3TagAPICFrame } from "mp3tag.js/types/id3v2/frames";

export class AddToPlaylist extends Command<PlaylistPlugin['context']> {

	constructor(private _file: File) {
		super();
	}

	public async execute(context: PlaylistPlugin['context']): Promise<Result<null, Error>> {
		const meta = new Completer<{
			uuid: string;
			title: string;
			artist: string;
			album: string;
			year: string;
			img: MP3TagAPICFrame[];
		}>()

		const reader = new FileReader();
		console.log('heyfwef')

		reader.onload = event => {
			const b = event.target?.result as ArrayBuffer;
			const tags = new Mp3Tag(b);
			tags.read();
			meta.complete(Option({
				uuid: 'dqwf',
				title: tags.tags.title ?? this._file.name,
				artist: tags.tags.artist ?? '',
				album: tags.tags.album ?? '',
				year: tags.tags.year ?? '',
				img: tags.tags.v2!.APIC ?? [],
			}))

		}
		reader.readAsArrayBuffer(this._file);
		const m = await meta.future;
		context.playlist.playlist_manager.addSongToPlaylist(m.unwrap());
		return Ok(null)
	}

}
