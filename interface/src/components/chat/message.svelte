<script lang="ts">
	import { parseMarkdownToHtml } from "$lib/markdown";
	// import { openUrl } from "@tauri-apps/plugin-opener";
	import type { Message as MessageType } from "../../types/Message";

	import IconLink from "~icons/lucide/square-arrow-out-up-right";
	import IconFile from "~icons/lucide/file";

	type Props = {
		message: MessageType;
		hideAuthor?: boolean;
	};

	const { message, hideAuthor = false }: Props = $props();

	const parsedMessage = $derived(parseMarkdownToHtml(message.text as string));
</script>

<div class="mx-2 pl-2.5 rounded hover:bg-neutral-900">
	{#if !hideAuthor}
		<div class="flex items-center mt-3 mb-1">
			{#if message.author.profileUrl}
				<img src={message.author.profileUrl} alt="" />
			{:else}
				<div class="w-8 h-8 rounded flex items-center justify-center font-bold bg-purple-700">
					{message.author.name.slice(0, 2)}
				</div>
			{/if}
			<h1 class="ml-2 font-semibold">{message.author.name}</h1>
		</div>
	{/if}

	<div class="text-neutral-200">{@html parsedMessage}</div>

	<div class="flex flex-col gap-2 mb-1">
		{#each message.files as file}
			{#if file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/webp"}
				<img src={`${file.url}`} class="max-h-80 max-w-80 rounded object-cover" alt={file.filename} />
			{:else}
				<div class="bg-zinc-800 p-3 rounded w-min flex items-center gap-2">
					<IconFile />
					<div>{file.filename}</div>
					<button
						class="p-2 px-3 ml-2 rounded bg-zinc-900 hover:bg-(--accent-color) cursor-pointer flex gap-2 items-center"
						onclick={() => {
							// openUrl(file.url); // TODO: Replace with Electrons API
						}}
					>
						Open
						<IconLink class="text-sm" />
					</button>
				</div>
			{/if}
		{/each}
	</div>
</div>
