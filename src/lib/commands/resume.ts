import { Ok, type Result } from "bakutils-catcher";
import { Command } from "./i_commands";
import type { CoreAppContext } from "$lib/app";

export class ResumeCommand implements Command {
  public async execute(context: CoreAppContext): Promise<Result<null, Error>> {
    context.room.send({ type: "RESUME" });
    context.room.broadcast({ type: "RESUME" });
    return Ok(null);
  }
}
