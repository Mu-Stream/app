import type { CoreAppContext } from '$lib/app';
import type { Listener } from '$lib/notifier/i_notifier';
import { Ok, type Result } from 'bakutils-catcher';

// TODO: handle unsubribe cleanup at dispose

/** function that bind a custom peer to peer event to the listener */
export type Binder<K extends string, E extends any> = (key: K, handler: Listener<E>) => Result<null, Error>;

/** The Plugin interface
 * Each plugin should respect this contract to work
 * */
export abstract class Plugin<N extends string> {
  /** The name of your plugin */
  abstract name: N;

  /** The version of your plugin */
  abstract version: number;

  /** the extra app context to register for your plugin
   * it will be available at this.context.plugin_name...
   * you should not modify it outside initialization
   * as it will not be propagated
   */
  abstract plugin_context: Record<string, unknown>;

  /** the actual app context + your plugin context
   * from here you can acces the whole CoreAppContext with room, audio_manager,
   * signaling_server, and so on
   * The context should not be modified outside the declaration of your plugin context
   * TODO: be able to add a dependency array in plugin interface to typesafe their context for your plugin
   * they should be loaded before the plugin that depends on them
   * **/
  public context: CoreAppContext & Record<N, this['plugin_context']>;

  constructor(context: CoreAppContext) {
    this.context = context as unknown as CoreAppContext & Record<N, this['plugin_context']>;
  }

  /**
   * Hook the events you want to listen to
   * This function is called every time a peer join the room
   * @param binder the function to bind the event to your listener
   */
  abstract hookEvents(binder: Binder<string, { key: string }>): Promise<Result<null, Error>>;

  /** extra initialization for your plugin do as you please */
  abstract init(): Promise<Result<null, Error>>;

  /** extra dispose for your plugin do as you please */
  abstract dispose(): Promise<Result<null, Error>>;

  public mountUserShortcutUI(target: HTMLDivElement): Result<null, Error> {
    return Ok(null);
  }

  public mountAppUI(target: HTMLDivElement): Result<null, Error> {
    return Ok(null);
  }
}
