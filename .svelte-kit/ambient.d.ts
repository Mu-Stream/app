
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const npm_command: string;
	export const npm_config_userconfig: string;
	export const WAYFIRE_SOCKET: string;
	export const __HM_SESS_VARS_SOURCED: string;
	export const COLORTERM: string;
	export const XDG_CONFIG_DIRS: string;
	export const npm_config_cache: string;
	export const XDG_SESSION_PATH: string;
	export const NIX_LD_LIBRARY_PATH: string;
	export const TERM_PROGRAM_VERSION: string;
	export const NODE: string;
	export const SWWW_TRANSITION_FPS: string;
	export const WEZTERM_CONFIG_DIR: string;
	export const LC_ADDRESS: string;
	export const LC_NAME: string;
	export const XDG_DATA_HOME: string;
	export const XCURSOR_PATH: string;
	export const COLOR: string;
	export const LOCALE_ARCHIVE_2_27: string;
	export const npm_config_local_prefix: string;
	export const WEZTERM_EXECUTABLE: string;
	export const DESKTOP_SESSION: string;
	export const LC_MONETARY: string;
	export const NO_AT_BRIDGE: string;
	export const npm_config_globalconfig: string;
	export const XCURSOR_SIZE: string;
	export const EDITOR: string;
	export const XDG_SEAT: string;
	export const PWD: string;
	export const NIX_PROFILES: string;
	export const XDG_SESSION_DESKTOP: string;
	export const LOGNAME: string;
	export const XDG_SESSION_TYPE: string;
	export const NIX_PATH: string;
	export const npm_config_init_module: string;
	export const NIXPKGS_CONFIG: string;
	export const _: string;
	export const GTK2_RC_FILES: string;
	export const HOME: string;
	export const SSH_ASKPASS: string;
	export const LC_PAPER: string;
	export const LANG: string;
	export const NIXOS_OZONE_WL: string;
	export const WEZTERM_UNIX_SOCKET: string;
	export const LS_COLORS: string;
	export const _JAVA_AWT_WM_NONREPARENTING: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const npm_package_version: string;
	export const STARSHIP_SHELL: string;
	export const WAYLAND_DISPLAY: string;
	export const SSL_CERT_DIR: string;
	export const GIO_EXTRA_MODULES: string;
	export const XDG_SEAT_PATH: string;
	export const INIT_CWD: string;
	export const GTK_A11Y: string;
	export const STARSHIP_SESSION_KEY: string;
	export const NIX_USER_PROFILE_DIR: string;
	export const INFOPATH: string;
	export const npm_lifecycle_script: string;
	export const npm_config_npm_version: string;
	export const XDG_SESSION_CLASS: string;
	export const TERM: string;
	export const LC_IDENTIFICATION: string;
	export const npm_package_name: string;
	export const SWWW_TRANSITION: string;
	export const GTK_PATH: string;
	export const npm_config_prefix: string;
	export const LESSOPEN: string;
	export const USER: string;
	export const TZDIR: string;
	export const NIX_LD: string;
	export const DISPLAY: string;
	export const npm_lifecycle_event: string;
	export const SHLVL: string;
	export const __HM_ZSH_SESS_VARS_SOURCED: string;
	export const PAGER: string;
	export const LC_TELEPHONE: string;
	export const QTWEBKIT_PLUGIN_PATH: string;
	export const LC_MEASUREMENT: string;
	export const __NIXOS_SET_ENVIRONMENT_DONE: string;
	export const XDG_VTNR: string;
	export const XDG_SESSION_ID: string;
	export const LOCALE_ARCHIVE: string;
	export const ATUIN_SESSION: string;
	export const LESSKEYIN_SYSTEM: string;
	export const npm_config_user_agent: string;
	export const TERMINFO_DIRS: string;
	export const npm_execpath: string;
	export const ATUIN_HISTORY_ID: string;
	export const WEZTERM_CONFIG_FILE: string;
	export const XDG_RUNTIME_DIR: string;
	export const SSL_CERT_FILE: string;
	export const WAYFIRE_PLUGIN_PATH: string;
	export const NIX_XDG_DESKTOP_PORTAL_DIR: string;
	export const npm_package_json: string;
	export const LC_TIME: string;
	export const XDG_DATA_DIRS: string;
	export const LIBEXEC_PATH: string;
	export const npm_config_noproxy: string;
	export const PATH: string;
	export const npm_config_node_gyp: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const npm_config_global_prefix: string;
	export const WAYFIRE_CONFIG_FILE: string;
	export const npm_node_execpath: string;
	export const LC_NUMERIC: string;
	export const WEZTERM_PANE: string;
	export const OLDPWD: string;
	export const WAYFIRE_PLUGIN_XML_PATH: string;
	export const TERM_PROGRAM: string;
	export const WEZTERM_EXECUTABLE_DIR: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	export const PUBLIC_SIGNALING_SERVER_URL: string;
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		npm_command: string;
		npm_config_userconfig: string;
		WAYFIRE_SOCKET: string;
		__HM_SESS_VARS_SOURCED: string;
		COLORTERM: string;
		XDG_CONFIG_DIRS: string;
		npm_config_cache: string;
		XDG_SESSION_PATH: string;
		NIX_LD_LIBRARY_PATH: string;
		TERM_PROGRAM_VERSION: string;
		NODE: string;
		SWWW_TRANSITION_FPS: string;
		WEZTERM_CONFIG_DIR: string;
		LC_ADDRESS: string;
		LC_NAME: string;
		XDG_DATA_HOME: string;
		XCURSOR_PATH: string;
		COLOR: string;
		LOCALE_ARCHIVE_2_27: string;
		npm_config_local_prefix: string;
		WEZTERM_EXECUTABLE: string;
		DESKTOP_SESSION: string;
		LC_MONETARY: string;
		NO_AT_BRIDGE: string;
		npm_config_globalconfig: string;
		XCURSOR_SIZE: string;
		EDITOR: string;
		XDG_SEAT: string;
		PWD: string;
		NIX_PROFILES: string;
		XDG_SESSION_DESKTOP: string;
		LOGNAME: string;
		XDG_SESSION_TYPE: string;
		NIX_PATH: string;
		npm_config_init_module: string;
		NIXPKGS_CONFIG: string;
		_: string;
		GTK2_RC_FILES: string;
		HOME: string;
		SSH_ASKPASS: string;
		LC_PAPER: string;
		LANG: string;
		NIXOS_OZONE_WL: string;
		WEZTERM_UNIX_SOCKET: string;
		LS_COLORS: string;
		_JAVA_AWT_WM_NONREPARENTING: string;
		XDG_CURRENT_DESKTOP: string;
		npm_package_version: string;
		STARSHIP_SHELL: string;
		WAYLAND_DISPLAY: string;
		SSL_CERT_DIR: string;
		GIO_EXTRA_MODULES: string;
		XDG_SEAT_PATH: string;
		INIT_CWD: string;
		GTK_A11Y: string;
		STARSHIP_SESSION_KEY: string;
		NIX_USER_PROFILE_DIR: string;
		INFOPATH: string;
		npm_lifecycle_script: string;
		npm_config_npm_version: string;
		XDG_SESSION_CLASS: string;
		TERM: string;
		LC_IDENTIFICATION: string;
		npm_package_name: string;
		SWWW_TRANSITION: string;
		GTK_PATH: string;
		npm_config_prefix: string;
		LESSOPEN: string;
		USER: string;
		TZDIR: string;
		NIX_LD: string;
		DISPLAY: string;
		npm_lifecycle_event: string;
		SHLVL: string;
		__HM_ZSH_SESS_VARS_SOURCED: string;
		PAGER: string;
		LC_TELEPHONE: string;
		QTWEBKIT_PLUGIN_PATH: string;
		LC_MEASUREMENT: string;
		__NIXOS_SET_ENVIRONMENT_DONE: string;
		XDG_VTNR: string;
		XDG_SESSION_ID: string;
		LOCALE_ARCHIVE: string;
		ATUIN_SESSION: string;
		LESSKEYIN_SYSTEM: string;
		npm_config_user_agent: string;
		TERMINFO_DIRS: string;
		npm_execpath: string;
		ATUIN_HISTORY_ID: string;
		WEZTERM_CONFIG_FILE: string;
		XDG_RUNTIME_DIR: string;
		SSL_CERT_FILE: string;
		WAYFIRE_PLUGIN_PATH: string;
		NIX_XDG_DESKTOP_PORTAL_DIR: string;
		npm_package_json: string;
		LC_TIME: string;
		XDG_DATA_DIRS: string;
		LIBEXEC_PATH: string;
		npm_config_noproxy: string;
		PATH: string;
		npm_config_node_gyp: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		npm_config_global_prefix: string;
		WAYFIRE_CONFIG_FILE: string;
		npm_node_execpath: string;
		LC_NUMERIC: string;
		WEZTERM_PANE: string;
		OLDPWD: string;
		WAYFIRE_PLUGIN_XML_PATH: string;
		TERM_PROGRAM: string;
		WEZTERM_EXECUTABLE_DIR: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		PUBLIC_SIGNALING_SERVER_URL: string;
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
