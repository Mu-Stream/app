import { AudioManager } from "$lib/notifier/audio_manager";
import { Room } from "$lib/notifier/room";
import { SignalingServer } from "$lib/notifier/signaling";
import { DefaultCatch, type Result } from "bakutils-catcher";

export const prettyError = (e: Error) => console.error(
	`%c ${e.constructor.name} %c %c ERROR %c ${e.message}`,
	'color:black; background: #bada55; font-weight: bold;',
	'',
	'color:black; background: red; font-weight: bold;',
)

export abstract class Command {
	protected _room: Room;
	protected _audio_manager: AudioManager;
	protected _signaling_server: SignalingServer;

	constructor() {
		this._room = Room.instance;
		this._audio_manager = AudioManager.instance;
		this._signaling_server = SignalingServer.instance;
	}

	public abstract execute(): Promise<Result<null, Error>>;
}
