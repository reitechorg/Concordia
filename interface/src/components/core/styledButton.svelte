<script lang="ts">
	import Loading from './loading.svelte';

	const { children, loading = false, dangerous = false, ...restProps } = $props();
</script>

{#if !loading}
	<button
		class="{dangerous
			? 'font-bold text-red-500 hover:bg-red-500 hover:text-white'
			: 'hover:bg-(--accent-color)'} flex w-full cursor-pointer items-center justify-between rounded bg-neutral-800 px-2 py-1 text-center transition-all duration-200"
		{...restProps}>{@render children()}</button>
{:else}
	<button class="cursor-not-allowed rounded p-2 text-neutral-400" disabled>
		<Loading size={0.75} /></button>
{/if}
