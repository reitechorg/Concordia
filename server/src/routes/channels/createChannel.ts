import { FastifyReply } from 'fastify';
import db from '../../modules/database.js';
import { UpdateConnections } from '../../lib/handleMessage.js';
import { logInfo } from '../../lib/logger.js';
import hasPermission from '../../lib/hasPermission.js';
import { Permissions } from '../../generated/client.js';
import { RequestWithUser } from '../../types/RequestWithUser.js';

interface Body {
	title: string;
	description: string;
}

export default async function ApiCreateChannel(req: RequestWithUser, res: FastifyReply) {
	if (!hasPermission(req.user, Permissions.CHANNEL_CREATE))
		return res.send({ status: 401, message: 'Missing permissions' });

	const { title, description } = req.body as Body;

	if (!title || title.length < 0) return res.send({ status: 400, message: 'No title provided' });

	const channel = await db.channel.create({ data: { title: title, description: description } });

	logInfo(`[CreateChannel] New channel ${channel.title}`);

	UpdateConnections('newChannel', { channel });

	return res.send(channel);
}
