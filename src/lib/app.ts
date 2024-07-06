import type { Result } from 'bakutils-catcher';
import type { Command } from '$lib/commands/i_commands';
import { Room } from '$lib/notifier/room';
import { AudioManager } from '$lib/notifier/audio_manager';
import { SignalingServer } from '$lib/notifier/signaling';
import { ReactionPlugin } from './plugins/reactions/reactions';
import { PluginManager } from './plugins/plugin_manager';
import { TextChatPlugin } from './plugins/text_chat/text_chat';
import { PlaylistPlugin } from './plugins/playlist/playlist';
import { Toaster } from './notifier/toaster';

export type CoreAppContext = typeof App.instance.context;

export class App {
	public plugin_manager: PluginManager;

	private static _instance: App;

	public static get instance() {
		return (this._instance ??= new App());
	}

	public context = {
		room: new Room(),
		audio_manager: new AudioManager(),
		signaling_server: new SignalingServer(),
		toaster: new Toaster(),
	};

	private constructor() {
		this.plugin_manager = new PluginManager(this.context);
	}

	public async executeCommand<T extends CoreAppContext>(command: Command<T>): Promise<Result<null, Error>> {
		return command.execute(this.context as T);
	}
}

// TODO: propose a way to load plugins from a folder
App.instance.plugin_manager.register(context => new PlaylistPlugin(context));
App.instance.plugin_manager.register(context => new ReactionPlugin(context));
App.instance.plugin_manager.register(context => new TextChatPlugin(context));
App.instance.plugin_manager.init();
