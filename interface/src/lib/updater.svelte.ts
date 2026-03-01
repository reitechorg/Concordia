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

// let availableUpdate: Update | null = null;

export function registerUpdateCheckerEffect() {
	$effect(() => {
		checkForUpdates();
		const interval = setInterval(
			() => {
				checkForUpdates();
			},
			1000 * 60 * 10,
		);

		return () => {
			clearInterval(interval);
		};
	});
}

export async function checkForUpdates() {
	if (updateInfo.isDownloading) return;

	// const update = await check();
	// if (!update) {
	// 	availableUpdate = null;
	// 	updateInfo.isAvailable = false;
	// 	return;
	// }

	// availableUpdate = update;
	// updateInfo.isAvailable = availableUpdate.available;
	// updateInfo.currentVersion = availableUpdate.currentVersion;
	// updateInfo.newVersion = availableUpdate.version;
}

export async function installUpdate() {
	// if (!availableUpdate) {
	// 	await checkForUpdates();
	// 	if (!availableUpdate) return;
	// }
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
