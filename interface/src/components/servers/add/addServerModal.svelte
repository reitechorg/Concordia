<script lang="ts">
	import { autoFocus } from '$lib/use/autoFocus.svelte';
	import { validateUrl } from '$lib/validators';
	import { openJoinServerPage } from '../../../routes/servers/join/joinController.svelte';
	import Modal from '../../core/modal.svelte';
	import StyledButton from '../../core/styledButton.svelte';
	import ChevronRight from '../../icons/ChevronRight.svelte';
	import { serverList } from '../getServers.svelte';

	let { open = $bindable(false) } = $props();
	let serverFound = $state(false);

	let server = $state({
		iconUrl: '',
		name: '',
		description: '',
	});

	let serverUrl = $state('');
	let errorMessage = $state<string | true>(true);
	let loading = $state(false);

	const closeForm = () => {
		serverUrl = '';
		open = false;
		window.location.href = `/servers/${serverId}`;
	};

	const serverId = serverList.servers.length;

	const fetchServerData = async (url: string) => {
		try {
			const serverData = await fetch(`${url}/status`, {
				method: 'GET',
				headers: {
					Accept: '*/*',
				},
				signal: AbortSignal.timeout(2500),
			});

			const data = await serverData.json();
			if (serverData.status !== 200) {
				serverFound = false;
				return;
			} else serverFound = true;

			server.iconUrl = data.iconUrl;
			server.name = data.name;
			server.description = data.description;
		} catch (e) {
			console.error('Server not found at URL:', url);
			serverFound = false;
		}
	};

	const handleSubmit = async () => {
		if (loading) return;

		serverUrl = serverUrl.replace(/\/$/, '');

		errorMessage = validateUrl(serverUrl);
		if (errorMessage !== true) return;

		loading = true;
		try {
			await fetchServerData(serverUrl);
			if (!serverFound) {
				errorMessage = 'Server not found at URL';
				return;
			}
		} catch (e) {
			errorMessage = 'Could not connect to server';
			serverFound = false;
		} finally {
			loading = false;
		}

		if (!serverFound) return;
		openJoinServerPage(serverUrl);
		closeDialog();
	};

	function closeDialog() {
		serverUrl = '';
		open = false;
	}
</script>

<Modal bind:open>
	<div class="mb-2 flex flex-col gap-4">
		<div class="p-2 text-center">
			<h1 class="text-2xl font-bold">Join Server</h1>
			<p class="text-neutral-300">Enter URL of the server you want to join</p>
		</div>
		<form onsubmit={handleSubmit} class="flex flex-col items-center">
			<div class="flex overflow-hidden rounded-xl bg-white">
				<input
					use:autoFocus
					class="px-4 text-black outline-0"
					placeholder="https://ca.example.com/"
					bind:value={serverUrl}
					type="text"
					disabled={loading} />
				<div class="py-2 pr-2">
					<StyledButton type="submit" {loading} title="Create identity">
						<div class="h-4 w-4">
							<ChevronRight />
						</div>
					</StyledButton>
				</div>
			</div>
		</form>

		{#if errorMessage !== true}
			<p class="text-center text-sm text-red-500">{errorMessage}</p>
		{/if}
	</div>
</Modal>

<style></style>
