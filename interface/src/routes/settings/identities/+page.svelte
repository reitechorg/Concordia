<script>
	import { listIdentities, saveIdentities } from '$lib/identityManagement';
	import StyledButton from '../../../components/core/styledButton.svelte';
	import ExportIcon from '../../../components/icons/ExportIcon.svelte';
	import ImportIcon from '../../../components/icons/ImportIcon.svelte';
	import PlusIcon from '../../../components/icons/PlusIcon.svelte';
	import AddIdentityModal from './addIdentityModal.svelte';
	import IdentityCard from './IdentityCard.svelte';

	let open = $state(false);
	let identities = $state(listIdentities());

	const createIdentity = () => {
		open = true;
	};

	$effect(() => {
		if (!open) identities = listIdentities();
	});

	const exportIdentities = async () => {
		// Get all identities
		const identities = listIdentities();

		// Ignore the warning, it does have an effect, idk why, but it is important
		const content = await window.rsa.export(identities, '751842');

		// Get file
		// @ts-ignore
		const handle = await window.showSaveFilePicker({
			suggestedName: 'identities_export',
		});

		if (!handle) return;

		const writeable = await handle.createWritable();

		// Write to file
		await writeable.write(content);
		await writeable.close();
	};

	const importIdentities = async () => {
		//@ts-ignore
		const [handle] = await window.showOpenFilePicker();
		const file = await handle.getFile();
		const content = await file.text();

		const result = await window.rsa.import(content, '751842');

		saveIdentities(result);

		identities = listIdentities();
	};
</script>

<AddIdentityModal bind:open />

<h2 class="text-xl">Manage identities</h2>
<div class="mb-6 flex items-center justify-between">
	<p class="text-sm font-light">
		Identities are your access keys used to login into Concordia servers. <br />
		We recommend you to backup them in a secure place. <br />
		If you lose them you will be unable to access your accounts ever again.
	</p>
	<div class="flex flex-col gap-2">
		<div class="max-w-42">
			<StyledButton
				onclick={() => {
					importIdentities();
				}}>
				<div class="mr-2 h-6 w-6">
					<ImportIcon />
				</div>
				Import identities</StyledButton>
		</div>
		<div class="max-w-42">
			<StyledButton
				onclick={() => {
					exportIdentities();
				}}>
				<div class="mr-2 h-6 w-6">
					<ExportIcon />
				</div>
				Export identities</StyledButton>
		</div>
	</div>
</div>

<div class="flex flex-col gap-2">
	{#each identities as identity}
		<IdentityCard {identity} />
	{:else}
		<p class="text-center">No identities found</p>
	{/each}
	<button
		onclick={createIdentity}
		class="flex cursor-pointer items-center justify-center gap-2 rounded bg-zinc-900 p-2">
		<div class="mb-0.5 h-5 w-5">
			<PlusIcon />
		</div>
		<p>Add an identity</p>
	</button>
</div>
