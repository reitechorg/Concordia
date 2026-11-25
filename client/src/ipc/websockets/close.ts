import { websockets } from './create.js';

export default function closeAll() {
	let socket = websockets.pop();
	while (socket !== undefined) {
		socket.ws.close();
		socket = websockets.pop();
	}
}
