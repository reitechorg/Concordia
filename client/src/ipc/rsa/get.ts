import { generateKeyPairSync } from 'node:crypto';
import storage from '../../utils/storage.js';

export default function GetPublicRSA(keyId: string) {
	// Save pub and private keys
	const data = storage.get(`identity-${keyId}`);
	console.log(data);

	//@ts-ignore
	return data.public;
}
