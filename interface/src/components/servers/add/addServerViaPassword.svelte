<script lang="ts">
	import apiRequest from "$lib/apiRequest";
	import { debounce } from "$lib/debounce";
	import Modal from "../../core/modal.svelte";
	import { serverList } from "../getServers.svelte";

	let { open = $bindable(false) } = $props();
	let serverFound = $state(false);

	let server = $state({
		iconUrl: "",
		name: "",
		description: "",
	});

	let formData = $state({
		serverURL: "",
		username: "",
		password: "",
	});

	const closeForm = () => {
		formData.username = "";
		formData.password = "";
		formData.serverURL = "";
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

	const fetchServerDataDebounce = debounce(fetchServerData, 300);

	$effect(() => {
		if (formData.serverURL.length > 7 && (formData.serverURL.startsWith("https://") || formData.serverURL.startsWith("http://"))) fetchServerDataDebounce(formData.serverURL);
	});

	const handleLogin = async () => {
		if (!serverFound) return;

		const data = await apiRequest("POST", `${formData.serverURL}/login`, {
			username: formData.username,
			password: formData.password,
		});

		if (!data) return; // TODO add error handler

		serverList.servers.push({
			id: serverId,
			name: server.name,
			iconUrl: server.iconUrl ?? "",
			serverUrl: formData.serverURL,
			username: formData.username,
			token: data.token,
			channels: data?.channels ?? [],
			identityId: 'password',
		});

		serverList.servers = serverList.servers; // Trigger reactivity

		closeForm();
	};

	const handleRegister = async () => {
		if (!serverFound) return;
		const data = await apiRequest("POST", `${formData.serverURL}/register`, {
			username: formData.username,
			password: formData.password,
		});

		if (!data) return; // TODO add error handler
		if (serverList.servers.find((server) => server.serverUrl === formData.serverURL)) return;

		serverList.servers.push({
			id: serverId,
			name: server.name,
			iconUrl: server.iconUrl ?? "",
			serverUrl: formData.serverURL,
			username: formData.username,
			token: data.token,
			channels: data?.channels ?? [],
			identityId: 'password',
		});

		serverList.servers = serverList.servers; // Trigger reactivity

		closeForm();
	};
</script>

<Modal bind:open>
	<h1>Add Server</h1>
	<div class="modal">
		<div class="left">
			<div>
				{#if server.iconUrl}
					<div class="center">
						<img src={server.iconUrl} alt="Server Icon" class="image" />
					</div>
				{/if}
				{#if server.name}
					<h2>{server.name}</h2>
				{/if}
				{#if server.description}
					<p>{server.description}</p>
				{/if}
			</div>
		</div>
		<form>
			<label>Server URL:</label>
			<input type="text" bind:value={formData.serverURL} placeholder="https://ca.example.com" />

			<label>Username:</label>
			<input type="text" bind:value={formData.username} placeholder="ACoolName!" />

			<label>Password:</label>
			<input type="password" bind:value={formData.password} placeholder="****" />

			<div class="buttonRow">
				<button onclick={handleLogin}>Login</button>
				<button onclick={handleRegister}>Register</button>
			</div>
		</form>
	</div>
</Modal>

<style>
	h1 {
		margin: 0;
		font-weight: 600;
		font-size: 1.2rem;
	}

	h2 {
		margin: 0;
		font-weight: 600;
		text-align: center;
	}

	p {
		margin: 0;
		margin-top: 0.1rem;
		text-align: center;
		font-size: 0.75rem;
	}

	form {
		display: flex;
		flex-direction: column;
		margin-top: 0.5rem;
	}

	.buttonRow {
		margin-top: 0.5rem;
		display: flex;
	}

	button {
		width: 100%;
		margin-inline: 0.1rem;
	}

	.center {
		margin-bottom: 0.5rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.image {
		display: flex;
		width: 7rem;
		height: 7rem;
		border-radius: 0.5rem;
		overflow: hidden;
		object-fit: cover;
	}

	.left {
		margin-right: 1rem;
	}

	.modal {
		display: flex;
		flex-direction: row;
	}
</style>
