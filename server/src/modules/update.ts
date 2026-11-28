import path from 'path';
import fs from 'node:fs';
import { logError, logInfo, logWarn } from '../lib/logger.js';
import { Readable } from 'stream';

declare const __APP_VERSION__: string | undefined;

const VERSION = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : 'v0.0.0';

const updateHandler = async () => {
	logInfo(`[Updater] Detected server version ${VERSION}`);

	if (VERSION === 'v0.0.0') return logWarn('[Updater] Dev mode, ignoring updates');

	// const ServerData = JSON.parse(
	// 	fs.readFileSync(path.join(process.env.FILE_PATH!, 'server', '.serverdata.json')).toString(),
	// );
	// const today = new Date();
	// if (!(today.getTime() > Number.parseInt(ServerData.lastUpdate) + 86400000)) {
	// 	return logInfo(`[Updater] Skipping check for update, last check less than 24 hours ago`);
	// }
	// Update last check date
	// ServerData.lastUpdate = today.getTime().toString();

	// fs.writeFileSync(
	// 	path.join(process.env.FILE_PATH!, 'server', '.serverdata.json'),
	// 	JSON.stringify(ServerData),
	// );

	// Get latest release version from GitHub
	const data = await fetch('https://api.github.com/repos/reitechorg/Concordia/releases');

	const json = await data.json();
	const newestVersion = json
		.filter((release: any) => release.tag_name.startsWith('server-'))
		.toSorted((a: any, b: any) => a.tag_name.localeCompare(b.tag_name))
		.reverse()[0];

	const version = newestVersion.tag_name.replace('server-v', '');

	if (version === VERSION) return logInfo('[Updater] Server is up to date!');
	logWarn(`[Updater] Server update found! New version: ${version}, Currently running ${VERSION}`);

	// Update server
	const asset = newestVersion.assets.find((a: any) => a.name === 'concordia-server');

	const response = await fetch(asset.browser_download_url);
	if (!response.ok) logError('Failed downloading update, response not ok');

	const outputPath = process.execPath.replace('concordia-server', 'concordia-server-new');
	const handle = await fs.promises.open(outputPath, 'w');

	try {
		for await (const chunk of Readable.fromWeb(response.body as any)) {
			await handle.write(chunk);
		}
	} catch {
		logError('Failure during download of update file.');
	} finally {
		await handle.close();
		logInfo('Update file downloaded');
	}

	// Replace current executable with new executable
	fs.unlinkSync(process.execPath); // Delete original server
	fs.renameSync(outputPath, process.execPath); // Replace with new one
	process.exit(2); // Exit code 2 - Update
};

export default updateHandler;
