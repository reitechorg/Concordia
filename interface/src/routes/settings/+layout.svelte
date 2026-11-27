<script lang="ts">
	const { children } = $props();
	import SideBar from '../../components/settings/sideBar.svelte';
	import { goto } from '$app/navigation';
	import { popHistory } from '$lib/history';
	import { version } from '$app/environment';
	import ChevronLeft from '../../components/icons/ChevronLeft.svelte';

	const escKeyHandler = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			e.preventDefault();
			exitSettings();
		}
	};

	const exitSettings = () => {
		goto(popHistory() ?? '/');
	};
</script>

<svelte:document onkeydown={escKeyHandler} />

<main>
	<div class="mb-1.5 flex w-full items-center justify-start gap-5 bg-zinc-800 px-4 pt-1 pb-0.5">
		<button class="cursor-pointer" onclick={exitSettings}>
			<div class="h-4 w-4">
				<ChevronLeft />
			</div>
		</button>
		<h1>Settings</h1>
	</div>
	<div class="flex">
		<SideBar />

		<div class="w-full px-4 py-2">
			{@render children()}
		</div>
	</div>

	<div class="absolute bottom-2 w-full text-center text-sm text-zinc-600">v{version}</div>
</main>

<style>
</style>
