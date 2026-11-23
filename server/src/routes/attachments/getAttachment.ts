import { FastifyReply, FastifyRequest } from 'fastify';
import fs from 'node:fs';
import db from '../../modules/database.js';
import { logError } from '../../lib/logger.js';

export default async function ApiGetAttachment(req: FastifyRequest, res: FastifyReply) {
	const { fileId } = req.params as { fileId: string };
	try {
		const data = await db.file.findUnique({
			where: {
				id: fileId,
			},
		});

		if (!data) return res.status(404).send('Unable to find file!');

		const file = fs.readFileSync(data.path);
		res.header('Content-Type', data?.mimetype);
		res.send(file);
	} catch (e) {
		logError('Get attachment failed', e);
		return res.status(404).send('Unable to find file!');
	}
}
