export type UserDefaults = {
	username: string;
	description: string;
	profilePictureUrl?: string;
};

export type RsaIdentity = {
	id: string;
	user: UserDefaults;
	publicKey: string;
};
