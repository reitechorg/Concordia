<script lang="ts">
	import { parseMarkdownToHtml } from '$lib/markdown';
	import type { Message as MessageType } from '../../../../core/types/Message';
	import FileDangerIcon from '../icons/FileDangerIcon.svelte';
	import LinkIcon from '../icons/LinkIcon.svelte';

	type Props = {
		message: MessageType;
		hideAuthor?: boolean;
	};

	const { message, hideAuthor = false }: Props = $props();

	const parsedMessage = $derived(parseMarkdownToHtml(message.text as string));

	console.log(message);
</script>

<div class="group relative mx-2 rounded pl-2.5 hover:bg-neutral-900">
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
			<p class="ml-2 text-sm text-neutral-400">
				{new Date(message.createdAt).toDateString() === new Date().toDateString()
					? 'today'
					: new Date(message.createdAt).toLocaleDateString()} at {new Date(
					message.createdAt,
				)
					.toLocaleTimeString()
					.slice(0, 5)}
			</p>
		</div>
	{/if}

	<div class="relative">
		<div class="ml-10 text-neutral-200">
			{@html parsedMessage}
			<div class="absolute top-0.5 left-0 text-sm text-neutral-400 not-group-hover:hidden">
				{new Date(message.createdAt).toLocaleTimeString().slice(0, 5)}
			</div>
		</div>

		<div class="mb-0.5 ml-10 flex flex-col gap-2">
			{#each message.files as file}
				{#if file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp'}
					<img
						src={`${file.url}`}
						class="max-h-80 max-w-80 rounded object-cover"
						alt={file.filename} />
				{:else}
					<div class="flex w-max items-center gap-3 rounded bg-zinc-800 p-1 px-2">
						<div class="h-6 w-6">
							<FileDangerIcon />
						</div>
						<div>
							{file.filename}
						</div>
						<button
							class="flex cursor-pointer items-center gap-2 rounded bg-zinc-900 p-2 px-3 transition-all duration-200 hover:bg-(--accent-color)"
							onclick={() => {
								open(file.url);
							}}>
							Open
							<div class="h-4 w-4">
								<LinkIcon />
							</div>
						</button>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
