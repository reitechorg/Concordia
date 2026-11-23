import storage from '../../utils/storage.js';
import Crypto from 'node:crypto';

export default function SignWithRSA(payload: string, keyId: string) {
	// Get private key from storage
	const data = storage.get(`identity-${keyId}`);

	// Sign payload
	//@ts-ignore
	const result = Crypto.sign('sha256', payload, data!.private);

	// Return base64 signed payload
	return result.toBase64();
}
