<script lang="ts">
	import {
		emojiFromDecCodepoint,
		getEmojiSvgFromCodepoint,
		hexCodepointFromDec,
		type EmojiMetadata,
	} from '../../lib/emoji';

	type Props = {
		emoji: EmojiMetadata;
		onselect: (emoji: string, close: boolean) => void;
	};

	const { emoji, onselect }: Props = $props();

	const codepoint = hexCodepointFromDec(emoji.base);
	const svg = getEmojiSvgFromCodepoint(codepoint);
	const emojiCharacter = emojiFromDecCodepoint(emoji.base);

	function handleClick(e: MouseEvent) {
		onselect(emojiCharacter, !e.shiftKey);
	}
</script>

<button
	class="flex h-8 w-8 cursor-pointer items-center justify-center rounded p-1 hover:bg-zinc-600"
	onclick={handleClick}>
	{#await svg}
		{emojiCharacter}
	{:then svgcode}
		{@html svgcode}
	{/await}
</button>
