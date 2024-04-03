import { Ok, type Result } from "bakutils-catcher";
import { Command } from "./i_commands";
import type { PeerEvents } from "$lib/notifier/peer";
import type { CoreAppContext } from "$lib/app";

export class SyncCurrentlyPlaying extends Command {
  constructor(private event: PeerEvents["CURRENTLY_PLAYING"]) {
    super();
  }

  public async execute(context: CoreAppContext): Promise<Result<null, Error>> {
    context.room.send(this.event);
    context.room.broadcast(this.event);
    return Ok(null);
  }
}
