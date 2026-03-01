import type { RsaIdentity } from "../types/RsaIdentity";
import apiRequest from "./apiRequest";
import { signWithRsaKey } from "./identityManagement";

enum LoginState {
	LOGIN = "login",
	REGISTER = "register",
	PASSWORD = "password",
}

type LoginData = {
	challenge: string;
	challengeId: string;
};

export default async function loginRSA(identity: RsaIdentity, serverUrl: string) {
	const data = await init(serverUrl, identity.id);

	switch (data.action) {
		case LoginState.LOGIN:
			return await login(serverUrl, identity, data as LoginData);
		case LoginState.REGISTER:
			return await register(serverUrl, identity);
		case LoginState.PASSWORD:
			return "password";
	}
	return null;
}

async function register(serverUrl: string, identity: RsaIdentity) {
	try {
		const data = await apiRequest("POST", `${serverUrl}/auth/register`, {
			publicKey: identity.publicKey,
			cuid: identity.id,
			username: identity.user.username,
			// TODO add profileUrl
		});
		return data;
	} catch (e) {
		console.error(e);
	}
}

async function login(serverUrl: string, identity: RsaIdentity, loginData: LoginData) {
	try {
		const signedChallenge = await signWithRsaKey(loginData.challenge, identity.id);
		const data = await apiRequest("POST", `${serverUrl}/auth/login`, {
			cuid: identity.id,
			challengeId: loginData.challengeId,
			signedChallenge: signedChallenge,
		});
		return data;
	} catch (e) {
		console.error(e);
	}
}

async function init(serverUrl: string, cuid: string) {
	try {
		const data = await apiRequest("POST", `${serverUrl}/auth/init`, { cuid: cuid });
		return data;
	} catch (e) {
		console.error(e);
	}
}
