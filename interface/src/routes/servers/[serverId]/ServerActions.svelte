<script lang="ts">
	import { clickOutside } from '$lib/use/clickOutside.svelte';
	import Settings from '../../../components/icons/SettingsIcon.svelte';
	import Leave from '../../../components/icons/LeaveIcon.svelte';
	import logoutFromServer from '$lib/logoutFromServer';
	import { goto } from '$app/navigation';
	import IconButton from '../../../components/core/iconButton.svelte';
	import { hasPermission } from '$lib/permissions/hasPermission';
	import { Permissions } from '../../../generated/enums';
	import PfpIcon from '../../../components/icons/PfpIcon.svelte';
	import { sendPfpUpdate } from '$lib/pfp/sendPfpUpdate';

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
			title: 'Update pfp',
			icon: PfpIcon,
			func: () => {
				sendPfpUpdate(server);
				closeServerEdit();
			},
			hasPermissions: () => true,
		},
		{
			title: 'Server settings',
			icon: Settings,
			func: () => {
				console.log("HAHA you thought I'd finish my code? Silly you");
				closeServerEdit();
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
	class="absolute top-9 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 transform bg-[#161616]">
</div>
<div
	class="absolute top-9 left-1/2 flex w-52 -translate-x-1/2 flex-col gap-1 rounded-lg bg-[#161616] p-1 text-sm"
	use:clickOutside={() => {
		closeServerEdit();
	}}>
	{#each actions.filter(action => action.hasPermissions()) as action}
		<IconButton onclick={action.func} dangerous={action.danger} title={action.title}>
			<action.icon />
		</IconButton>
	{/each}
</div>
