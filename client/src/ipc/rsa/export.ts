import crypto from 'node:crypto';
import storage from '../../utils/storage.js';

export function ExportRSA(identities: any[], password: string) {
	const algorithm = 'aes-256-gcm';

	const exportIdentities = identities.map(({ publicKey, ...identity }) => ({
		...identity,
		...(storage.get(`identity-${identity.id}`) as any),
	}));

	const salt = crypto.randomBytes(16);
	const iv = crypto.randomBytes(12);

	const key = crypto.scryptSync(password, salt, 32);

	const cipher = crypto.createCipheriv(algorithm, key, iv);

	const encrypted = Buffer.concat([
		cipher.update(JSON.stringify(exportIdentities)),
		cipher.final(),
	]);

	const authTag = cipher.getAuthTag();

	return Buffer.concat([salt, iv, authTag, encrypted]).toString('base64');
}
