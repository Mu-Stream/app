import type { CoreAppContext } from '$lib/app';
import { Stylize, blueLabel, greenLabel, orangeLabel, prettyError } from '$lib/logging_utils';
import { DefaultCatch, Err, Ok, type Result } from 'bakutils-catcher';
import type { Plugin } from './i_plugin';
import type { Listener } from '$lib/notifier/i_notifier';
import type { RoomEvents } from '$lib/notifier/room';

/** Get the type of your plugin context useful to create commands */
export type PluginContext<N extends string, T extends Plugin<N>> = Record<N, T['plugin_context']>;

export class PluginManager {
  private _plugins: Plugin<string>[] = [];

  public get plugins() {
    return this._plugins;
  }

  private _context: CoreAppContext & { [key: string]: Record<string, unknown> };

  public user_actions_shortcut_ref!: HTMLDivElement;
  public sidebar_ref!: HTMLDivElement;
  public app_ref!: HTMLDivElement;

  constructor(context: CoreAppContext) {
    this._context = context as CoreAppContext & {
      [key: string]: Record<string, unknown>;
    };
    // proxy the NEW_PEER event so plugins can hook it
    // and proxy event used by them
    context.room.subscribe('NEW_PEER', this._hookNewPeer);
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
    throw Err(Error(`Plugin ${name} not found`));
  }

  public registerUserShorcutUI = () => {
    try {
      for (const plugin of this._plugins) {
        plugin.mountUserShortcutUI(this.user_actions_shortcut_ref).unwrap();
      }
    } catch (e) {
      prettyError(e as Error);
    }
  };

  public registerSidebarUI = () => {
    try {
      for (const plugin of this._plugins) {
        plugin.mountSidebarUI(this.sidebar_ref).unwrap();
      }
    } catch (e) {
      prettyError(e as Error);
    }
  };

  public registerAppUI = () => {
    try {
      for (const plugin of this._plugins) {
        plugin.mountAppUI(this.app_ref).unwrap();
      }
    } catch (e) {
      prettyError(e as Error);
    }
  };
}
