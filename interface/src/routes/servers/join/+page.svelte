<script lang="ts">
	import { goto } from "$app/navigation";
	import { getIdentity, listIdentities } from "$lib/identityManagement";
	import loginRSA from "$lib/loginRSA";
	import { createWebsocket } from "$lib/webSockets";
	import { serverList } from "../../../components/servers/getServers.svelte";
	import { joinData } from "./joinController.svelte";

	const identities = listIdentities();

	if (identities.length === 0) {
		goto("/");
	}

	if (!joinData.url) {
		goto("/", {
			replaceState: true,
		});
	}

	let selectedIdentity = $state(identities[0].id);

	const join = async () => {
		const identity = getIdentity(selectedIdentity);
		if (!identity) return;
		const result = await loginRSA(identity, joinData.url!);

		const serverId = serverList.servers.reduce((max, server) => (server.id > max ? server.id : max), 0) + 1;

		const server = {
			id: serverId,
			identityId: identity.id,
			name: joinData.serverStatus?.name ?? "",
			description: joinData.serverStatus?.description ?? "",
			iconUrl: joinData.serverStatus?.iconUrl ?? "",
			serverUrl: joinData.url!,
			username: result.user.name,
			token: result.token,
			channels: result.channels ?? [],
		};

		serverList.servers.push(server);

		const clearUrl = server.serverUrl.replace("http://", "ws://").replace("https://", "wss://");

		createWebsocket(clearUrl);

		// Redirect to the server
		goto(`/servers/${serverId}`, {
			replaceState: true,
		});
	};
</script>

<div class="background">
	<main class="container">
		<div class="server">
			{#if joinData.serverStatus?.iconUrl}
				<img class="icon" src={joinData.serverStatus?.iconUrl ?? ""} alt={joinData.serverStatus?.name ?? ""} />
			{:else}
				<div class="icon flex items-center justify-center bg-teal-500 text-white font-bold rounded w-full h-full">
					<p class="text-center text-4xl">
						{joinData.serverStatus!.name[0]}{joinData.serverStatus!.name[1].toLowerCase()}
					</p>
				</div>
			{/if}
			<div class="info">
				<div class="info__welcome">You are welcome to join</div>
				<h1 class="text-2xl font-bold m-0">{joinData.serverStatus?.name ?? ""}</h1>
				<p class="info__desciption">{joinData.serverStatus?.description ?? ""}</p>
			</div>
		</div>
		{#if identities.length === 1}
			<button class="join-btn" onclick={join}>
				Join
				{joinData.serverStatus?.name ?? ""}
			</button>
		{/if}
		{#if identities.length > 1}
			<div class="flex gap-2">
				{#each identities as identity}
					<button
						onclick={() => {
							selectedIdentity = identity.id;
						}}
						class="cursor-pointer rounded p-2 flex flex-col items-center w-35 bg-zinc-800"
						class:color={identity.id === selectedIdentity}
					>
						<div class="mb-2">
							{#if identity.user.profilePictureUrl}
								<img src={identity.user.profilePictureUrl} alt={identity.user.username} />
							{:else}
								<div class="bg-violet-400 rounded w-20 h-20 justify-center items-center flex text-2xl font-bold">
									{identity.user.username[0] ?? ""}{identity.user.username[1]?.toLowerCase() ?? ""}
								</div>
							{/if}
						</div>
						<h1 class="font-semibold">{identity.user.username}</h1>
						<p class="text-center">{identity.user.description}</p>
					</button>
				{/each}
			</div>
			<button class="join-btn" onclick={join}>
				Join
				<b>{joinData.serverStatus?.name ?? ""}</b>
				as
				<b>{identities.find((identity) => identity.id === selectedIdentity)?.user.username}</b>
			</button>
		{/if}
		<div class="download">
			This server is not hosted by Concordia.
			<br />
			Content and moderation are managed by the server owner.
		</div>
	</main>
</div>

<style>
	.background {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100%;
		background: linear-gradient(315deg, #654ea3, #eaafc8);
	}

	.container {
		background-color: #0f0f0f;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border-radius: 1rem;
		max-width: 90%;
		min-width: fit-content;
		padding: 1.5rem;
	}

	.icon {
		width: 7rem;
		height: 7rem;
		border-radius: 0.5rem;
		object-fit: cover;
	}

	.info__welcome {
		font-size: 1rem;
		font-weight: 300;
		opacity: 0.9;
	}

	.info__desciption {
		font-size: 1rem;
		font-weight: 300;
		opacity: 0.8;
		margin: 0.5rem 0;
	}

	.color {
		background-color: #654ea3;
	}

	.join-btn {
		background-color: #654ea3;
		color: white;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		font: inherit;
		padding: 0.5rem 0.75rem;
		width: 100%;
	}

	.server {
		display: flex;
		gap: 1rem;
	}

	.download {
		font-size: 0.8rem;
		opacity: 0.7;
	}

	.join-btn:hover {
		background-color: #5c4397;
	}
</style>
