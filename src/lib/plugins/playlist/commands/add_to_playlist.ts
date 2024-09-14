import { Command } from '$lib/commands/i_commands';
import { Ok, type Result } from 'bakutils-catcher';
import type { PlaylistPlugin } from '../playlist';
import type { Song } from '../notifier/playlist_manager';
import { parseBlob } from 'music-metadata';
import { v4 } from 'uuid';

export class AddToPlaylist extends Command<PlaylistPlugin['context']> {
  constructor(private _file: File) {
    super();
  }

  public async execute(context: PlaylistPlugin['context']): Promise<Result<null, Error>> {
    let tags: {
      common: {
        title?: string;
        artist?: string;
        album?: string;
        year?: number;
        picture?: { data: Uint8Array; format: string }[];
      };
    };

    try {
      tags = await parseBlob(this._file);
    } catch (e) {
      tags = { common: {} };
    }

    const met: Song = {
      identity: context.room.client_peer?.id ?? 'host',
      uuid: v4(),
      title: tags.common.title ?? this._file.name.split('.')[0],
      artist: tags.common.artist ?? '',
      album: tags.common.album ?? '',
      year: tags.common.year?.toString() ?? '',
      hasImg: !!tags.common.picture && tags.common.picture?.length !== 0,
      localImg: null,
    };

    let img = met.hasImg ? tags.common.picture![0] : null;
    const imgFile = img
      ? new File([new Blob([new Uint8Array(img!.data)], { type: img!.format })], `${met.uuid}${met.title}`)
      : null;

    context.playlist.playlist_manager.addSongToPlaylist(met, this._file, imgFile);
    return Ok(null);
  }
}
