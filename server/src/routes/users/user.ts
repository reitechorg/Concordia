import { FastifyReply } from 'fastify';
import { RequestWithUser } from '../../types/RequestWithUser.js';
import { Image } from 'imagescript';
import db from '../../modules/database.js';

export async function ApiUser(req: RequestWithUser, res: FastifyReply) {
	return res.send({ status: 200, data: req.user });
}

interface Body {
	profileUrl: any;
}

export async function ApiUpdateUser(req: RequestWithUser, res: FastifyReply) {
	const { profileUrl } = req.body as Body;
	// console.log(typeof req.body);
	// console.log(profileUrl);

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

	// console.log(profileUrl.length);
	// console.log((await compressBase64Image(profileUrl)).length);

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

	// Decode Base64
	const imageBuffer = Buffer.from(cleanBase64, 'base64');

	// Decode image
	const image = await Image.decode(imageBuffer);

	// Resize and crop to fit
	const targetWidth = Math.min(maxWidth, 250);
	const targetHeight = Math.min(maxHeight, 250);

	const scale = Math.max(targetWidth / image.width, targetHeight / image.height);

	const resizedWidth = Math.round(image.width * scale);
	const resizedHeight = Math.round(image.height * scale);

	image.resize(resizedWidth, resizedHeight);

	// Center crop
	const left = Math.floor((resizedWidth - targetWidth) / 2);
	const top = Math.floor((resizedHeight - targetHeight) / 2);

	const cropped = image.crop(left, top, targetWidth, targetHeight);

	// Encode image
	const compressedBuffer = await cropped.encodeWebP({
		quality: quality,
	});

	return `data:image/webp;base64,${Buffer.from(compressedBuffer).toString('base64')}`;
}
