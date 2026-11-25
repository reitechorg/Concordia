import { BrowserWindow, net } from 'electron';
import { logInfo } from '../../utils/logger.js';

export default function CreateWebSocket(server: string, win: BrowserWindow) {
	const ws = new net.WebSocket(`${server}/ws`);
	logInfo(`Creating WS ${server}/ws`);

	ws.onopen = () => {
		logInfo(`WS connected ${server}/ws`);
	};

	ws.onclose = () => {
		logInfo(`WS closed ${server}/ws`);
	};

	ws.onmessage = (msg: any) => {
		if (msg.data.startsWith('{')) win.webContents.send('ws:message', JSON.parse(msg.data));
	};

	return ws;
}
