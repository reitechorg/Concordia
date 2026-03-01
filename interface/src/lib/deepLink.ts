// import { onOpenUrl } from "@tauri-apps/plugin-deep-link";
import { openJoinServerPage } from '../routes/servers/join/joinController.svelte';

export async function initDeeplinks() {
	// TODO: Replace with Electrons API
	// await onOpenUrl((urls) => {
	// 	urls.forEach((url) => {
	// 		handleUrl(url);
	// 	});
	// });
}

function handleUrl(url: string) {
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
