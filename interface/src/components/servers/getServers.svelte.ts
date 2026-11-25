import { getIdentity } from '$lib/identityManagement';
import type { Server } from '../../types/LocalData';

const serverList: { servers: Server[] } = $state({ servers: [] });

async function loadServers() {
	const loadedServers: Server[] = JSON.parse(localStorage.getItem('servers') || '[]');
	loadedServers.forEach(server => {
		server.identity = getIdentity(server.identityId)!;
	});
	serverList.servers = loadedServers;
}

const initServerListStorage = () => {
	loadServers();
	console.log(serverList.servers);

	$effect(() => {
		localStorage.setItem('servers', JSON.stringify(serverList.servers));
	});
};

export { serverList, initServerListStorage };
