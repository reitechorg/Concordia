<script lang="ts">
	import StyledButton from '../core/styledButton.svelte';
	import CreateChannelModal from './createChannelModal.svelte';
	import { deleteChannel as DeleteChannel } from '$lib/channels/deleteChannel';
	import { hasPermission } from '$lib/permissions/hasPermission';
	import { Permissions } from '../../generated/enums';
	let { server } = $props();

	let visible = $state(false);
	let x = $state(0);
	let y = $state(0);

	let open = $state(false);

	let channelId = '';

	export function handleContextMenu(event: PointerEvent) {
		event.preventDefault();

		let target = event.target as HTMLElement;
		if (target.tagName.toLowerCase() == 'p') target = target.parentElement as HTMLElement;
		if (target.tagName.toLowerCase() == 'svg') {
			target = target.parentElement as HTMLElement;
			target = target.parentElement as HTMLElement;
		}

		channelId = target.getAttribute('data-id')!;

		x = event.clientX;
		y = event.clientY;
		visible = true;
	}

	function deleteChannel() {
		DeleteChannel(channelId, server);
	}

	function createChannel() {
		open = true;
	}

	function closeMenu() {
		visible = false;
	}
</script>

<svelte:window
	onclick={closeMenu}
	onkeydown={e => {
		if (e.key === 'Escape') closeMenu();
	}} />

{#if visible}
	<div
		class="absolute z-10 flex w-40 flex-col items-center gap-1 rounded bg-zinc-950 p-1"
		style="top: {y}px; left: {x}px;">
		{#if hasPermission(Permissions.CHANNEL_CREATE)}
			<StyledButton onclick={createChannel}>Add channel</StyledButton>
		{/if}
		{#if hasPermission(Permissions.CHANNEL_DELETE)}
			<StyledButton onclick={deleteChannel} dangerous={true}>Delete channel</StyledButton>
		{/if}
	</div>
{/if}

<CreateChannelModal bind:open {server} />
