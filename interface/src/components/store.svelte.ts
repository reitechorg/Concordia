// TODO: Replace with electron version

// import { LazyStore } from "@tauri-apps/plugin-store";
import type { Message } from '../types/Message';
// import { LazyStore } from "@tauri-apps/plugin-store";
// import type { Message } from "../types/Message";

// const store = new LazyStore("settings.json", { autoSave: true });

// export type ChannelMessages = {
// 	channelId: string;
// 	messages: Message[];
// };

// export const messages: { messages: ChannelMessages[] } = $state({ messages: [] });

// export const getChannelMessages = async (channelId: string) => {
// 	const storedMessages = (await store.get(channelId)) as Message[];

// 	messages.messages.push({ channelId, messages: storedMessages });

// 	return storedMessages;
// };

// export const addChannelMessage = async (channelId: string, message: Message) => {
// 	const messages: Message[] = (await store.get(channelId)) || [];
// 	messages.push(message);
// 	store.set(channelId, messages);
// 	return messages;
// };

// export const setChannelMessages = async (channelId: string, messages: Message[]) => {
// 	store.set(channelId, messages);
// };

const activeChannel = $state({ channelId: '' });
const messages: { messages: Message[] } = $state({ messages: [] });

function pushMessage(message: Message) {
	messages.messages.push(message);
	messages.messages = messages.messages; // force update
}

export { messages, activeChannel, pushMessage };
