import type { Result } from 'bakutils-catcher';
import type { Listener } from '$lib/notifier/i_notifier';
import type { CoreAppContext } from '$lib/app';
import { Stylize, redLabel } from '$lib/logging_utils';

export abstract class Command<C extends CoreAppContext> {
  public abstract execute(context: C): Promise<Result<null, Error>>;
}

export type WrappedListener<T, P> = (value: T) => Listener<P>;
