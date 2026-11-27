import electronUpdater, { type AppUpdater } from 'electron-updater';
import { logInfo } from '../utils/logger.js';
import type { BrowserWindow } from 'electron';

export function getAutoUpdater(): AppUpdater {
	// Using destructuring to access autoUpdater due to the CommonJS module of 'electron-updater'.
	// It is a workaround for ESM compatibility issues, see https://github.com/electron-userland/electron-builder/issues/7976.
	const { autoUpdater } = electronUpdater;
	return autoUpdater;
}

export const autoUpdater = getAutoUpdater();

export function initUpdates(win: BrowserWindow) {
	logInfo('Init updates...');

	autoUpdater.on('checking-for-update', () => {
		logInfo('Checking for update...');
	});
	autoUpdater.on('update-available', info => {
		logInfo('New update available', info);
		win.webContents.send('update:available');
	});

	autoUpdater.on('update-downloaded', () => {
		autoUpdater.quitAndInstall();
	});

	autoUpdater.checkForUpdates();
}
