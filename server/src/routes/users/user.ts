import { FastifyReply } from 'fastify';
import { RequestWithUser } from '../../types/RequestWithUser.js';
import db from '../../modules/database.js';

export async function ApiUser(req: RequestWithUser, res: FastifyReply) {
	return res.send({ status: 200, data: req.user });
}

interface Body {
	profileUrl: any;
}

export async function ApiUpdateUser(req: RequestWithUser, res: FastifyReply) {
	const { profileUrl } = req.body as Body;
	console.log(typeof req.body);
	console.log(profileUrl);

	if (typeof profileUrl !== 'string') return res.status(400).send('Missing profileUrl');

	await db.user.update({
		where: {
			id: req.user.id,
		},
		data: {
			profileUrl: Buffer.from(profileUrl, 'utf-8'),
		},
	});

	const updatedUser = req.user;
	updatedUser.profileUrl = profileUrl;

	return res.send({ status: 200, data: updatedUser });
}
