import { FastifyReply } from 'fastify';
import db from '../../modules/database.js';
import { UpdateConnections } from '../../lib/handleMessage.js';
import { logInfo } from '../../lib/logger.js';
import { RequestWithUser } from '../../types/RequestWithUser.js';
import { Permissions } from '@prisma/enums.js';
import hasPermission from '../../lib/hasPermission.js';

export default async function ApiDeleteChannel(req: RequestWithUser, res: FastifyReply) {
	if (!hasPermission(req.user, Permissions.CHANNEL_CREATE))
		return res.send({ status: 401, message: 'Missing permissions' });

	const { channelId } = req.params as { channelId: string }; // Get id from url

	if (!channelId || channelId.length < 0)
		return res.send({ status: 400, message: 'No id provided' }); // Make sure we got an id

	const { count } = await db.channel.deleteMany({ where: { id: channelId } }); // Delete the channel

	if (count < 1) return res.status(404).send('Channel not found'); // Return 404 if channel not found

	logInfo(`[DeleteChannel] Deleted channel ${channelId}`); // Log the deletion

	UpdateConnections('deletedChannel', { channelId });

	return res.status(200).send('ok');
}
