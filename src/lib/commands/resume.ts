import { Ok, type Result } from "bakutils-catcher";
import { Command } from "./i_commands";
import type { AppContext } from "$lib/app";

export class ResumeCommand extends Command {
	public async execute(context: AppContext): Promise<Result<null, Error>> {
		context["room"].client_peer?.send({ type: 'RESUME' })
		context["room"].broadcast({ type: 'RESUME' })
		return Ok(null)
	}
}
