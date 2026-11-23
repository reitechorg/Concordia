export async function incomingMessage(msg: Buffer) {
	const text = await msg.toString();
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
