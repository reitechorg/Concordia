import { app, BrowserWindow, ipcMain, net, protocol, shell } from 'electron';
import path, { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDev } from './utils/is-dev.js';
import url from 'node:url';
import fs from 'node:fs';
import { RegisterIPC } from './ipc/ipc.js';
import { logWarn } from './utils/logger.js';
import OpenDeeplink from './ipc/deeplink/open.js';
import { initUpdates } from './updates/updater.js';
const PORT = 3000;

function spaPathToFilePath(path: string): string {
	if (path === '' || path === '/') {
		path = '/index.html';
	}

	return join(dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'build', path);
}
let win: BrowserWindow | null;
const appLock = app.requestSingleInstanceLock();

if (!appLock) {
	app.quit(); // Second instance,kill itself
} else {
	app.setAsDefaultProtocolClient('concordia');

	protocol.registerSchemesAsPrivileged([
		{
			scheme: 'app',
			privileges: {
				standard: true,
				bypassCSP: true,
				secure: true,
				supportFetchAPI: true,
				stream: true,
			},
		},
	]);

	app.on('ready', () => {
		protocol.handle('app', request => {
			const protocolPrefix = 'app://concordia.app';

			if (!request.url.startsWith(protocolPrefix)) {
				return net.fetch(url.pathToFileURL(spaPathToFilePath('index.html')).toString());
			}

			const requestedUrl = request.url.slice(protocolPrefix.length);
			let filePath = spaPathToFilePath(requestedUrl);
			if (!fs.existsSync(filePath)) {
				filePath = spaPathToFilePath('/');
			}

			const fileUrl = url.pathToFileURL(filePath).toString();

			return net.fetch(fileUrl);
		});

		win = createWindow();

		initUpdates(win);
	});

	app.on('second-instance', (event, commandLine, workingDirectory) => {
		const deepLink = commandLine.find(arg => arg.startsWith('concordia://'));

		if (deepLink !== undefined && win !== null) OpenDeeplink(deepLink, win);

		if (win) {
			if (win.isMinimized()) {
				win.restore();
			}

			app.focus();
		}
	});

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') {
			app.quit();
		}
	});
}

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		minHeight: 300,
		minWidth: 600,
		webPreferences: {
			nodeIntegration: true,
			preload: join(dirname(fileURLToPath(import.meta.url)), 'preload.js'),
		},
	});

	win.autoHideMenuBar = false;
	win.menuBarVisible = false;

	if (isDev) {
		win.loadURL('http://localhost:1420');
		logWarn('Running in development mode');
	} else {
		win.loadURL('app://concordia.app/');
	}

	RegisterIPC(win);

	win.webContents.setWindowOpenHandler(({ url }) => {
		// Open the URL in the user's default browser
		shell.openExternal(url);
		// Prevent Electron from opening a new internal window
		return { action: 'deny' };
	});

	return win;
};
