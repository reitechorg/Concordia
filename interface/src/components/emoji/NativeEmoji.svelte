<script lang="ts">
	import { emojiFromDecCodepoint, getEmojiSvgFromCodepoint, hexCodepointFromDec, type EmojiMetadata } from "../../lib/emoji";

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

<button class="w-12 h-12 flex justify-center items-center hover:bg-zinc-600 p-1 rounded cursor-pointer" onclick={handleClick}>
	{#await svg}
		{emojiCharacter}
	{:then svgcode}
		{@html svgcode}
	{/await}
</button>
