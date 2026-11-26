import crypto from 'node:crypto';
import storage from '../../utils/storage.js';

export function ImportRSA(content: string, password: string) {
	const data = Buffer.from(content, 'base64');
	const algorithm = 'aes-256-gcm';

	const salt = data.subarray(0, 16);
	const iv = data.subarray(16, 28);
	const authTag = data.subarray(28, 44);
	const encrypted = data.subarray(44);

	const key = crypto.scryptSync(password, salt, 32);

	const decipher = crypto.createDecipheriv(algorithm, key, iv);
	decipher.setAuthTag(authTag);

	// Decrypt
	const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]).toString(
		'utf-8',
	);

	const identities = JSON.parse(decrypted);

	identities.forEach((identity: any) => {
		storage.set(`identity-${identity.id}`, {
			public: identity.public,
			private: identity.private,
		});
	});

	return identities.map((identity: any) => {
		delete identity.private;
		return identity;
	});
}
