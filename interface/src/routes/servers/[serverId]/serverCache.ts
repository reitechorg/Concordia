import { cached } from "$lib/cache";
import type { Server } from "../../../types/LocalData";
export async function getChannels(server: Server) {
	let channels = server.channels;
	try {
		const response = await fetch(`${server.serverUrl}/channels`, {
			headers: {
				Authorization: server.token,
			},
		});
		if (response.status !== 200) {
			console.error("[ERROR] Failed to fetch channel data");
			return [];
		}
		const data = await response.json();
		channels = data;
	} catch (e) {
		console.log(e);
		return [];
	}

	return channels;
}

export const getChannelsCached = cached(getChannels, "channels");
