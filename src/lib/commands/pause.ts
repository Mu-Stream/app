import { Ok, type Result } from "bakutils-catcher";
import { Command } from "./i_commands";

export class PauseCommand extends Command {
	public async execute(): Promise<Result<null, Error>> {
		this._room.client_peer?.send({ type: 'PAUSE' })
		this._room.broadcast({ type: 'PAUSE' })
		return Ok(null)
	}

}
