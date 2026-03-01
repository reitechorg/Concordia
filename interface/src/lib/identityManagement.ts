import { createId } from '@paralleldrive/cuid2';
// import { invoke } from "@tauri-apps/api/core";
import type { RsaIdentity, UserDefaults } from '../types/RsaIdentity';

// RSA key fuctions
const generateRsaKeyPair = async (keyId: string) => {
	throw new Error('Not implemented'); // TODO: Replace with Electrons API
	// const result = await invoke<string>("create_rsa_keys", { keyId });
	// return result;
};

export const signWithRsaKey = async (payload: string, keyId: string) => {
	throw new Error('Not implemented'); // TODO: Replace with Electrons API
	// const result = await invoke<string>('sign_with_rsa', {
	// 	payload,
	// 	keyId,
	// });
	// return result;
};

const getPublicRsaKey = async (keyId: string) => {
	throw new Error('Not implemented'); // TODO: Replace with Electrons API
	// const result = await invoke<string>('get_public_rsa_key', { keyId });
	// return result;
};

const deleteRsaKeyPair = async (keyId: string) => {
	throw new Error('Not implemented'); // TODO: Replace with Electrons API
	// await invoke('delete_rsa_key', { keyId });
};

const listRsaKeyIds = async () => {
	throw new Error('Not implemented'); // TODO: Replace with Electrons API
	// const result = await invoke<string[]>('list_rsa_keys');
};

// Identity functions

function saveIdentities(identities: RsaIdentity[]) {
	localStorage.setItem('identities', JSON.stringify(identities));
}

export function listIdentities() {
	try {
		const dataFromStorage = localStorage.getItem('identities') || '[]';
		const identities: RsaIdentity[] = JSON.parse(dataFromStorage);
		return identities;
	} catch (e) {
		console.error(e);
		return [];
	}
}

export function getIdentity(identityId: string) {
	const identities = listIdentities();
	const identity = identities.find((identity) => identity.id === identityId);
	return identity;
}

export async function deleteIdentity(identityId: string) {
	const identities = listIdentities();
	const newIdentities = identities.filter(
		(identity) => identity.id !== identityId,
	);
	saveIdentities(newIdentities);
	await deleteRsaKeyPair(identityId);
}

export async function createIdentity(defaultUserProperties: UserDefaults) {
	const identityId = createId();
	const publicKey = await generateRsaKeyPair(identityId);
	const identity = {
		id: identityId,
		user: defaultUserProperties,
		publicKey,
	};

	const identities = listIdentities();
	identities.push(identity);
	saveIdentities(identities);
	return identity;
}
