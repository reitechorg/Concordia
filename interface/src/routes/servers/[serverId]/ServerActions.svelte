<script lang="ts">
	import { clickOutside } from '$lib/use/clickOutside.svelte';
	import Settings from '../../../components/icons/SettingsIcon.svelte';
	import Leave from '../../../components/icons/LeaveIcon.svelte';
	import logoutFromServer from '$lib/logoutFromServer';
	import { goto } from '$app/navigation';
	import StyledButton from '../../../components/core/styledButton.svelte';
	import { hasPermission } from '$lib/permissions/hasPermission';
	import { Permissions } from '../../../../../server/src/generated/enums';

	const { closeServerEdit, server } = $props();

	type action = {
		title: string;
		icon?: any;
		func: () => void;
		hasPermissions: () => boolean;
		danger?: boolean;
	};

	let actions: action[] = [
		{
			title: 'Server settings',
			icon: Settings,
			func: () => {
				console.log("HAHA you thought I'd finish my code? Silly you");
			},
			hasPermissions: () => hasPermission(Permissions.SERVER_UPDATE),
		},
		{
			title: 'Leave server',
			icon: Leave,
			func: () => {
				logoutFromServer(server);
				goto('/'); // Redirect to home
			},
			hasPermissions: () => true,
			danger: true,
		},
	];
</script>

<div
	class="absolute top-9 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 transform bg-zinc-800">
</div>
<div
	class="absolute top-9 flex w-full flex-col gap-1 rounded-lg bg-zinc-800 p-2"
	use:clickOutside={() => {
		closeServerEdit();
	}}>
	{#each actions.filter(action => action.hasPermissions()) as action}
		<StyledButton onclick={action.func} dangerous={action.danger}>
			<action.icon />
			{action.title}
		</StyledButton>
	{/each}
</div>
