import { FastifyReply } from 'fastify';
import db from '../../modules/database.js';
import { RequestWithUser } from '../../types/RequestWithUser.js';
import { logInfo } from '../../lib/logger.js';

export default async function ApiGetChannels(req: RequestWithUser, res: FastifyReply) {
	const channels = await db.channel.findMany({
		// where: { permissions: { some: { permission: Permissions.CHANNEL_READ, state: PermissionState.ALLOW } } },
		omit: { createdAt: true, updatedAt: true },
	}); // Get all channels

	logInfo(`[GetChannel] User ${req.user!.name} fetched channels`); // Log the fetch

	return res.status(200).send(channels);
}
