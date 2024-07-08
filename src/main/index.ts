import { app, BrowserWindow } from 'electron';
import { start, load } from 'adapter-electron/functions';
import isDev from 'electron-is-dev';
import nodePath from 'node:path';

const port = await start();

async function createWindow() {
	// Create the browser window

	const mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,
		webPreferences: {
			preload: nodePath.join(__dirname, '../preload/index.mjs'),
		},
	});

	// Load the local URL for development or the local
	// html file for production
	load(mainWindow, port, undefined);

	if (isDev) mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
