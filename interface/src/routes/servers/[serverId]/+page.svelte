<script lang="ts">
	import type { Server } from '../../../types/LocalData';
	import type { Message } from '../../../../../core/types/Message';
	import IconSettings from '~icons/lucide/chevron-down';
	import IconClose from '~icons/lucide/x';
	import { getChannels } from './serverCache';
	import ChatWindow from '../../../components/chat/chatWindow.svelte';
	import ChannelList from '../../../components/server/channelList.svelte';
	import { goto } from '$app/navigation';
	import { serverList } from '../../../components/servers/getServers.svelte';
	import { page } from '$app/state';
	import MessageBox from '../../../components/chat/messageBox.svelte';
	import { activeChannel, channels, messages } from '../../../components/store.svelte';
	import ServerActions from './ServerActions.svelte';
	import ContextMenu from '../../../components/server/channelContextMenu.svelte';
	import { activeServer } from '../../../components/store.svelte';
	import { listIdentities } from '$lib/identityManagement';
	import apiRequest from '$lib/apiRequest';

	// svelte-ignore non_reactive_update
	let contextMenu: any;

	function openContextMenu(event: Event) {
		contextMenu.handleContextMenu(event);
	}

	let server: Server | undefined = $state(undefined);
	let lastParam: number = -1;
	const servers: Server[] = serverList.servers;

	$effect(() => {
		getData(parseInt(page.params.serverId));
	});

	let user: null | { username: string; description: string; profileUrl: null | string } =
		$state(null);

	async function getData(serverId: number) {
		// Prevents infinite loop
		if (lastParam === serverId) return;
		lastParam = serverId;

		// Make sure we have servers
		if (servers.length === 0) return goto('/servers');

		// Get the selected server
		const selectedServer = servers.find(server => server.id == serverId) ?? servers[0];
		if (!selectedServer) return goto('/servers');

		activeServer.serverId = serverId;
		activeServer.serverURL = selectedServer.serverUrl;

		// Get the channels
		selectedServer.channels = (await getChannels(selectedServer)) ?? [];
		channels.channels = selectedServer.channels;

		// Update the state
		server = selectedServer;
		activeChannel.channelId = selectedServer?.channels[0]?.id;

		// Get current identity
		getIdentity(server);

		// If we got a channel, get the messages
		if (activeChannel.channelId)
			messages.messages = await getMessages(selectedServer!, activeChannel.channelId);
		return 0;
	}

	async function getUser(server: Server) {
		const data = await apiRequest('GET', `${server.serverUrl}/user`, null, server.token);
		return data.data.profileUrl;
	}

	async function getIdentity(server: Server) {
		const identities = listIdentities();
		const activeIdentity = identities.find(i => i.id == server.identityId);
		user = {
			username: activeIdentity!.user!.username,
			description: activeIdentity!.user!.username,
			profileUrl: await getUser(server),
		};
	}

	let isServerEditOpen = $state(false);
	function toggleServerEdit() {
		isServerEditOpen = !isServerEditOpen;
		// window.location.href = `/servers/${(server as Server).id}/edit`;
	}

	function closeServerEdit() {
		isServerEditOpen = false;
	}

	async function getMessages(server: Server, channelId: string) {
		try {
			const response = await fetch(`${server!.serverUrl}/channels/${channelId}/messages`, {
				headers: {
					Authorization: server!.token,
				},
			});
			const newMessages: Message[] = await response.json();
			return newMessages;
		} catch (e) {
			console.error(e);
		}
		return [];
	}

	async function selectChannel(channelId: string) {
		if (activeChannel.channelId === channelId && channelId !== 'none') return;
		if (channelId === 'none') channelId = channels.channels[0].id;

		messages.messages = await getMessages(server!, channelId);
		activeChannel.channelId = channelId;
	}

	// Update channel in case of change by channel being deleted
	$effect(() => {
		const channelId = activeChannel.channelId;
		selectChannel(channelId);
	});

	function handleKeyboard(e: KeyboardEvent) {
		if (e.code === 'Escape') {
			e.preventDefault();

			if (isServerEditOpen) {
				closeServerEdit();
			}
		}
	}
</script>

<svelte:window onkeydown={handleKeyboard} />

{#if server !== undefined}
	<div class="flex h-full w-full max-w-full gap-2">
		<div id="sidebar" class="flex w-60 min-w-40 flex-col py-1">
			<div class="relative w-full">
				<button
					onclick={toggleServerEdit}
					class="w-full rounded rounded-tr-lg p-1 outline-0">
					<div
						class="overflow flex w-full cursor-pointer justify-between overflow-hidden text-left font-semibold overflow-ellipsis">
						{(server as Server).name}
						{#if isServerEditOpen}
							<IconClose class="mt-0.5 text-sm" />
						{:else}
							<IconSettings class="mt-0.5 text-sm" />
						{/if}
					</div>
					<p
						class="overflow-elipsis max-h-10 overflow-hidden text-left text-sm text-neutral-500"
						title={server.description}>
						{server.description}
					</p>
				</button>

				<!-- Server edit menu -->
				{#if isServerEditOpen}
					<ServerActions {closeServerEdit} {server} />
				{/if}
			</div>
			<div class="mt-1 h-full w-full overflow-auto rounded" oncontextmenu={openContextMenu}>
				<ContextMenu bind:this={contextMenu} {server} />
				<ChannelList
					channels={channels.channels}
					{selectChannel}
					selectedChannel={activeChannel.channelId} />
			</div>
			<!-- User card -->
			<div
				class="mt-1 flex h-16 w-full items-center gap-2 rounded rounded-br-lg bg-zinc-900 p-2">
				<div class="h-12 w-12 overflow-hidden rounded bg-red-500">
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
				<div class="flex flex-col">
					<p>{user?.username}</p>
					<p>{user?.description}</p>
				</div>
			</div>
		</div>
		{#if activeChannel.channelId}
			{#key activeChannel.channelId}
				<div class="flex w-full flex-col pb-2">
					<ChatWindow messages={messages.messages} />
					<MessageBox {server} channelId={activeChannel.channelId} />
				</div>
			{/key}
		{:else}
			<div class="flex h-full w-full flex-col content-center justify-center">
				<h1 class="text-center font-bold">No channels found</h1>
				<h2 class="text-center">
					Please contact the server administrator if you believe this to be wrong
				</h2>
			</div>
		{/if}
	</div>
{/if}

<style>
</style>
