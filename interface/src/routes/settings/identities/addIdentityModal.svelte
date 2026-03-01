<script lang="ts">
	import { createIdentity } from "$lib/identityManagement";
	import Modal from "../../../components/core/modal.svelte";
	import StyledButton from "../../../components/core/styledButton.svelte";

	let { open = $bindable(false) } = $props();
	let loading = $state(false);

	let username = $state("");
	let description = $state("");

	const createIdentityHandler = async (e: SubmitEvent) => {
		e.preventDefault();
		if (loading) return;
		loading = true;

		// Create identity
		const identity = await createIdentity({
			username: username,
			description: description,
		});

		if (identity) {
			username = "";
			description = "";
			open = false;
			loading = false;
			return;
		}

		loading = false;
	};
</script>

<Modal bind:open>
	<h1 class="font-bold text-xl mb-2">Add an identity</h1>
	<form class="flex flex-col" onsubmit={createIdentityHandler}>
		<label for="name">Username</label>
		<input type="text" bind:value={username} class="rounded" placeholder="CookieLover723" id="name" />

		<label for="desc">Description</label>
		<input type="text" bind:value={description} class="rounded" placeholder="A simple description" id="desc" />
		<div class="mt-2"></div>
		<StyledButton type="submit" {loading}>Create identity</StyledButton>
	</form>
</Modal>

<style>
	input {
		color: black;
		background-color: #ffffff;
		padding: 0.1rem 0.3rem;
	}
</style>
