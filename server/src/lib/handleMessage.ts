import { WebSocket } from '@fastify/websocket';

export async function incomingMessage(msg: Buffer, socket: WebSocket) {
	const text = await msg.toString();

	if (text === 'ping') return socket.send('pong');
}

export function UpdateConnections(
	type: 'newMessage' | 'newAttachment' | 'newChannel' | 'deletedChannel',
	data: any,
) {
	connections.forEach(connection => {
		connection.send(
			JSON.stringify({
				type: type,
				serverURL: process.env.URL,
				data: data,
			}),
		);
	});
}

export let connections: any[] = [];
