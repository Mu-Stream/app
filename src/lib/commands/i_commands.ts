import type { Result } from 'bakutils-catcher';
import type { Listener } from '$lib/notifier/i_notifier';
import type { PluginContext } from '$lib/plugins/i_plugin';

export const prettyError = (e: Error) =>
  console.error(
    `%c ${e.constructor.name} %c %c ERROR %c ${e.message}`,
    'color:black; background: #bada55; font-weight: bold;',
    '',
    'color:black; background: red; font-weight: bold;'
  );

export abstract class Command<T extends Record<string, unknown> = {}> {
  public abstract execute(context: PluginContext<T>): Promise<Result<null, Error>>;
}

export type WrappedListener<T, P> = (value: T) => Listener<P>;
