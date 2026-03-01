<script lang="ts">
	import EmojiList from "./EmojiList.svelte";
	import EmojiOrdering from "./emojiOrdering.json";

	import IconSmile from "~icons/lucide/smile";
	import IconPeople from "~icons/lucide/users";
	import IconAnimals from "~icons/lucide/paw-print";
	import IconFood from "~icons/lucide/apple";
	import IconTravel from "~icons/lucide/plane";
	import IconActivities from "~icons/lucide/bike";
	import IconObjects from "~icons/lucide/box";
	import IconSymbols from "~icons/lucide/asterisk";
	import IconFlag from "~icons/lucide/flag";
	import IconSearch from "~icons/lucide/search";
	import { autoFocus } from "$lib/use/autoFocus.svelte";
	import type { EmojiMetadata } from "$lib/emoji";
	import { clickOutside } from "$lib/use/clickOutside.svelte";

	let activeGroup = $state<number>(0);
	let searchQuery = $state<string>("");
	let scrollContainer: HTMLElement;

	type Props = {
		onselect: (emoji: string, close: boolean) => void;
		close?: () => void;
	};
	let { onselect, close }: Props = $props();

	const groupIcons = [IconSmile, IconPeople, IconAnimals, IconFood, IconTravel, IconActivities, IconObjects, IconSymbols, IconFlag];

	const toggleGroupHandle = (index: number) => () => {
		if (searchQuery.length > 0) searchQuery = "";

		if (activeGroup === index) return;
		scrollContainer.scrollTo({ top: 0 });
		activeGroup = index;
	};

	function handleKeyboard(e: KeyboardEvent) {
		if (e.code === "Escape") {
			e.preventDefault();

			if (searchQuery.length > 0) {
				searchQuery = "";
			} else if (close) {
				close();
			}
		}
	}

	function runSearch(query: string): EmojiMetadata[] {
		const normalized = query.toLowerCase().trim();
		if (normalized.length === 0) return [];

		return EmojiOrdering.flatMap((group) => group.emoji.filter((emoji) => emoji.shortcodes.some((keyword) => keyword.includes(normalized))));
	}

	const searchResults = $derived(runSearch(searchQuery));
</script>

<svelte:window onkeydown={handleKeyboard} />

<div
	class="h-full flex flex-col bg-zinc-800 rounded-2xl overflow-hidden"
	use:clickOutside={() => {
		if (close) close();
	}}
>
	<div class="bg-zinc-900 p-2">
		<div class="bg-zinc-950 rounded-xl flex items-center">
			<input bind:value={searchQuery} placeholder="Search for emoji" class="w-full outline-0 py-2 px-2.5" use:autoFocus />
			<button class="pr-2.5 cursor-pointer">
				<IconSearch />
			</button>
		</div>
	</div>
	<div class="flex bg-zinc-900">
		{#each EmojiOrdering as _, i}
			{@const GroupIcon = groupIcons[i]}
			<button onclick={toggleGroupHandle(i)} class="py-2 w-full cursor-pointer flex justify-center border-b-2 text-lg {activeGroup === i && searchQuery.length === 0 ? 'bg-zinc-700 border-(--accent-color)' : 'text-neutral-400 border-transparent hover:bg-zinc-800 hover:text-neutral-300'}">
				<GroupIcon />
			</button>
		{/each}
	</div>
	<div class="h-full w-full overflow-y-scroll px-2 pb-2" bind:this={scrollContainer}>
		{#if searchQuery.length === 0}
			{#key activeGroup}
				<div class="block">
					<div class="sticky top-0 bg-zinc-800 text-neutral-400 py-1">{EmojiOrdering[activeGroup].group}</div>
					<EmojiList emojis={EmojiOrdering[activeGroup].emoji} {onselect} />
				</div>
			{/key}
		{:else if searchResults.length > 0}
			<div class="block">
				<div class="sticky top-0 bg-zinc-800 text-neutral-400 py-1">Search results</div>
				<EmojiList emojis={searchResults} {onselect} />
			</div>
		{:else}
			<div class="text-neutral-400 w-96 h-full flex flex-col justify-center items-center text-center">
				<div class="text-neutral-300 font-xl font-bold">No emojis found!</div>
				<div>Try searching for something else</div>
			</div>
		{/if}
	</div>
</div>
