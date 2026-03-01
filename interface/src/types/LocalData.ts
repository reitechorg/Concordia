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
};

export type Channel = {
	id: string;
	title: string;
	description?: string;
};
