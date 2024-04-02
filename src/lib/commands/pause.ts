import { Ok, type Result } from "bakutils-catcher";
import { Command } from "./i_commands";
import type { CoreAppContext } from "$lib/app";

export class PauseCommand extends Command {
	public async execute(context: CoreAppContext): Promise<Result<null, Error>> {
		context.room.client_peer?.send({ type: 'PAUSE' })
		context.room.broadcast({ type: 'PAUSE' })
		return Ok(null)
	}
}
