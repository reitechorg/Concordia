import { serverList } from '../components/servers/getServers.svelte';
import type { Message as T_Message } from '../types/Message';
import {
	activeChannel,
	messages,
	pushMessage,
} from '../components/store.svelte';
// import WebSocket, { type Message } from "@tauri-apps/plugin-websocket";

// TODO: Electron websocket implementation

export default function initWebSockets() {
	const servers: string[] = [];

	serverList.servers.forEach((server) => {
		if (!servers.includes(server.serverUrl)) servers.push(server.serverUrl);
	});

	servers.forEach((serverUrl) => {
		const clearUrl = serverUrl
			.replace('http://', 'ws://')
			.replace('https://', 'wss://');
		createWebsocket(clearUrl);
	});
}

export async function createWebsocket(server: string) {
	// const ws = await WebSocket.connect(`${server}/ws`);
	// ws.addListener((event: Message) => {
	// 	handleWebsocketMessage(event);
	// });
	// window.addEventListener("beforeunload", () => {
	// 	ws.disconnect();
	// });
	// return ws;
}

type WebsocketMessage = {
	type: string;
	data: newMessage;
};

type newMessage = {
	serverUrl: string;
	message: T_Message;
};

const handleWebsocketMessage = async (event: /* Message */ any) => {
	// if (event.type !== "Text") return console.log("[WS] Got non Text message");
	// try {
	// 	const data: WebsocketMessage = JSON.parse(event.data);
	// 	switch (data.type) {
	// 		case "newMessage":
	// 			if (activeChannel.channelId === data.data.message.channelId) {
	// 				console.log("[WS] Got new message");
	// 				pushMessage(data.data.message);
	// 			}
	// 			break;
	// 		case "newAttachment":
	// 			if (activeChannel.channelId === data.data.message.channelId) {
	// 				console.log("[WS] Got new message");
	// 				pushMessage(data.data.message);
	// 			}
	// 	}
	// } catch (e) {
	// 	console.log("[WS] Got non JSON message");
	// 	return;
	// }
};
