import apiRequest from '$lib/apiRequest';
import { logError, logInfo } from '$lib/logger';
import type { Server } from '../../types/LocalData';

export async function sendPfpUpdate(server: Server) {
	const pfp = server.identity?.user.profilePictureUrl;

	const result = await apiRequest(
		'POST',
		`${server.serverUrl}/user`,
		{ profileUrl: pfp },
		server.token,
	);

	if (result.status !== 200) {
		logError(result);
		return;
	}

	logInfo(`Sucesfully updated pfp at ${server.serverUrl}`);
	return;
}
