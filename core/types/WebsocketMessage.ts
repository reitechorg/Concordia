import type { Message as T_Message } from './Message';

export type WebsocketMessage = {
	type: string;
	data: newMessage;
};

export type newMessage = {
	serverUrl: string;
	message: T_Message;
};
