import apiRequest from '$lib/apiRequest';
import type { Server } from '../../types/LocalData';

export async function createChannel(name: string, description: string, server: Server) {
	await apiRequest(
		'POST',
		`${server.serverUrl}/channels`,
		{
			title: name,
			description: description,
		},
		server.token,
	);
}
