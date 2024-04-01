import { Ok, type Result } from "bakutils-catcher";
import { Command } from "./i_commands";

export class ResumeCommand extends Command {
	public async execute(): Promise<Result<null, Error>> {
		this._room.client_peer?.send({ type: 'RESUME' })
		this._room.broadcast({ type: 'RESUME' })
		return Ok(null)
	}
}
