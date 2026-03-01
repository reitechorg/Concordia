<script lang="ts">
	const { children } = $props();
	import "@fontsource-variable/funnel-sans";
	import SideBar from "../../components/settings/sideBar.svelte";
	import { goto } from "$app/navigation";
	import ArrowBack from "~icons/lucide/arrow-left";
	import { popHistory } from "$lib/history";

	const escKeyHandler = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			e.preventDefault();
			exitSettings();
		}
	};

	const exitSettings = () => {
		goto(popHistory() ?? "/");
	};
</script>

<svelte:document onkeydown={escKeyHandler} />

<main>
	<div class="w-full bg-zinc-800 flex items-center justify-start gap-5 pt-1 px-4 pb-0.5 mb-1.5">
		<button class="cursor-pointer" onclick={exitSettings}>
			<ArrowBack />
		</button>
		<h1>Settings</h1>
	</div>
	<div class="flex">
		<SideBar />

		<div class="px-4 py-2 w-full">
			{@render children()}
		</div>
	</div>
</main>

<style>
</style>
