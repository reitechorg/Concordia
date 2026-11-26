<script lang="ts">
	import { activeServer } from '../store.svelte';
	import { listIdentities } from '$lib/identityManagement';
	import type { Server } from '../../types/LocalData';
	import { serverList } from '../servers/getServers.svelte';

	let user: null | { username: string; description: string; profileUrl: null | string } =
		$state(null);

	$effect(() => {
		updateUser(activeServer.serverId);
	});

	async function updateUser(serverId: number) {
		const server = serverList.servers.find(s => s.id === serverId);
		if (server !== undefined) getIdentity(server);
	}

	async function getIdentity(server: Server) {
		const identities = listIdentities();
		const activeIdentity = identities.find(i => i.id == server.identityId);
		user = {
			username: activeIdentity!.user!.username,
			description: activeIdentity!.user!.description,
			profileUrl: activeIdentity!.user.profilePictureUrl ?? null,
		};
	}
</script>

<!-- User card -->
<div
	class="t-1 absolute bottom-2 left-1 flex h-16 w-full max-w-60 items-center gap-2 rounded rounded-br-lg bg-zinc-900 p-2">
	<div class="h-12 w-12 min-w-12 overflow-hidden rounded">
		{#if user?.profileUrl != null}
			<img src={user.profileUrl} alt="Identity icon" />
		{/if}

		{#if user != null && user?.profileUrl == null}
			<div
				class="flex h-full w-full items-center justify-center rounded bg-purple-700 text-xl font-bold">
				{user.username.slice(0, 2)}
			</div>
		{/if}
	</div>
	<div class="flex min-w-0 flex-col">
		<p class="truncate">{user?.username}</p>
		<p>{user?.description}</p>
	</div>
</div>
