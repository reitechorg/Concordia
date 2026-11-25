import { BrowserWindow, net } from 'electron';
import { logError, logInfo } from '../../utils/logger.js';

export var websockets: {
	server: string;
	ws: Electron.WebSocket;
}[] = [];

export default function CreateWebSocket(server: string, win: BrowserWindow) {
	if (websockets.some(x => x.server === server)) return;

	const ws = new net.WebSocket(`${server}/ws`);
	logInfo(`Creating WS ${server}/ws`);

	ws.onopen = () => {
		logInfo(`WS connected ${server}/ws`);
		websockets.push({
			server: server,
			ws: ws,
		});
	};

	ws.onerror = () => {
		logError('WS error');
	};

	ws.onclose = () => {
		logInfo(`WS closed ${server}/ws`);
	};

	ws.onmessage = (msg: any) => {
		if (msg.data.startsWith('{')) win.webContents.send('ws:message', JSON.parse(msg.data));
		else logInfo(msg.data);
	};

	return ws;
}
