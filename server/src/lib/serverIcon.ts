import path from 'node:path';
import { Image } from 'imagescript';
import { readFile } from 'node:fs/promises';

let serverIcon: string =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

export async function loadServerIcon() {
	// Try to get server's icon, if failed, generate an icon
	const serverIconPath = path.join(process.env.FILE_PATH ?? '', 'server', 'server-icon.png');
	try {
		const image = await Image.decode(await readFile(serverIconPath));

		// Resize the icon to 256x256
		image.resize(256, 256);

		// Encode as webp
		const iconBuffer = await image.encodeWebP();

		// Set the server's icon
		serverIcon = `data:image/webp;base64,${Buffer.from(iconBuffer).toString('base64')}`;
	} catch (e) {
		generateIconPlaceholder();
		return;
	}
}
async function generateIconPlaceholder() {
	const size = 256;

	const serverName = process.env.SERVER_NAME || 'CC';
	const initials = serverName
		.split(' ')
		.map(word => word[0])
		.join('');

	const text = initials.toUpperCase().slice(0, 2);

	const image = new Image(size, size);

	// Background: #00bba7
	image.fill(0x00bba7ff);

	// Load a TTF font
	// const font = Font.from(await readFile('./assets/font.ttf'));

	const fontSize = size / 2;
	// const textImage = Image.renderText(text, {
	// 	size: fontSize,
	// 	font:
	// });

	// Center text
	// const x = (size - textImage.width) / 2;
	// const y = (size - textImage.height) / 2;

	// image.composite(textImage, x, y);

	const iconBuffer = await image.encodeWebP();

	serverIcon = `data:image/png;base64,${Buffer.from(iconBuffer).toString('base64')}`;
}

export function getServerIcon() {
	return serverIcon;
}
