<script lang="ts">
	import { goto } from "$app/navigation";
	import { deleteIdentity, getIdentity } from "$lib/identityManagement";
	import StyledButton from "../../../components/core/styledButton.svelte";
	import { serverList } from "../../../components/servers/getServers.svelte";
	import type { RsaIdentity } from "../../../types/RsaIdentity";

	type Props = {
		identity: RsaIdentity;
	};

	let deleted = $state(false);

	const { identity }: Props = $props();
	const serverCount = serverList.servers.filter(server => server.identityId === identity.id).length;

	let loading = $state(false);
	const deleteIdentityHandler = async () => {
		if (serverCount > 0) return;
		if (loading) return;
		loading = true;

		await deleteIdentity(identity.id);
		loading = false;

		deleted = getIdentity(identity.id) === undefined;
	};

</script>

{#if deleted}
	<div class="flex justify-between bg-zinc-900 p-2 rounded">
		<p class="text-neutral-400">Identity deleted</p>
	</div>
{:else}
<div class="flex justify-between bg-zinc-900 p-2 rounded">
	<div>
		<div class="flex">
			<h1 class="font-bold">
				{identity.user.username}
			</h1>
			<p class="text-zinc-300 ml-2">{identity.id}</p>
		</div>
		<p>
			{identity.user.description}
		</p>
		<p class="text-sm text-neutral-400">
			{#if serverCount === 0}
				Not used on this device
			{:else if serverCount === 1}
				1 server on this device
			{:else}
				{serverCount} servers on this device
			{/if}
		</p>
	</div>
	{#if serverCount === 0}
		<StyledButton {loading} dangerous onclick={deleteIdentityHandler}>Delete</StyledButton>
	{:else}
		<p class="text-neutral-400">Can't delete identity with servers</p>
	{/if}
</div>
{/if}

<style>
</style>
