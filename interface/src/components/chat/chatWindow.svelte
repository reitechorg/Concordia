<script lang="ts">
	import { onMount } from "svelte";
	import MessageList from "./messageList.svelte";
	import Message from "./message.svelte";

	const { messages } = $props();

	let messageContainer: HTMLDivElement | null = null;

	onMount(() => {
		setTimeout(() => {
			if (messageContainer && messages.length > 0) {
				messageContainer.scrollTo(0, messageContainer.scrollHeight);
			}
		}, 100);
	});

	$effect(() => {
		if (messageContainer && messages.length > 0) {
			messageContainer.scrollTo(0, messageContainer.scrollHeight);
		}
	});
</script>

<div class="flex flex-col h-full w-full justify-end max-h-screen overflow-auto">
	{#if messages.length === 0}
		<div class="flex flex-col w-full h-full justify-center items-center">
			<p class="text-center text-white text-lg">Empty channel</p>
			<p class="text-neutral-400">Be the first one to send a message!</p>
		</div>
	{/if}
	<div class="overflow-y-auto pb-2" bind:this={messageContainer}>
		<MessageList {messages} />
	</div>
</div>
