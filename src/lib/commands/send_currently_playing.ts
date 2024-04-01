import { Err, Ok, type Result } from "bakutils-catcher";
import { Command } from "./i_commands";
import type { PeerEventTypes, PeerEvents } from "$lib/notifier/peer";

export class SyncCurrentlyPlaying extends Command {
	constructor(private event: PeerEvents['CURRENTLY_PLAYING']) { super() }

	public async execute(): Promise<Result<null, Error>> {
		if (this._room.client_peer) {
			this._room.client_peer!.send(this.event)
		} else {
			this._room.broadcast(this.event)
		}
		this._room.notify(this.event)
		return Ok(null)
	}
}
