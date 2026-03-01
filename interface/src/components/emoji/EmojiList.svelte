<script lang="ts">
	// This component exists to improve emoji loading and scrolling performance in the future

	import type { EmojiMetadata } from "../../lib/emoji";
	import NativeEmoji from "./NativeEmoji.svelte";

	type Props = {
		emojis: EmojiMetadata[];
		onselect: (emoji: string, close: boolean) => void;
	};

	const { emojis, onselect }: Props = $props();
</script>

<div class="grid grid-cols-8 w-96">
	{#each emojis as emoji}
		<NativeEmoji {emoji} {onselect} />
	{/each}
</div>
