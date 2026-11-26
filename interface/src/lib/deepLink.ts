import { openJoinServerPage } from '../routes/servers/join/joinController.svelte';
import { logInfo } from './logger';

export function initDeepLinks() {
	window.dl.open((link: string) => {
		handleUrl(link);
	});
}

export function handleUrl(url: string) {
	logInfo('Trying to open:', url);
	const parsedUrl = new URL(url);

	if (parsedUrl.hostname === 'join') {
		const serverUrl = parsedUrl.searchParams.get('url');
		if (!serverUrl) {
			console.error('No server URL provided in deeplink');
			return;
		}

		openJoinServerPage(serverUrl);
	}
}
