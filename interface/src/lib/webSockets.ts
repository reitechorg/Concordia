import { serverList } from '../components/servers/getServers.svelte';
import {
	activeChannel,
	activeServer,
	deleteChannel,
	pushChannel,
	pushMessage,
} from '../components/store.svelte';
import type { WebsocketMessage } from '../../../core/types/WebsocketMessage';
import { logError, logInfo } from './logger';

export default function initWebSockets() {
	const servers: string[] = [];

	serverList.servers.forEach(server => {
		if (!servers.includes(server.serverUrl)) servers.push(server.serverUrl);
	});

	servers.forEach(serverUrl => {
		const clearUrl = serverUrl.replace('http://', 'ws://').replace('https://', 'wss://');
		createWebsocket(clearUrl);
	});
}

export function createWebsocket(server: string) {
	return window.ws.connect(server);
}

window.ws.message((val: WebsocketMessage) => {
	handleWebsocketMessage(val);
});

const handleWebsocketMessage = async (data: WebsocketMessage) => {
	console.log(data);

	try {
		switch (data.type) {
			case 'newMessage':
				if (activeChannel.channelId === data.data.message.channelId) {
					logInfo('[WS] Got new message');
					pushMessage(data.data.message);
				}
				break;
			case 'newAttachment':
				if (activeChannel.channelId === data.data.message.channelId) {
					logInfo('[WS] Got new message');
					pushMessage(data.data.message);
				}
				break;
			case 'newChannel':
				if (activeServer.serverURL === data.serverURL) {
					logInfo('[WS] Got new channel');
					pushChannel(data.data.channel);
				}
				break;
			case 'deletedChannel':
				if (activeServer.serverURL === data.serverURL) {
					deleteChannel(data.data.channelId);
				}
				break;
		}
	} catch (e) {
		logError('[WS] Got non JSON message', e);
		return;
	}
};
