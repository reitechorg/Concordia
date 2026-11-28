import runHTTPServer from './modules/router.js';
import updateHandler from './modules/update.js';
import { loadServerIcon } from './lib/serverIcon.js';
import { logInfo, logWarn } from './lib/logger.js';

if (process.env.DEV) {
	logWarn('Running in DEV mode');
}

// Load icon
loadServerIcon();

// Start API server
runHTTPServer();

// Start update handler
if (
	process.env.AUTO_UPDATE !== 'false' &&
	(process.env.SERVER_UUID === undefined || process.env.SERVER_UUID === null)
) {
	updateHandler();
	setInterval(
		() => {
			updateHandler();
		},
		1000 * 60 * 60 * 25,
	); // 25 hours
}

logInfo('[MAIN] Server started!');
