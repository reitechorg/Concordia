import { FastifyReply, FastifyRequest } from 'fastify';
import db from '../../modules/database.js';
import crypto from 'crypto';
import { isCuid } from '@paralleldrive/cuid2';
import { safeUser } from '../../lib/safeData.js';
import { logInfo } from '../../lib/logger.js';

type BodyType = {
	publicKey: string;
	cuid: string;
	username: string;
	profileUrl?: string;
};

export default async function ApiRegister(
	req: FastifyRequest<{ Body: BodyType }>,
	res: FastifyReply,
) {
	const { username, cuid, publicKey, profileUrl } = req.body;

	// Make sure cuid is a valid cuid
	if (!isCuid(cuid)) return res.status(400).send({ message: 'Invalid cuid!' });

	// TODO validate public key

	// Check if user exists
	const user = await db.user.findFirst({
		where: {
			id: cuid,
		},
	});

	if (user) return res.status(400).send({ message: 'User already exists!' });

	// Create new user
	const newUser = await db.user.create({
		data: {
			id: cuid,
			name: username,
			publicKey: publicKey,
			profileUrl,
		},
	});

	// Create a token
	const token = await db.token.create({
		data: {
			userId: newUser.id,
			token: crypto.randomBytes(64).toString('hex'),
		},
	});

	logInfo(`[Register] New user ${newUser.name}`);

	return res.send({ status: 200, token: token.token, user: safeUser(newUser) });
}
