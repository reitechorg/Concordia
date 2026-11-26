<script lang="ts">
	import { goto } from '$app/navigation';

	import type { Server } from '../../types/LocalData';
	import { page } from '$app/state';

	type Props = {
		server: Server;
	};

	const { server }: Props = $props();
	const changeServer = () => {
		goto('/servers/' + server.id);
	};

	const isActive = $derived(page.params.serverId === `${server.id}`);
	const hasNewMessages = false; // TODO
</script>

<button class="group relative flex h-10 w-10 cursor-pointer" onclick={changeServer}>
	<!-- Message indicator -->
	<div class="justify-centers absolute top-0 -left-2.5 flex h-full w-1 items-center">
		<div
			class={`w-full rounded-full bg-white transition-all ${isActive ? 'h-full' : hasNewMessages ? 'h-1/3 group-hover:h-2/3' : 'h-0 group-hover:h-2/3'}`}>
		</div>
	</div>

	<!-- Identity indicator -->
	<div class="absolute right-[-1px] bottom-[-3px] h-4 w-4 overflow-hidden rounded">
		{#if server.identity!.user.profilePictureUrl !== null && server.identity!.user.profilePictureUrl !== undefined}
			<img
				src={server.identity!.user.profilePictureUrl}
				alt="Identity icon"
				class="h-full w-full object-cover" />
		{:else}
			<div
				class="flex h-full w-full items-center justify-center rounded bg-purple-700 text-[0.5rem] font-bold">
				{server.identity!.user.username.slice(0, 2)}
			</div>
		{/if}
	</div>

	<!-- Server icon -->
	<div class="h-full w-full">
		{#if server.iconUrl}
			<img
				src={server.iconUrl}
				alt={server.name}
				class="flew h-10 w-10 {isActive
					? 'rounded-lg'
					: 'rounded-xl'} overflow-hidden object-cover transition-all hover:rounded-lg"
				draggable="false" />
		{:else}
			<div
				class="flex items-center justify-center bg-teal-500 font-bold text-white {isActive
					? 'rounded-lg'
					: 'rounded-xl'} h-full w-full hover:rounded-lg">
				<p class="text-center">
					{server.name[0]}{server.name[1].toLowerCase()}
				</p>
			</div>
		{/if}
	</div>

	<!-- Server name -->
	<div
		class="invisible absolute top-1/2 left-10 flex -translate-y-1/2 transform items-center group-hover:visible">
		<div class="transfrom -mr-2 ml-1.5 h-3 w-3 rotate-45 bg-black"></div>
		<div class="z-10 rounded-md bg-black px-2 py-1 text-left">
			<div class="text-sm text-nowrap text-white">{server.name}</div>
			<div class="text-xs text-nowrap text-neutral-400">{server.username}</div>
		</div>
	</div>
</button>

<style>
</style>
