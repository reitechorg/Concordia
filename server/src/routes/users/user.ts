import { FastifyReply } from 'fastify';
import { RequestWithUser } from '../../types/RequestWithUser.js';
import sharp from 'sharp';
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
			profileUrl: Buffer.from(
				profileUrl.includes('base64') ? await compressBase64Image(profileUrl) : profileUrl,
			),
		},
	});

	console.log(profileUrl.length);
	console.log((await compressBase64Image(profileUrl)).length);

	const updatedUser = req.user;
	updatedUser.profileUrl = profileUrl.includes('base64')
		? await compressBase64Image(profileUrl)
		: profileUrl;

	return res.send({ status: 200, data: updatedUser });
}

async function compressBase64Image(
	base64: string,
	quality = 75,
	maxWidth = 500,
	maxHeight = 500,
): Promise<string> {
	// Remove data URI prefix if present
	const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, '');

	// Convert Base64 to Buffer
	const imageBuffer = Buffer.from(cleanBase64, 'base64');

	// Compress image
	const compressedBuffer = await sharp(imageBuffer)
		.rotate() // Apply EXIF orientation
		.resize({
			width: 250,
			height: 250,
			fit: 'cover',
			position: 'center',
			withoutEnlargement: true,
		})
		.webp({
			quality,
		})
		.toBuffer();

	// Convert back to Base64
	return `data:image/webp;base64,${compressedBuffer.toString('base64')}`;
}
