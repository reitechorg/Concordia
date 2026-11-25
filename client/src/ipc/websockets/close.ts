import { websockets } from './create.js';

export default function closeAll() {
	websockets.forEach(ws => {
		ws.close();
	});
}
