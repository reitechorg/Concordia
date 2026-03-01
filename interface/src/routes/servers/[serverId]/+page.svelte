<script lang="ts">
	import type { Server } from "../../../types/LocalData";
	import type { Message } from "../../../types/Message";
	import IconSettings from "~icons/lucide/chevron-down";
	import IconClose from "~icons/lucide/x";

	import { getChannels } from "./serverCache";
	import ChatWindow from "../../../components/chat/chatWindow.svelte";
	import ChannelList from "../../../components/server/channelList.svelte";
	import { goto } from "$app/navigation";
	import { serverList } from "../../../components/servers/getServers.svelte";
	import { page } from "$app/state";
	import MessageBox from "../../../components/chat/messageBox.svelte";
	import { activeChannel, messages } from "../../../components/store.svelte";
	import ServerActions from "./ServerActions.svelte";

	let server: Server | undefined = $state(undefined);
	// let messages: Awaited<Message[]> = $state([]);
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
		if (servers.length === 0) return goto("/servers");

		// Get the selected server
		const selectedServer = servers.find((server) => server.id == serverId) ?? servers[0];
		if (!selectedServer) return goto("/servers");

		// Get the channels
		selectedServer.channels = (await getChannels(selectedServer)) ?? [];

		// Update the state
		server = selectedServer;
		activeChannel.channelId = selectedServer?.channels[0]?.id;

		// If we got a  channel, get the messages
		if (activeChannel.channelId) messages.messages = await getMessages(selectedServer!, activeChannel.channelId);
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
			console.log(newMessages);

			return newMessages;
		} catch (e) {
			console.error(e);
		}
		return [];
	}

	async function selectChannel(channelId: string) {
		if (activeChannel.channelId === channelId) return;

		messages.messages = await getMessages(server!, channelId);
		activeChannel.channelId = channelId;
	}

	function handleKeyboard(e: KeyboardEvent) {
		if (e.code === "Escape") {
			e.preventDefault();

			if (isServerEditOpen) {
				closeServerEdit();
			}
		}
	}
</script>

<svelte:window onkeydown={handleKeyboard} />

{#if server !== undefined}
	<div class="max-w-full flex h-full w-full gap-2">
		<div id="sidebar" class="min-w-40 w-40 flex flex-col py-1">
			<div class="w-full relative">
				<button onclick={toggleServerEdit} class="w-full rounded rounded-tr-lg p-1 outline-0">
					<div class="flex justify-between font-semibold w-full cursor-pointer text-left overflow-ellipsis overflow-hidden overflow">
						{(server as Server).name}
						{#if isServerEditOpen}
							<IconClose class="text-sm mt-0.5" />
						{:else}
							<IconSettings class="text-sm mt-0.5" />
						{/if}
					</div>
					<p class="text-sm text-left max-h-10 overflow-hidden overflow-elipsis text-neutral-500" title={server.description}>
						{server.description}
					</p>
				</button>

				<!-- Server edit menu -->
				{#if isServerEditOpen}
					<ServerActions {closeServerEdit} {server} />
				{/if}
			</div>
			<div class=" w-full h-full overflow-auto mt-1 rounded">
				<ChannelList channels={server!.channels} {selectChannel} selectedChannel={activeChannel.channelId} />
			</div>
			<!-- User card -->
			<div class="w-full h-20 bg-zinc-900 rounded rounded-br-lg mt-1">
				<!-- Will do... one day.$$ -->
			</div>
		</div>
		{#if activeChannel.channelId}
			{#key activeChannel.channelId}
				<div class="flex flex-col w-full pb-2">
					<ChatWindow messages={messages.messages} />
					<MessageBox {server} channelId={activeChannel.channelId} />
				</div>
			{/key}
		{:else}
			<div class="flex flex-col justify-center content-center w-full h-full">
				<h1 class="text-center font-bold">No channels found</h1>
				<h2 class="text-center">Please contact the server administrator if you believe this to be wrong</h2>
			</div>
		{/if}
	</div>
{/if}

<style>
</style>
