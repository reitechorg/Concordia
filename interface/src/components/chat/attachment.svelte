<script lang="ts">
	import { formatBytes } from "$lib/formater";
	import IconFile from "~icons/lucide/file";
	import IconTrash from "~icons/lucide/trash";

	type Props = {
		attachment: File;
		remove: () => void;
	};

	const { attachment, remove }: Props = $props();

	let url: string | undefined = undefined;

	$effect(() => {
		console.log("xoxo");
		if (url) URL.revokeObjectURL(url);
		url = URL.createObjectURL(attachment);

		return () => {
			console.log("revoking");
			if (url) URL.revokeObjectURL(url);
		};
	});
</script>

<div class="flex rounded-xl bg-zinc-900 p-2 gap-2 group">
	<div class="w-10 h-10 bg-zinc-800 rounded-lg flex justify-center items-center">
		<!-- Preview -->
		{#if attachment.type.startsWith("image/")}
			<img src={URL.createObjectURL(attachment)} alt={attachment.name} title={attachment.name} class="w-full h-full object-cover rounded-lg" draggable="false" />
		{:else}
			<IconFile class="text-white" />
		{/if}
	</div>
	<div>
		<!-- Metadata -->
		<div class="w-30 text-xs font-semibold text-nowrap overflow-hidden overflow-ellipsis" title={attachment.name}>{attachment.name}</div>
		<div class="w-30 text-xs text-neutral-300">{formatBytes(attachment.size)}</div>
	</div>

	<!-- Remove button -->
	<button class="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-800 hover:bg-red-400 cursor-pointer invisible group-hover:visible" onclick={remove}>
		<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
		</svg>
	</button>
</div>
