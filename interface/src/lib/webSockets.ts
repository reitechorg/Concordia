import { serverList } from '../components/servers/getServers.svelte';
import { activeChannel, messages, pushMessage } from '../components/store.svelte';
import type { WebsocketMessage } from '../../../core/types/WebsocketMessage';

export default function initWebSockets() {
	console.log('INIT WS');

	const servers: string[] = [];

	serverList.servers.forEach(server => {
		if (!servers.includes(server.serverUrl)) servers.push(server.serverUrl);
	});

	servers.forEach(serverUrl => {
		const clearUrl = serverUrl.replace('http://', 'ws://').replace('https://', 'wss://');
		createWebsocket(clearUrl);
	});
}

export async function createWebsocket(server: string) {
	console.log('Creating WS');

	const ws = window.ws.connect(server);
	return ws;
}

window.ws.message((val: WebsocketMessage) => {
	handleWebsocketMessage(val);
});

const handleWebsocketMessage = async (data: WebsocketMessage) => {
	console.log(data);

	try {
		switch (data.type) {
			case 'newMessage':
				console.log('message');

				if (activeChannel.channelId === data.data.message.channelId) {
					console.log('[WS] Got new message');
					pushMessage(data.data.message);
				}
				break;
			case 'newAttachment':
				if (activeChannel.channelId === data.data.message.channelId) {
					console.log('[WS] Got new message');
					pushMessage(data.data.message);
				}
		}
	} catch (e) {
		console.log('[WS] Got non JSON message');
		return;
	}
};
