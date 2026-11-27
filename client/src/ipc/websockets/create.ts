import { BrowserWindow, net } from 'electron';
import { logError, logInfo } from '../../utils/logger.js';

export var websockets: {
	server: string;
	ws: Electron.WebSocket;
}[] = [];

setInterval(() => {
	// Heartbeat
	websockets.forEach(ws => {
		ws.ws.send('ping');
	});
}, 20 * 1000); // Every 20 seconds

var wsErrors: {
	server: string;
	count: number;
}[] = [];

export default function CreateWebSocket(server: string, win: BrowserWindow, token: string) {
	if (websockets.some(x => x.server === server)) return;

	const ws = new net.WebSocket(`${server}/ws`, {
		headers: {
			Authorization: token,
		},
	});
	logInfo(`Creating WS ${server}/ws`);

	ws.onopen = () => {
		logInfo(`WS connected ${server}/ws`);
		websockets.push({
			server: server,
			ws: ws,
		});
		wsErrors = wsErrors.filter(errors => errors.server !== server);
	};

	ws.onerror = () => {
		logError('WS error');
	};

	ws.onclose = (event: CloseEvent) => {
		logInfo(`WS closed ${server}/ws`);
		switch (event.code) {
			case 1006:
				errorHandle(server, win, token);
				break;
		}
	};

	ws.onmessage = (msg: any) => {
		if (msg.data.startsWith('{')) win.webContents.send('ws:message', JSON.parse(msg.data));

		if (msg.data === 'Hello, world!' || msg.data === 'pong') return;

		logInfo(msg.data);
	};

	return ws;
}

function errorHandle(server: string, win: BrowserWindow, token: string) {
	let error = wsErrors.find(ws => ws.server === server);

	if (!error) {
		error = {
			server: server,
			count: 1,
		};
		wsErrors.push(error);
	}

	let retry = 1000 * error.count;
	if (error.count > 5) retry *= 2;

	logError(
		`${server} failed ${error.count} time${error.count > 0 ? 's' : ''}, retrying in ${retry / 1000}s`,
	);

	// Delayed retry
	websockets = websockets.filter(ws => ws.server !== server);
	setTimeout(() => {
		CreateWebSocket(server, win, token);
	}, retry);

	error.count += 1;
}
