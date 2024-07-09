import { Command } from '$lib/commands/i_commands';
import { Ok, Option, type Result } from 'bakutils-catcher';
import type { PlaylistPlugin } from '../playlist';
import { Completer } from '$lib/completer';
import Mp3Tag from 'mp3tag.js';
import type { Song } from '../notifier/playlist_manager';
import imageCompression from 'browser-image-compression';

export class AddToPlaylist extends Command<PlaylistPlugin['context']> {
	constructor(private _file: File) {
		super();
	}

	public async execute(context: PlaylistPlugin['context']): Promise<Result<null, Error>> {
		const meta = new Completer<Song>();

		const reader = new FileReader();

		reader.onload = event => {
			const b = event.target?.result as ArrayBuffer;
			const tags = new Mp3Tag(b);
			tags.read();
			console.log(tags.tags.v2?.APIC);

			meta.complete(
				Option({
					identity: context.room.client_peer?.id ?? 'host',
					title: tags.tags.title ?? this._file.name,
					artist: tags.tags.artist ?? '',
					album: tags.tags.album ?? '',
					year: tags.tags.year ?? '',
					img: tags.tags.v2?.APIC ?? [],
				})
			);
		};
		reader.readAsArrayBuffer(this._file);
		const m = await meta.future;
		const met = m.unwrap();

		// compress image  to mak eit go through webrtc and keep only the first one
		if (met.img.length !== 0) {
			var blob = new Blob([new Uint8Array(met.img[0].data)], { type: met.img[0].format });
			const compressed = await imageCompression(new File([blob], 'temp', { type: met.img[0].format }), {
				maxSizeMB: 0.01,
			});
			met.img[0].data = Array.from(new Uint8Array(await compressed.arrayBuffer()));
			met.img = met.img.slice(0, 1);
		}

		context.playlist.playlist_manager.addSongToPlaylist(m.unwrap());
		return Ok(null);
	}
}
