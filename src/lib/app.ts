import type { Result } from "bakutils-catcher";
import type { Command } from "$lib/commands/i_commands";
import { Room } from "$lib/notifier/room";
import { AudioManager } from "$lib/notifier/audio_manager";
import { SignalingServer } from "$lib/notifier/signaling";
import { PluginManager } from "./plugins/i_plugin";
import { ReactionPlugin } from "./plugins/reactions/reactions";

export class App {
	public plugin_manager: PluginManager<CoreAppContext & Record<string, unknown>>

	private static _instance: App;

	public static get instance() { return this._instance ??= new App() }

	public context = {
		room: new Room,
		audio_manager: new AudioManager,
		signaling_server: new SignalingServer,
	}

	private constructor() {
		this.plugin_manager = new PluginManager(this.context)
	}

	public async executeCommand(command: Command): Promise<Result<null, Error>> {
		return command.execute(this.context)
	}
}

export type CoreAppContext = typeof App.instance.context;


App.instance.plugin_manager.register(context => new ReactionPlugin(context))


App.instance.plugin_manager.init()

console.log(App.instance.context)
