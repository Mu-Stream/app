import type { Result } from "bakutils-catcher";
import type { Command } from "./i_commands";

export class CommandManager {
	private _history: Command[] = [];

	private static _instance: CommandManager;

	public static get instance() { return this._instance ??= new CommandManager() }

	private constructor() { }

	public async execute(command: Command): Promise<Result<null, Error>> {
		this._history.push(command);
		return command.execute()
	}
}
