<script lang="ts">
	import { goto } from "$app/navigation";

	import type { Server } from "../../types/LocalData";
	import { page } from "$app/state";

	type Props = {
		server: Server;
	};

	const { server }: Props = $props();
	const changeServer = () => {
		goto("/servers/" + server.id);
	};

	const isActive = $derived(page.params.serverId === `${server.id}`);
	const hasNewMessages = false; // TODO
</script>

<button class="cursor-pointer w-10 h-10 flex relative group" onclick={changeServer}>
	<!-- Message indicator -->
	<div class="absolute w-1 h-full top-0 -left-2.5 flex items-center justify-centers">
		<div class={`w-full bg-white rounded-full transition-all ${isActive ? "h-full" : hasNewMessages ? "h-1/3 group-hover:h-2/3" : "h-0 group-hover:h-2/3"}`}></div>
	</div>

	<!-- Identity indicator -->
	<!-- <div class="absolute w-2 h-2 top-1 right-1 bg-white rounded-full"></div> -->

	<!-- Server icon -->
	<div class="w-full h-full">
		{#if server.iconUrl}
			<img src={server.iconUrl} alt={server.name} class="flew w-10 h-10 {isActive ? 'rounded-lg' : 'rounded-xl'} hover:rounded-lg overflow-hidden object-cover transition-all" draggable="false" />
		{:else}
			<div class="flex items-center justify-center bg-teal-500 text-white font-bold {isActive ? 'rounded-lg' : 'rounded-xl'} hover:rounded-lg w-full h-full">
				<p class="text-center">
					{server.name[0]}{server.name[1].toLowerCase()}
				</p>
			</div>
		{/if}
	</div>

	<!-- Server name -->
	<div class="absolute top-1/2 left-10 transform -translate-y-1/2 flex items-center invisible group-hover:visible">
		<div class="w-3 h-3 bg-black transfrom rotate-45 ml-1.5 -mr-2"></div>
		<div class="bg-black px-2 py-1 rounded-md z-10 text-left">
			<div class="text-sm text-white text-nowrap">{server.name}</div>
			<div class="text-xs text-neutral-400 text-nowrap">{server.username}</div>
		</div>
	</div>
</button>

<style>
</style>
