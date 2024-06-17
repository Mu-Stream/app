# adapter-electron

## A sveltekit adapter for Electron Desktop Apps

This is a simple wrapper for the existing `adapter-node` SvelteKit adapter, with the exception that this package exports custom functions to handle the integration and running of the polka server and handler that are built from the node adapter.

You register the adapter in your `svelte.config.js` file just like any other adapter like so:

```js
import adapter from 'adapter-electron';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
```

This adapter requires additional files and configuration to work properly.
An example of a working electron app can be found in the `examples` directory [here](https://github.com/LukeHagar/sveltekit-adapters/tree/main/examples/electron).

This package uses `electron-builder` to build the electron app, and `electron-is-dev` to determine if the app is running in development mode.

This package includes some function exports that are used to start the server and load the local URL for the electron app.  
in your projects main electron file, you will need to import these functions and use them to start the server and load the local URL.

Below is an example of how to use this adapters functions in your main electron file.

```js
import { app, BrowserWindow } from 'electron';
import { start, load } from 'adapter-electron/functions';
import isDev from 'electron-is-dev';
import log from 'electron-log/main';
import nodePath from 'node:path';


const port = await start();

async function createWindow() {
	// Create the browser window

	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: nodePath.join(__dirname, '../preload/index.mjs')
		}
	});

	// Load the local URL for development or the local
	// html file for production
	load(mainWindow, port);

	if (isDev) mainWindow.webContents.openDevTools();
}
```

If you are having issues with this adapter running or building properly, it's most likely related to the `ORIGIN` configured.  
I implented a sort of SHIM that will set the value at runtime to the correct value for the local electron desktop environment.

