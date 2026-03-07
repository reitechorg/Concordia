import { app, BrowserWindow, net, protocol } from 'electron';
import path, { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDev } from './utils/is-dev.js';
import url from 'node:url';
import fs from 'node:fs';
const PORT = 3000;

function spaPathToFilePath(path: string): string {
	if (path === '' || path === '/') {
		path = '/index.html';
	}

	return join(dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'build', path);
}

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			preload: join(dirname(fileURLToPath(import.meta.url)), 'preload.js'),
		},
	});

	if (isDev) {
		win.loadURL('http://localhost:1420');
		console.log('Running in development mode');
	} else {
		win.loadURL('app://concordia.app/');
	}

	return win;
};

protocol.registerSchemesAsPrivileged([
	{
		scheme: 'app',
		privileges: {
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
