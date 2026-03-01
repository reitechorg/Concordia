import { app, BrowserWindow } from 'electron';
import { isDev } from './utils/is-dev.js';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			preload: join(
				dirname(fileURLToPath(import.meta.url)),
				'preload.js',
			),
		},
	});

	if (isDev) {
		win.loadURL('http://localhost:1420');
		console.log('Running in development mode');
	}
};

app.on('ready', () => {
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
