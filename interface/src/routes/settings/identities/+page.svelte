<script>
	import { listIdentities } from "$lib/identityManagement";
	import StyledButton from "../../../components/core/styledButton.svelte";
	import AddIdentityModal from "./addIdentityModal.svelte";
	import IdentityCard from "./IdentityCard.svelte";

	import Add from "~icons/lucide/plus";

	let open = $state(false);
	let identities = $state(listIdentities());

	const createIdentity = () => {
		open = true;
	};

	$effect(() => {
		if (!open) identities = listIdentities();
	});
</script>

<AddIdentityModal bind:open />

<h2 class="text-xl">Manage identities</h2>
<div class="flex justify-between items-center mb-6">
	<p class="text-sm font-light">
		Identities are your access keys used to login into Concordia servers. <br />
		We recommend you to backup them in a secure place. <br />
		If you lose them you will be unable to access your accounts ever again.
	</p>
	<StyledButton
		onclick={() => {
			console.log("OWO"); // TODO implement export identities
		}}>Export identities</StyledButton
	>
</div>

<div class="flex flex-col gap-2">
	{#each identities as identity}
		<IdentityCard {identity} />
	{:else}
		<p class="text-center">No identities found</p>
	{/each}
	<button onclick={createIdentity} class="flex justify-center items-center cursor-pointer bg-zinc-900 p-2 rounded">
		<Add />
		<p>Add an identity</p>
	</button>
</div>
