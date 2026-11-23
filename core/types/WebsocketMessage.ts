import type { Channel as T_Channel } from '../../interface/src/types/LocalData';
import type { Message as T_Message } from './Message';

export type WebsocketMessage =
	| {
			type: 'newMessage' | 'newAttachment';
			serverURL: string;
			data: newMessage;
	  }
	| {
			type: 'newChannel';
			serverURL: string;
			data: newChannel;
	  }
	| {
			type: 'deletedChannel';
			serverURL: string;
			data: deletedChannel;
	  };

export type newMessage = {
	message: T_Message;
};

export type newChannel = {
	channel: T_Channel;
};

export type deletedChannel = {
	channelId: string;
};
