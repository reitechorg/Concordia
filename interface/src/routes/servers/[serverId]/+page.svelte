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
	import UserCard from '../../../components/core/UserCard.svelte';

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

		// If we got a channel, get the messages
		if (activeChannel.channelId)
			messages.messages = await getMessages(selectedServer!, activeChannel.channelId);
		return 0;
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
	<div class="flex h-full w-full max-w-full">
		<div id="sidebar" class="flex w-50 min-w-50 flex-col bg-zinc-950 px-2">
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

<UserCard />

<style>
</style>
