<script lang="ts">
	import { goto } from '$app/navigation';
	import { deleteIdentity, getIdentity, setIdentityPicture } from '$lib/identityManagement';
	import StyledButton from '../../../components/core/styledButton.svelte';
	import EditIcon from '../../../components/icons/EditIcon.svelte';
	import { serverList } from '../../../components/servers/getServers.svelte';
	import type { RsaIdentity } from '../../../types/RsaIdentity';

	type Props = {
		identity: RsaIdentity;
	};

	let deleted = $state(false);

	const { identity }: Props = $props();
	const serverCount = serverList.servers.filter(
		server => server.identityId === identity.id,
	).length;

	let loading = $state(false);
	const deleteIdentityHandler = async () => {
		if (serverCount > 0) return;
		if (loading) return;
		loading = true;

		await deleteIdentity(identity.id);
		loading = false;

		deleted = getIdentity(identity.id) === undefined;
	};

	function change(event: any, id: string) {
		const file = event.target.files[0];

		var fileReader = new FileReader();

		fileReader.onload = fileLoadedEvent => {
			setIdentityPicture(id, fileLoadedEvent.target!.result as string);
		};
		fileReader.readAsDataURL(file);

		window.location.reload();
	}
</script>

{#if deleted}
	<div class="flex justify-between rounded bg-zinc-900 p-2">
		<p class="text-neutral-400">Identity deleted</p>
	</div>
{:else}
	<div class="flex justify-between rounded bg-zinc-900 p-2">
		<div class="flex gap-2">
			<div class="relative aspect-square h-20 overflow-hidden rounded">
				<label for={`pfp-${identity.id}`}>
					{#if identity.user.profilePictureUrl != null}
						<img
							src={identity.user.profilePictureUrl}
							class="h-20 w-full object-cover"
							alt="" />
					{:else}
						<div
							class="flex h-full w-full items-center justify-center rounded bg-purple-700 text-4xl font-bold">
							{identity.user.username.slice(0, 2)}
						</div>
					{/if}
				</label>
				<input
					onchange={_e => change(_e, identity.id)}
					id={`pfp-${identity.id}`}
					name={`pfp-${identity.id}`}
					type="file"
					max="1"
					accept="image/*"
					class="hidden" />

				<div
					class="absolute right-1 bottom-1 flex h-6 w-6 flex-col items-center justify-center rounded bg-neutral-800 shadow-sm shadow-black">
					<div class="h-4 w-4">
						<EditIcon />
					</div>
				</div>
			</div>
			<div>
				<div class="flex">
					<h1 class="font-bold">
						{identity.user.username}
					</h1>
					<p class="ml-2 text-zinc-300">{identity.id}</p>
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
		</div>
		<div class="flex flex-col justify-end">
			{#if serverCount === 0}
				<StyledButton {loading} dangerous onclick={deleteIdentityHandler}
					>Delete identity</StyledButton>
			{:else}
				<p class="text-neutral-400">Can't delete identity with servers</p>
			{/if}
		</div>
	</div>
{/if}

<style>
</style>
