<script lang="ts">
	import SendButton from '~icons/lucide/send';
	import type { Server } from '../../types/LocalData';
	import IconFile from '~icons/lucide/file';
	import IconImage from '~icons/lucide/image';
	import IconPool from '~icons/lucide/chart-pie';
	import IconSwords from '~icons/lucide/swords';
	import IconEmoji from '~icons/lucide/smile';
	import EmojiKeyboard from '../emoji/EmojiKeyboard.svelte';
	import Attachment from './attachment.svelte';
	import { logInfo } from '$lib/logger';
	type Props = {
		server: Server;
		channelId: string;
	};

	const { server, channelId }: Props = $props();

	let isEmojiKeyboardVisible = $state(false);
	let message = $state('');
	let inputElement: HTMLInputElement;
	let attachments: File[] = $state([]);

	const sendMessage = async () => {
		message = message.trim();
		if (message.length === 0 && attachments.length === 0) return;
		if (isEmojiKeyboardVisible) isEmojiKeyboardVisible = false;
		const formData = new FormData();

		formData.append('message', message);
		attachments.forEach(file => formData.append('file', file));

		const response = await fetch(`${server.serverUrl}/channels/${channelId}/messages`, {
			method: 'POST',
			headers: {
				authorization: server.token,
			},
			body: formData,
		});

		attachments = [];
		message = '';
		if (response.status != 200) console.error('Failed sending message');
	};

	const enterCheck = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			sendMessage();
		}
	};

	let fileInput: HTMLInputElement;
	const trrigetAttachment = () => {
		fileInput.click();
	};

	const handleAttachment = async (e: any) => {
		const files: File[] = Array.from(e.target.files);
		files.forEach(file => attachments.push(file));
		attachments = attachments; // Trigger reactivity
	};

	let lastCursorPos = 0;
	let lastCursorPosEnd = 0;
	const toggleEmojiKeyboard = () => {
		if (!isEmojiKeyboardVisible) {
			lastCursorPos = inputElement.selectionStart || 0;
			lastCursorPosEnd = inputElement.selectionEnd || 0;
		} else {
			setTimeout(() => {
				inputElement.focus();
				inputElement.setSelectionRange(lastCursorPos, lastCursorPosEnd);
			}, 0);
		}

		isEmojiKeyboardVisible = !isEmojiKeyboardVisible;
	};
	const closeEmojiKeyboard = () => {
		if (isEmojiKeyboardVisible) toggleEmojiKeyboard();
	};
	const insertEmoji = (emoji: string, close: boolean) => {
		const insertSpaceOnEnd =
			lastCursorPos === lastCursorPosEnd && lastCursorPos === message.length;
		if (insertSpaceOnEnd) emoji += ' ';
		message = message.slice(0, lastCursorPos) + emoji + message.slice(lastCursorPosEnd);
		lastCursorPos += emoji.length;
		lastCursorPosEnd = lastCursorPos;

		if (close) closeEmojiKeyboard();
	};
</script>

<div class="relative flex w-full px-1 pr-5">
	<!-- Do not delete, used for getting Attachment -->
	<input
		type="file"
		bind:this={fileInput}
		style="display:none;"
		onchange={handleAttachment}
		multiple />
	<div class="flex w-full flex-col overflow-hidden">
		<!-- Message Box -->
		<div class="flex w-full flex-col rounded-lg bg-zinc-800">
			<!-- Attachment list -->
			{#if attachments.length > 0}
				<div class="flex w-full gap-2 overflow-x-auto px-4 pt-2">
					{#each attachments as attachment}
						<Attachment
							{attachment}
							remove={() => {
								attachments = attachments.filter(file => file !== attachment);
							}} />
					{/each}
				</div>
			{/if}

			<!-- Send message -->
			<div class="flex w-full">
				<input
					onkeypress={enterCheck}
					type="text"
					bind:value={message}
					bind:this={inputElement}
					placeholder="Type a message"
					class="w-full px-4 py-2 text-white outline-0" />
				<button
					onclick={toggleEmojiKeyboard}
					class="flex cursor-pointer flex-col items-center justify-center hover:text-white">
					<IconEmoji />
				</button>
				<button
					onclick={sendMessage}
					class="m-1 flex h-10 w-10 flex-col items-center justify-center rounded bg-zinc-800"
					class:color={message.length > 0 || attachments.length > 0}>
					<SendButton class="cursor-pointer text-white" />
				</button>
			</div>
		</div>

		<!-- Tools -->
		<div class="flex gap-2 px-0 py-2">
			<button
				class="flex cursor-pointer items-center gap-2 rounded-full border-1 border-dashed px-3 py-1 text-xs text-neutral-300 hover:bg-zinc-900 hover:text-white"
				onclick={() => logInfo('TODO')}>
				<IconImage />
				GIF
			</button>
			<button
				class="flex cursor-pointer items-center gap-2 rounded-full border-1 border-dashed px-3 py-1 text-xs text-neutral-300 hover:bg-zinc-900 hover:text-white"
				onclick={() => logInfo('TODO')}>
				<IconPool />
				Poll
			</button>
			<button
				class="flex cursor-pointer items-center gap-2 rounded-full border-1 border-dashed px-3 py-1 text-xs text-neutral-300 hover:bg-zinc-900 hover:text-white"
				onclick={() => logInfo('TODO')}>
				<IconSwords />
				Game
			</button>
			<button
				class="flex cursor-pointer items-center gap-2 rounded-full border-1 border-dashed px-3 py-1 text-xs text-neutral-300 hover:bg-zinc-900 hover:text-white"
				onclick={trrigetAttachment}>
				<IconFile />
				Attachment
			</button>
		</div>
	</div>

	<!-- Emoji Keyboard -->
	{#if isEmojiKeyboardVisible}
		<div class="transfrom absolute -top-1 right-5 h-100 -translate-y-full">
			<EmojiKeyboard onselect={insertEmoji} close={closeEmojiKeyboard} />
		</div>
	{/if}
</div>

<style>
	.color {
		background-color: var(--accent-color);
	}
</style>
