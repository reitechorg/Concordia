<script lang="ts">
	import Loading from './loading.svelte';

	const { children, title, loading = false, dangerous = false, ...restProps } = $props();
</script>

{#if !loading}
	<button
		class="
		group
		{dangerous
			? 'font-bold text-red-500  hover:text-white'
			: ''} relative flex w-full cursor-pointer items-center justify-end overflow-hidden rounded text-center transition-all duration-200"
		{...restProps}>
		<div
			class="{dangerous
				? 'group-hover:bg-red-500'
				: 'group-hover:bg-(--hover-color)'} ml-4 h-full w-full px-2 py-1 text-right transition-all duration-200">
			{title}
		</div>
		<div
			class="absolute top-0 bottom-0 left-0 w-7 bg-zinc-950 p-1 {dangerous
				? 'group-hover:text-white'
				: 'group-hover:text-(--accent-color)'} transition-all duration-200">
			{@render children()}
		</div>
	</button>
{:else}
	<button class="cursor-not-allowed rounded p-2 text-neutral-400" disabled>
		<Loading size={0.75} /></button>
{/if}
