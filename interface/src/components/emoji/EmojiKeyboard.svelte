<script lang="ts">
	import EmojiList from './EmojiList.svelte';
	import EmojiOrdering from './emojiOrdering.json';
	import { autoFocus } from '$lib/use/autoFocus.svelte';
	import type { EmojiMetadata } from '$lib/emoji';
	import { clickOutside } from '$lib/use/clickOutside.svelte';
	import SearchIcon from '../icons/emoji/SearchIcon.svelte';
	import SmileIcon from '../icons/emoji/SmileIcon.svelte';
	import PeopleIcon from '../icons/emoji/PeopleIcon.svelte';
	import PawIcon from '../icons/emoji/PawIcon.svelte';
	import FoodIcon from '../icons/emoji/FoodIcon.svelte';
	import TravelIcon from '../icons/emoji/TravelIcon.svelte';
	import ActivitiesIcon from '../icons/emoji/ActivitiesIcon.svelte';
	import ObjectsIcon from '../icons/emoji/ObjectsIcon.svelte';
	import SymbolsIcon from '../icons/emoji/SymbolsIcon.svelte';
	import FlagIcon from '../icons/emoji/FlagIcon.svelte';

	let activeGroup = $state<number>(0);
	let searchQuery = $state<string>('');
	let scrollContainer: HTMLElement;

	type Props = {
		onselect: (emoji: string, close: boolean) => void;
		close?: () => void;
	};
	let { onselect, close }: Props = $props();

	const groupIcons = [
		SmileIcon,
		PeopleIcon,
		PawIcon,
		FoodIcon,
		TravelIcon,
		ActivitiesIcon,
		ObjectsIcon,
		SymbolsIcon,
		FlagIcon,
	];

	const toggleGroupHandle = (index: number) => () => {
		if (searchQuery.length > 0) searchQuery = '';

		if (activeGroup === index) return;
		scrollContainer.scrollTo({ top: 0 });
		activeGroup = index;
	};

	function handleKeyboard(e: KeyboardEvent) {
		if (e.code === 'Escape') {
			e.preventDefault();

			if (searchQuery.length > 0) {
				searchQuery = '';
			} else if (close) {
				close();
			}
		}
	}

	function runSearch(query: string): EmojiMetadata[] {
		const normalized = query.toLowerCase().trim();
		if (normalized.length === 0) return [];

		return EmojiOrdering.flatMap(group =>
			group.emoji.filter(emoji =>
				emoji.shortcodes.some(keyword => keyword.includes(normalized)),
			),
		);
	}

	const searchResults = $derived(runSearch(searchQuery));
</script>

<svelte:window onkeydown={handleKeyboard} />

<div
	class="flex h-full flex-col overflow-hidden rounded-2xl bg-zinc-800"
	use:clickOutside={() => {
		if (close) close();
	}}>
	<div class="bg-zinc-900 p-2">
		<div class="flex items-center rounded-xl bg-zinc-950">
			<input
				bind:value={searchQuery}
				placeholder="Search for emoji"
				class="w-full px-2.5 py-2 outline-0"
				use:autoFocus />
			<button class="cursor-pointer pr-2.5">
				<div class="h-5 w-5">
					<SearchIcon />
				</div>
			</button>
		</div>
	</div>
	<div class="flex bg-zinc-900">
		{#each EmojiOrdering as _, i}
			{@const GroupIcon = groupIcons[i]}
			<button
				onclick={toggleGroupHandle(i)}
				class="flex w-full cursor-pointer justify-center border-b-2 py-2 text-lg {activeGroup ===
					i && searchQuery.length === 0
					? 'border-(--accent-color) bg-zinc-700'
					: 'border-transparent text-neutral-400 hover:bg-zinc-800 hover:text-neutral-300'}">
				<div class="h-6 w-6">
					<GroupIcon />
				</div>
			</button>
		{/each}
	</div>
	<div class="h-full w-full overflow-y-scroll px-2 pb-2" bind:this={scrollContainer}>
		{#if searchQuery.length === 0}
			{#key activeGroup}
				<div class="block">
					<div class="sticky top-0 bg-zinc-800 py-1 text-neutral-400">
						{EmojiOrdering[activeGroup].group}
					</div>
					<EmojiList emojis={EmojiOrdering[activeGroup].emoji} {onselect} />
				</div>
			{/key}
		{:else if searchResults.length > 0}
			<div class="block">
				<div class="sticky top-0 bg-zinc-800 py-1 text-neutral-400">Search results</div>
				<EmojiList emojis={searchResults} {onselect} />
			</div>
		{:else}
			<div
				class="flex h-full w-full flex-col items-center justify-center text-center text-neutral-400">
				<div class="font-xl font-bold text-neutral-300">No emojis found!</div>
				<div>Try searching for something else</div>
			</div>
		{/if}
	</div>
</div>
