<script lang="ts">
	import { autoFocus } from "$lib/use/autoFocus.svelte";
	import { validateUrl } from "$lib/validators";
	import { openJoinServerPage } from "../../../routes/servers/join/joinController.svelte";
	import Modal from "../../core/modal.svelte";
	import StyledButton from "../../core/styledButton.svelte";
	import { serverList } from "../getServers.svelte";
	import IconRight from "~icons/lucide/chevron-right";

	let { open = $bindable(false) } = $props();
	let serverFound = $state(false);

	let server = $state({
		iconUrl: "",
		name: "",
		description: "",
	});

	let serverUrl = $state("");
	let errorMessage = $state<string | true>(true);
	let loading = $state(false);

	const closeForm = () => {
		serverUrl = "";
		open = false;
		window.location.href = `/servers/${serverId}`;
	};

	const serverId = serverList.servers.length;

	const fetchServerData = async (url: string) => {
		try {
			const serverData = await fetch(`${url}/status`, {
				method: "GET",
				headers: {
					Accept: "*/*",
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
			console.error("Server not found at URL:", url);
			serverFound = false;
		}
	};

	const handleSubmit = async () => {
		if (loading) return;

		serverUrl = serverUrl.replace(/\/$/, "");

		errorMessage = validateUrl(serverUrl);
		if (errorMessage !== true) return;

		loading = true;
		try {
			await fetchServerData(serverUrl);
			if (!serverFound) {
				errorMessage = "Server not found at URL";
				return;
			}
		} catch (e) {
			errorMessage = "Could not connect to server";
			serverFound = false;
		} finally {
			loading = false;
		}

		if (!serverFound) return;
		openJoinServerPage(serverUrl);
		closeDialog();
	};

	function closeDialog() {
		serverUrl = "";
		open = false;
	}
</script>

<Modal bind:open>
	<div class="flex flex-col gap-4 mb-2">
		<div class="text-center p-2">
			<h1 class="text-2xl font-bold">Join Server</h1>
			<p class="text-neutral-300">Enter URL of the server you want to join</p>
		</div>
		<form onsubmit={handleSubmit} class="flex flex-col items-center">
			<div class="bg-white rounded-xl flex overflow-hidden">
				<input use:autoFocus class="px-4 text-black outline-0" placeholder="https://ca.example.com/" bind:value={serverUrl} type="text" disabled={loading} />
				<div class="pr-2 py-2">
					<StyledButton type="submit" {loading} title="Create identity">
						<IconRight />
					</StyledButton>
				</div>
			</div>
		</form>

		{#if errorMessage !== true}
			<p class="text-red-500 text-sm text-center">{errorMessage}</p>
		{/if}
	</div>
</Modal>

<style></style>
