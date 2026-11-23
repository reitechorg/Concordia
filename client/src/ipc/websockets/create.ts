import { BrowserWindow, net } from 'electron';

export default function CreateWebSocket(server: string, win: BrowserWindow) {
	const ws = new net.WebSocket(`${server}/ws`);

	ws.onopen = () => {
		console.log('CREATED WS');
	};

	ws.onclose = () => {
		console.log('CLOSED WS');
	};

	ws.onmessage = (msg: any) => {
		if (msg.data.startsWith('{')) win.webContents.send('ws:message', JSON.parse(msg.data));
	};

	return ws;
}
