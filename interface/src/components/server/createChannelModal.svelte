<script lang="ts">
	import Modal from '../core/modal.svelte';
	import StyledButton from '../core/styledButton.svelte';
	import TextInput from '../inputs/textInput.svelte';
	import { createChannel } from '../../lib/channels/createChannel';

	let { open = $bindable(false), server } = $props();
	let name = $state('');
	let description = $state('');

	function create() {
		if (name.length > 0) createChannel(name, description, server);
		open = false;
		name = '';
		description = '';
	}
</script>

<Modal bind:open>
	<div class="flex w-full flex-col items-center gap-4">
		<h1 class="text-lg font-bold">Create a new channel</h1>
		<TextInput bind:value={name} label="Channel name" />
		<div class="flex w-full justify-end gap-2">
			<div class="max-w-1/2">
				<StyledButton
					onclick={() => {
						open = false;
					}}
					dangerous={true}>Cancel</StyledButton>
			</div>
			<div class="max-w-1/2">
				<StyledButton onclick={create}>Create</StyledButton>
			</div>
		</div>
	</div>
</Modal>
