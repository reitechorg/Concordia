<script lang="ts">
	import { onMount } from "svelte";
	import { serverList } from "../components/servers/getServers.svelte";
	import { goto } from "$app/navigation";
	import { listIdentities } from "$lib/identityManagement";
	import Loading from "../components/core/loading.svelte";

	onMount(() => {
		if (listIdentities().length === 0) return goto("/setup");
		if (serverList.servers.length === 0) return goto("/servers");
		const serverId = serverList.servers[0].id;
		goto(`/servers/${serverId}`);
	});
</script>

<div class="flex flex-col justify-center items-center h-screen">
	<div class="w-30 h-30">
		<img src="/icon.png" alt="logo" />
	</div>
	<div class="mt-2">
		<Loading />
	</div>
</div>

<style>
</style>
