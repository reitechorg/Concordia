<script lang="ts">
	import { parseMarkdownToHtml } from '$lib/markdown';
	// import { openUrl } from "@tauri-apps/plugin-opener";
	import type { Message as MessageType } from '../../../../core/types/Message';

	import IconLink from '~icons/lucide/square-arrow-out-up-right';
	import IconFile from '~icons/lucide/file';

	type Props = {
		message: MessageType;
		hideAuthor?: boolean;
	};

	const { message, hideAuthor = false }: Props = $props();

	const parsedMessage = $derived(parseMarkdownToHtml(message.text as string));
</script>

<div class="mx-2 rounded pl-2.5 hover:bg-neutral-900">
	{#if !hideAuthor}
		<div class="mt-3 mb-1 flex items-center">
			{#if message.author === null}
				<div
					class="flex h-8 w-8 items-center justify-center rounded bg-purple-700 font-bold">
					De
				</div>
			{:else if message.author!.profileUrl}
				<img src={message.author!.profileUrl} class="h-8 w-8 rounded" alt="" />
			{:else}
				<div
					class="flex h-8 w-8 items-center justify-center rounded bg-purple-700 font-bold">
					{message.author!.name.slice(0, 2)}
				</div>
			{/if}
			<h1 class="ml-2 font-semibold">
				{message.author !== null ? message.author!.name : 'Deleted user'}
			</h1>
		</div>
	{/if}

	<div class="text-neutral-200">{@html parsedMessage}</div>

	<div class="mb-1 flex flex-col gap-2">
		{#each message.files as file}
			{#if file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp'}
				<img
					src={`${file.url}`}
					class="max-h-80 max-w-80 rounded object-cover"
					alt={file.filename} />
			{:else}
				<div class="flex w-min items-center gap-2 rounded bg-zinc-800 p-3">
					<IconFile />
					<div>{file.filename}</div>
					<button
						class="ml-2 flex cursor-pointer items-center gap-2 rounded bg-zinc-900 p-2 px-3 hover:bg-(--accent-color)"
						onclick={() => {
							// openUrl(file.url); // TODO: Replace with Electrons API
						}}>
						Open
						<IconLink class="text-sm" />
					</button>
				</div>
			{/if}
		{/each}
	</div>
</div>
