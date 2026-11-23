<script lang="ts">
	import ChatIcon from '../icons/ChatIcon.svelte';

	let { channels, selectChannel, selectedChannel } = $props();
</script>

{#each channels as channel}
	<button
		data-id={channel.id}
		onclick={() => selectChannel(channel.id)}
		style={channel.id === selectedChannel ? 'background-color: #FFFFFF33;' : ''}
		class="my-0.5 flex w-full cursor-pointer gap-1 rounded bg-neutral-950 px-2 py-1 text-start text-sm font-light">
		<ChatIcon />
		<p class="first-letter:uppercase">
			{channel.title}
		</p>
	</button>
{:else}
	<div class="flex flex-col h-full w-full justify-center align-center">
		<h1 class="text-center font-semibold">No channels found</h1>
	</div>
{/each}
