<script lang="ts">
	import logoutFromServer from "$lib/logoutFromServer";
	import type { Server } from "../../types/LocalData";

	type Props = {
		server: Server;
	};

	const { server }: Props = $props();
</script>

<div class="bg-[#2f2f2f] flex flex-col justify-between items-center rounded-lg p-1.5 px-3 w-38">
	{#if server.iconUrl}
		<img src={server.iconUrl} alt="Server Icon" class="rounded-lg w-20 h-20 object-cover mb-2" />
	{:else}
		<div class="flex items-center justify-center bg-teal-500 text-white font-bold rounded-lg w-20 h-20 mb-2">
			<p class="text-center text-2xl">
				{server.name[0] ?? ""}{server.name[1]?.toLowerCase() ?? ""}
			</p>
		</div>
	{/if}
	<h1 class="font-bold">{server.name}</h1>
	<h2>{server.username}</h2>

	<div class="flex w-full mt-2">
		<button onclick={() => logoutFromServer(server)} class="w-full rounded-lg px-2 py-1 cursor-pointer mx-1 bg-(--background-color) hover:bg-red-500">Remove</button>
	</div>
</div>

<style>
</style>
