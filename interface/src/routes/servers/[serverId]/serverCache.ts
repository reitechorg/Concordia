import { cached } from '$lib/cache';
import { logError } from '$lib/logger';
import type { Server } from '../../../types/LocalData';
export async function getChannels(server: Server) {
	let channels = server.channels;
	try {
		const response = await fetch(`${server.serverUrl}/channels`, {
			headers: {
				Authorization: server.token,
			},
		});
		if (response.status !== 200) {
			console.error('[ERROR] Failed to fetch channel data');
			return [];
		}
		const data = await response.json();
		channels = data;
	} catch (e) {
		logError(`Failed to get channels for ${server.serverUrl}`, e);
		return [];
	}

	return channels;
}

export const getChannelsCached = cached(getChannels, 'channels');
