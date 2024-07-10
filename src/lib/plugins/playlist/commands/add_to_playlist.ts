import { Command } from '$lib/commands/i_commands';
import { Ok, Option, type Result } from 'bakutils-catcher';
import type { PlaylistPlugin } from '../playlist';
import { Completer } from '$lib/completer';
import type { Song } from '../notifier/playlist_manager';
import imageCompression from 'browser-image-compression';
import { get } from 'svelte/store';
import { compression_rate } from '$lib/stores/compression_rate';
import { parseBlob } from 'music-metadata';

export class AddToPlaylist extends Command<PlaylistPlugin['context']> {
  constructor(private _file: File) {
    super();
  }

  public async execute(context: PlaylistPlugin['context']): Promise<Result<null, Error>> {
    const meta = new Completer<Song>();

    let tags: {
      common: { title?: string; artist?: string; album?: string; year?: number; picture?: { data: Uint8Array }[] };
    };

    try {
      tags = await parseBlob(this._file);
    } catch (e) {
      tags = { common: {} };
    }

    const reader = new FileReader();

    reader.onload = event => {
      const b = event.target?.result as ArrayBuffer;

      meta.complete(
        Option({
          identity: context.room.client_peer?.id ?? 'host',
          title: tags.common.title ?? this._file.name.split('.')[0],
          artist: tags.common.artist ?? '',
          album: tags.common.album ?? '',
          year: tags.common.year?.toString() ?? '',
          img: tags.common.picture ?? [],
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
        maxSizeMB: get(compression_rate),
      });
      met.img[0].data = Array.from(new Uint8Array(await compressed.arrayBuffer()));
      met.img = met.img.slice(0, 1);
    }

    context.playlist.playlist_manager.addSongToPlaylist(m.unwrap());
    return Ok(null);
  }
}
