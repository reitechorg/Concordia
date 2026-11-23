import { generateKeyPairSync } from 'node:crypto';
import storage from '../../utils/storage.js';

export default function DeleteRSAKeys(keyId: string) {
	storage.delete(keyId);
	console.log(`Deleted identity ${keyId}`);
}
