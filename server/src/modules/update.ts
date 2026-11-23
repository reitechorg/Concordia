import path from 'path';
import fs from 'fs';
import { logInfo, logWarn } from '../lib/logger.js';

const updateHandler = async () => {
	const ServerData = JSON.parse(
		fs.readFileSync(path.join(process.env.FILE_PATH!, 'server', '.serverdata.json')).toString(),
	);
	const today = new Date();
	if (!(today.getTime() > Number.parseInt(ServerData.lastUpdate) + 86400000)) {
		return logInfo(`[Updater] Skipping check for update, last check less than 24 hours ago`);
	}
	// Update last check date
	ServerData.lastUpdate = today.getTime().toString();

	fs.writeFileSync(
		path.join(process.env.FILE_PATH!, 'server', '.serverdata.json'),
		JSON.stringify(ServerData),
	);

	// Get latest release version from GitHub
	const data = await fetch(
		'https://api.github.com/repos/EE-Digital/ConcordiaAPI/releases/latest',
	);
	const json = await data.json();
	const version = json.tag_name.replace('v', '');

	if (version === ServerData.version) return logInfo('[Updater] Server is up to date!');
	logWarn(
		`[Updater] Server update found! New version: ${version}, Currently running ${ServerData.version}`,
	);

	process.env.OUTDATED = 'true'; // TODO add an update script
};

export default updateHandler;
