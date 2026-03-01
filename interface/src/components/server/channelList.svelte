<script lang="ts">
	let { channels, selectChannel, selectedChannel } = $props();
</script>

{#each channels as channel}
	<button onclick={() => selectChannel(channel.id)} style={channel.id === selectedChannel ? "background-color: #FFFFFF33;" : ""} class="cursor-pointer w-full rounded py-1 my-1">
		{channel.title}
	</button>
{:else}
	<div class="flex flex-col h-full w-full justify-center align-center">
		<h1 class="text-center font-semibold">No channels found</h1>
	</div>
{/each}
