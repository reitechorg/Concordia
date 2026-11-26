import type { KeyObject } from 'crypto';
import type { RsaIdentity } from './RsaIdentity';

declare global {
	interface Window {
		rsa: {
			create: (keyId: string) => string;
			getPublic: (keyId: string) => string;
			sign: (payload: string, keyId: string) => string;
			delete: (keyId: string) => void;
			export: (identities: RsaIdentity[], password: string) => string;
			import: (content: string, password: string) => RsaIdentity[];
		};

		ws: {
			closeAll: () => void;
			connect: (server: string) => WebSocket;
			message: (msg: any) => void;
		};

		dl: {
			open: (link: any) => void;
		};
	}
}
