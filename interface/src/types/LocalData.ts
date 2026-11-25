import type { RsaIdentity } from './RsaIdentity';

export type LocalData = {
	servers: Server[];
};

export type Server = {
	id: number;
	identityId: string;
	name: string;
	description?: string;
	serverUrl: string;
	iconUrl?: string;
	username: string;
	token: string;
	channels: Channel[];
	identity: RsaIdentity | null;
};

export type Channel = {
	id: string;
	title: string;
	description?: string;
};
