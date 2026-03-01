<script lang="ts">
	import { onMount } from "svelte";
	import { serverList } from "../../../components/servers/getServers.svelte";
	import ServerCard from "../../../components/settings/ServerCard.svelte";
</script>

<h2 class="text-xl">Manage servers</h2>
<p class="mb-4 text-sm font-light">You can manage your server list here</p>

<div class="flex flex-wrap gap-1.5">
	{#each serverList.servers as server}
		<ServerCard {server} />
	{/each}
</div>
