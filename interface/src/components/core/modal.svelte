<script lang="ts">
	let { children, open = $bindable(false) } = $props();

	const escKeyHandler = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			e.preventDefault();
			open = false;
		}
	};

	const handleBackgroundClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			open = false;
		}
	};
</script>

<svelte:document onkeydown={escKeyHandler} />

{#if open}
	<div onclick={handleBackgroundClick} class="fixed top-0 left-0 w-full h-full overflow-hidden flex flex-col items-center justify-center z-100 bg-opacity-3 bg-[#00000080]">
		<div class="text-white flex flex-col justify-center items-center p-4 rounded-2xl bg-zinc-900 ">
			{@render children()}
		</div>
	</div>
{/if}

<style></style>
