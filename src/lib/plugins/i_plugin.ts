import type { CoreAppContext } from '$lib/app';
import { Stylize, blueLabel, greenLabel, orangeLabel, prettyError } from '$lib/logging_utils';
import type { Listener } from '$lib/notifier/i_notifier';
import type { RoomEvents } from '$lib/notifier/room';
import { DefaultCatch, Err, Ok, type Result } from 'bakutils-catcher';

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
}

/** Get the type of your plugin context useful to create commands */
export type PluginContext<N extends string, T extends Plugin<N>> = Record<N, T['plugin_context']>;

export class PluginManager {
  private _plugins: Plugin<string>[] = [];

  private _context: CoreAppContext & { [key: string]: Record<string, unknown> };

  constructor(context: CoreAppContext) {
    this._context = context as CoreAppContext & {
      [key: string]: Record<string, unknown>;
    };
    // proxy the NEW_PEER event so plugins can hook it
    // and proxy event used by them
    context.room.proxy('NEW_PEER', this._hookNewPeer);
    context.room.proxy('JOINED', this._hookMyPeer);
  }

  private pluginLog: (plugin: Plugin<string>, msg: string) => void = (plugin, msg) => {
    const styled = new Stylize()
      .style(greenLabel)
      .apply('PLUGIN MANAGER', { padding: 2 })
      .space()
      .style(orangeLabel)
      .apply(plugin.name, { padding: 2 })
      .space()
      .style(blueLabel)
      .apply(`V${plugin.version}`, { padding: 2 })
      .apply(msg, { padding: { left: 1 } })
      .build();
    console.info(...styled);
  };

  public async register<N extends string>(cb: (context: CoreAppContext) => Plugin<N>) {
    const plugin = cb(this._context);
    this._plugins.push(plugin);
    this.pluginLog(plugin, 'registered');
  }

  private async _registerContexts(): Promise<Result<null, Error>> {
    for (const plugin of this._plugins) {
      this._context[plugin.name] = plugin.plugin_context;
    }
    return Ok(null);
  }

  private _hookNewPeer: Listener<RoomEvents['NEW_PEER']> = async event => {
    for (const plugin of this._plugins) {
      (await plugin.hookEvents(event.peer.hookPluginEvents)).unwrap();
    }
    return Ok(null);
  };

  private _hookMyPeer: Listener<RoomEvents['JOINED']> = async event => {
    for (const plugin of this._plugins) {
      (await plugin.hookEvents(event.peer.hookPluginEvents)).unwrap();
    }
    return Ok(null);
  };

  private async _unRegisterContext<N extends string>(plugin: Plugin<N>): Promise<Result<null, Error>> {
    // @ts-ignore
    this._context[plugin.name] = undefined;
    return Ok(null);
  }

  @DefaultCatch(prettyError)
  public async init() {
    (await this._registerContexts()).unwrap();
    for (const plugin of this._plugins) {
      (await plugin.init()).unwrap();
    }
  }

  @DefaultCatch(prettyError)
  public async dispose(name: string): Promise<Result<null, Error>> {
    const plugin = this._plugins.find(p => p.name === name);
    if (plugin) {
      (await plugin.dispose()).unwrap();
      (await this._unRegisterContext(plugin)).unwrap();
    }
    return Err(Error(`Plugin ${name} not found`));
  }
}
