import { Ok, type Result } from 'bakutils-catcher';
import { Command } from './i_commands';
import type { CoreAppContext } from '$lib/app';
import type { AudioManagerEvent } from '$lib/notifier/audio_manager';

export class SyncCurrentMetadata extends Command<CoreAppContext> {
	constructor(private event: AudioManagerEvent['CURRENTLY_METADATA']) {
		super();
	}

	public async execute(context: CoreAppContext): Promise<Result<null, Error>> {
		context.room.send(this.event);
		context.room.broadcast(this.event);
		context.audio_manager.syncCurrentMetadata(this.event);
		return Ok(null);
	}
}
