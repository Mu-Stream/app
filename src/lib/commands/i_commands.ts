import type { Result } from "bakutils-catcher";
import { type AppContext } from "$lib/app"
import type { Listener } from "$lib/notifier/i_notifier";

export const prettyError = (e: Error) => console.error(
	`%c ${e.constructor.name} %c %c ERROR %c ${e.message}`,
	'color:black; background: #bada55; font-weight: bold;',
	'',
	'color:black; background: red; font-weight: bold;',
)

export abstract class Command {
	public abstract execute(context: AppContext): Promise<Result<null, Error>>;
}

export type WrappedListener<T, P> = (value: T) => Listener<P>;
