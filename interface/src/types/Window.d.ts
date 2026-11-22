import type { KeyObject } from 'crypto';

declare global {
	interface Window {
		rsa: {
			create: (keyId: string) => string;
			getPublic: (keyId: string) => string;
		};
	}
}
