<script lang="ts">
	import type { Message as MessageType } from "../../types/Message";
	import Message from "./message.svelte";

	type Props = {
		messages: MessageType[];
	};
	const { messages }: Props = $props();
</script>

{#each messages as message, index}
	<Message {message} hideAuthor={!(index === 0 || message.author.id !== messages[index - 1]?.author.id)} />
{/each}
