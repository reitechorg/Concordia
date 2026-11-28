import { FastifyReply } from 'fastify';
import db from '../../modules/database.js';
import hasPermission from '../../lib/hasPermission.js';
import { Permissions } from '../../generated/client.js';
import { RequestWithUser } from '../../types/RequestWithUser.js';
import unauthorized from '../../lib/noPermission.js';
import { logInfo } from '../../lib/logger.js';

export default async function ApiUpdateRoles(req: RequestWithUser, res: FastifyReply) {
	if (!hasPermission(req.user!, Permissions.ROLE_UPDATE)) return unauthorized(res);

	const { roleId } = req.params as { roleId: string };
	const { title, permissions } = req.body as {
		title?: string;
		permissions: [];
	};
	if (!roleId || roleId == ':roleId' || !req.body)
		return res.status(400).send('Malformed request');

	try {
		const role = await db.role.update({
			where: {
				title: roleId,
			},
			data: {
				title,
				permissions: {
					deleteMany: {},
					create: permissions,
				},
			},
			include: { permissions: { omit: { roleId: true, channelId: true } } },
		});
		logInfo(`[UpdateRole] Updated role ${role.title}`);

		res.status(200).send(role);
	} catch (e) {
		return res.status(500).send({ error: 'Error updating role' });
	}
}
