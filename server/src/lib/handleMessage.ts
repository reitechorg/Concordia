export async function incomingMessage(msg: Buffer) {
	const text = await msg.toString();
	console.log('Incoming  message:' + text);
}

export let connections: any[] = [];
