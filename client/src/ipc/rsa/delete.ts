import storage from '../../utils/storage.js';
import { logInfo } from '../../utils/logger.js';

export default function DeleteRSAKeys(keyId: string) {
	storage.delete(keyId);
	logInfo(`Deleted identity ${keyId}`);
}
