<script lang="ts">
	import { formatBytes } from '$lib/formater';
	import { logInfo } from '$lib/logger';
	import FileIcon from '../icons/FileIcon.svelte';

	type Props = {
		attachment: File;
		remove: () => void;
	};

	const { attachment, remove }: Props = $props();

	let url: string | undefined = undefined;

	$effect(() => {
		if (url) URL.revokeObjectURL(url);
		url = URL.createObjectURL(attachment);

		return () => {
			logInfo(`Revoking ${url}`);
			if (url) URL.revokeObjectURL(url);
		};
	});
</script>

<div class="group flex gap-2 rounded-xl bg-zinc-900 p-2">
	<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
		<!-- Preview -->
		{#if attachment.type.startsWith('image/')}
			<img
				src={URL.createObjectURL(attachment)}
				alt={attachment.name}
				title={attachment.name}
				class="h-full w-full rounded-lg object-cover"
				draggable="false" />
		{:else}
			<div class="h-6 w-6">
				<FileIcon />
			</div>
		{/if}
	</div>
	<div>
		<!-- Metadata -->
		<div
			class="w-30 overflow-hidden text-xs font-semibold text-nowrap overflow-ellipsis"
			title={attachment.name}>
			{attachment.name}
		</div>
		<div class="w-30 text-xs text-neutral-300">{formatBytes(attachment.size)}</div>
	</div>

	<!-- Remove button -->
	<button
		class="invisible flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-zinc-800 group-hover:visible hover:bg-red-400"
		onclick={remove}>
		<svg
			class="h-4 w-4 text-white"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 18L18 6M6 6l12 12"></path>
		</svg>
	</button>
</div>
