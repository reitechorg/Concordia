import { autoUpdater } from '../../updates/updater.js';

export async function InstallUpdate() {
	autoUpdater.quitAndInstall();
}
