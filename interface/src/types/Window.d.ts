import type { KeyObject } from 'crypto';

declare global {
	interface Window {
		rsa: {
			create: (keyId: string) => string;
			getPublic: (keyId: string) => string;
			sign: (payload: string, keyId: string) => string;
			delete: (keyId: string) => void;
		};

		ws: {
			connect: (server: string) => WebSocket;
			message: (msg: any) => void;
		};
	}
}
