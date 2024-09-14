import { Ok, type Result } from 'bakutils-catcher';
import { Command } from './i_commands';
import type { CoreAppContext } from '$lib/app';
import type { AudioManagerEvent } from '$lib/notifier/audio_manager';

export class SyncCurrentMetadata extends Command<CoreAppContext> {
	constructor(private event: AudioManagerEvent['CURRENTLY_METADATA']) {
		super();
	}

	public async execute(context: CoreAppContext): Promise<Result<null, Error>> {
		context.audio_manager.syncCurrentMetadata(this.event);
		const { localImg, ...evt } = this.event;
		context.room.send(evt);
		context.room.broadcast(evt);
		if (localImg) {
			context.room.sendFile(localImg, 'current-metadata');
			context.room.broadcastFile(localImg, 'current-metadata');
		}
		return Ok(null);
	}
}
