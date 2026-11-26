import { createId } from '@paralleldrive/cuid2';
import type { RsaIdentity, UserDefaults } from '../types/RsaIdentity';

// RSA key fuctions
const generateRsaKeyPair = async (keyId: string) => {
	return window.rsa.create(keyId);
};

export const signWithRsaKey = async (payload: string, keyId: string) => {
	return window.rsa.sign(payload, keyId);
};

const getPublicRsaKey = async (keyId: string) => {
	return window.rsa.getPublic(keyId);
};

const deleteRsaKeyPair = async (keyId: string) => {
	return window.rsa.delete(keyId);
};

const listRsaKeyIds = async () => {
	throw new Error('Not implemented'); // TODO: Replace with Electrons API
	// const result = await invoke<string[]>('list_rsa_keys');
};

// Identity functions
export function saveIdentities(identities: RsaIdentity[]) {
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
	console.log(identities);

	const identity = identities.find(identity => identity.id === identityId);
	return identity;
}

export async function deleteIdentity(identityId: string) {
	const identities = listIdentities();
	const newIdentities = identities.filter(identity => identity.id !== identityId);
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

export async function setIdentityPicture(identityId: string, newPfp: string) {
	const identities = listIdentities();
	const index = identities.findIndex(identity => identity.id == identityId);
	if (index == -1) return;
	identities[index].user.profilePictureUrl = newPfp;
	saveIdentities(identities);
}
