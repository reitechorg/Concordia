import apiRequest from '$lib/apiRequest';
import type { Server } from '../../types/LocalData';

export async function deleteChannel(id: string, server: Server) {
	await apiRequest('DELETE', `${server.serverUrl}/channels/${id}`, undefined, server.token);
}
