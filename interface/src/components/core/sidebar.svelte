<script lang="ts">
	import Settings from "../settings/settings.svelte";
	import AddServer from "../servers/add/addServer.svelte";
	import { serverList } from "../servers/getServers.svelte";
	import ServerWidget from "../servers/ServerWidget.svelte";
	import UpdateIndicator from "../update/UpdateIndicator.svelte";
</script>

<div class="m-1 p-2 overflow-hidden rounded rounded-l-lg gap-1.5 flex flex-col">
	{#each serverList.servers as server}
		<ServerWidget {server} />
	{/each}
	<UpdateIndicator />
	<AddServer />
	<Settings />
</div>
