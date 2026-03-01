<script lang="ts">
	import Loading from "./loading.svelte";

	const { children, loading = false, dangerous = false, ...restProps } = $props();
</script>

{#if !loading}
	<button class="{dangerous ? 'bg-red-500' : 'btn'} p-2 rounded cursor-pointer" {...restProps}>{@render children()}</button>
{:else}
	<button class="p-2 rounded cursor-not-allowed bg-neutral-800 text-neutral-400" disabled> <Loading size={0.75} /></button>
{/if}

<style>
	.btn {
		background-color: var(--accent-color);
	}
</style>
