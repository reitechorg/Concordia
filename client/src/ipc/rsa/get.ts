import storage from '../../utils/storage.js';

export default function GetPublicRSA(keyId: string) {
	// Save pub and private keys
	const data = storage.get(`identity-${keyId}`);

	//@ts-ignore
	return data.public;
}
