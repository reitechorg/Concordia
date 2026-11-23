import { generateKeyPairSync } from 'node:crypto';
import storage from '../../utils/storage.js';
import { logInfo } from '../../utils/logger.js';

export default function CreateRSAKeys(keyId: string) {
	const { publicKey, privateKey } = generateKeyPairSync('rsa', {
		modulusLength: 2048,
	});

	const publicKeyString = publicKey.export({
		type: 'pkcs1',
		format: 'pem',
	});

	const privateKeyString = privateKey.export({
		type: 'pkcs1',
		format: 'pem',
	});

	// Save pub and private keys
	storage.set(`identity-${keyId}`, {
		public: publicKeyString,
		private: privateKeyString,
	});

	logInfo(`Saved new identity ${keyId}`);

	return publicKeyString;
}
