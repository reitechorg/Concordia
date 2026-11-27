// import { check, Update } from "@tauri-apps/plugin-updater";
// import { relaunch } from "@tauri-apps/plugin-process";

// TODO: Replace tauri updater with custom implementation using electron-updater or similar library

export const updateInfo = $state({
	isAvailable: false,
	isDownloading: false,
	currentVersion: '',
	newVersion: '',

	downloaded: 0,
	totalLength: 0,
});

export function registerUpdateCheckerEffect() {
	window.update.available(() => {
		updateInfo.isAvailable = true;
	});
}
export async function installUpdate() {
	window.update.install();
	// await availableUpdate.downloadAndInstall((event) => {
	// 	switch (event.event) {
	// 		case "Started":
	// 			updateInfo.isDownloading = true;
	// 			updateInfo.downloaded = 0;
	// 			updateInfo.totalLength = event.data.contentLength || 0;
	// 			break;
	// 		case "Progress":
	// 			updateInfo.downloaded += event.data.chunkLength;
	// 			break;
	// 		case "Finished":
	// 			updateInfo.downloaded = updateInfo.totalLength;
	// 			updateInfo.isDownloading = false;
	// 			break;
	// 	}
	// });
	// await relaunch();
}
