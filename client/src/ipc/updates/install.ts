import { autoUpdater } from '../../updates/updater.js';

export async function InstallUpdate() {
	await autoUpdater.downloadUpdate();
}
