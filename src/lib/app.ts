import type { Result } from "bakutils-catcher";
import type { Command } from "$lib/commands/i_commands";
import { Room } from "$lib/notifier/room";
import { AudioManager } from "$lib/notifier/audio_manager";
import { SignalingServer } from "$lib/notifier/signaling";

export class App {
	private _history: Command[] = [];

	private static _instance: App;

	public static get instance() { return this._instance ??= new App() }

	public context = {
		"room": new Room,
		"audio_manager": new AudioManager,
		"signaling_server": new SignalingServer,
	}

	private constructor() { }

	public async executeCommand(command: Command): Promise<Result<null, Error>> {
		this._history.push(command)
		return command.execute(this.context)
	}
}

export type AppContext = typeof App.instance.context;


// TODO: plugin context can be infered from plugin interface with dependecies mangement where context inherit all plugins context + its own
