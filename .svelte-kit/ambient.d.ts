
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
	export const ComSpec: string;
	export const ChocolateyLastPathUpdate: string;
	export const ALLUSERSPROFILE: string;
	export const NODE_ENV: string;
	export const PROMPT: string;
	export const USERNAME: string;
	export const TERM_PROGRAM: string;
	export const PROCESSOR_ARCHITECTURE: string;
	export const npm_package_json: string;
	export const NUMBER_OF_PROCESSORS: string;
	export const TEMP: string;
	export const npm_node_execpath: string;
	export const ZES_ENABLE_SYSMAN: string;
	export const HOMEPATH: string;
	export const PATHEXT: string;
	export const COLORTERM: string;
	export const ProgramData: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const SystemDrive: string;
	export const CommonProgramW6432: string;
	export const OneDrive: string;
	export const SystemRoot: string;
	export const LOGONSERVER: string;
	export const npm_lifecycle_event: string;
	export const LOCALAPPDATA: string;
	export const USERDOMAIN: string;
	export const OS: string;
	export const PROCESSOR_REVISION: string;
	export const CommonProgramFiles: string;
	export const IGCCSVC_DB: string;
	export const npm_config_user_agent: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const PROCESSOR_LEVEL: string;
	export const COMPUTERNAME: string;
	export const Path: string;
	export const NODE: string;
	export const VBOX_MSI_INSTALL_PATH: string;
	export const PROCESSOR_IDENTIFIER: string;
	export const FPS_BROWSER_USER_PROFILE_STRING: string;
	export const USERPROFILE: string;
	export const EFC_13916: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const HOMEDRIVE: string;
	export const VSCODE_INJECTION: string;
	export const npm_config_local_prefix: string;
	export const windir: string;
	export const npm_execpath: string;
	export const LANG: string;
	export const ProgramFiles: string;
	export const ChocolateyInstall: string;
	export const TERM_PROGRAM_VERSION: string;
	export const JAVA_HOME: string;
	export const npm_package_name: string;
	export const ProgramW6432: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const TMP: string;
	export const OneDriveConsumer: string;
	export const npm_package_version: string;
	export const PSModulePath: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const SESSIONNAME: string;
	export const CHROME_CRASHPAD_PIPE_NAME: string;
	export const DriverData: string;
	export const PUBLIC: string;
	export const USERDOMAIN_ROAMINGPROFILE: string;
	export const FPS_BROWSER_APP_PROFILE_STRING: string;
	export const GIT_ASKPASS: string;
	export const APPDATA: string;
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
		ComSpec: string;
		ChocolateyLastPathUpdate: string;
		ALLUSERSPROFILE: string;
		NODE_ENV: string;
		PROMPT: string;
		USERNAME: string;
		TERM_PROGRAM: string;
		PROCESSOR_ARCHITECTURE: string;
		npm_package_json: string;
		NUMBER_OF_PROCESSORS: string;
		TEMP: string;
		npm_node_execpath: string;
		ZES_ENABLE_SYSMAN: string;
		HOMEPATH: string;
		PATHEXT: string;
		COLORTERM: string;
		ProgramData: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		SystemDrive: string;
		CommonProgramW6432: string;
		OneDrive: string;
		SystemRoot: string;
		LOGONSERVER: string;
		npm_lifecycle_event: string;
		LOCALAPPDATA: string;
		USERDOMAIN: string;
		OS: string;
		PROCESSOR_REVISION: string;
		CommonProgramFiles: string;
		IGCCSVC_DB: string;
		npm_config_user_agent: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		PROCESSOR_LEVEL: string;
		COMPUTERNAME: string;
		Path: string;
		NODE: string;
		VBOX_MSI_INSTALL_PATH: string;
		PROCESSOR_IDENTIFIER: string;
		FPS_BROWSER_USER_PROFILE_STRING: string;
		USERPROFILE: string;
		EFC_13916: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		HOMEDRIVE: string;
		VSCODE_INJECTION: string;
		npm_config_local_prefix: string;
		windir: string;
		npm_execpath: string;
		LANG: string;
		ProgramFiles: string;
		ChocolateyInstall: string;
		TERM_PROGRAM_VERSION: string;
		JAVA_HOME: string;
		npm_package_name: string;
		ProgramW6432: string;
		VSCODE_GIT_IPC_HANDLE: string;
		TMP: string;
		OneDriveConsumer: string;
		npm_package_version: string;
		PSModulePath: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		SESSIONNAME: string;
		CHROME_CRASHPAD_PIPE_NAME: string;
		DriverData: string;
		PUBLIC: string;
		USERDOMAIN_ROAMINGPROFILE: string;
		FPS_BROWSER_APP_PROFILE_STRING: string;
		GIT_ASKPASS: string;
		APPDATA: string;
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
