<script lang="ts">
	import { goto } from '$app/navigation';
	import { pushHistory } from '$lib/history';
	import GearIcon from '../icons/GearIcon.svelte';

	const handleClick = () => {
		pushHistory(window.location.pathname);

		goto('/settings/servers');
	};
</script>

<button
	class="group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-[#2c2c2c] transition-all hover:rounded-lg hover:bg-(--accent-color)"
	onclick={handleClick}>
	<div class="h-5 w-5">
		<GearIcon />
	</div>

	<div
		class="invisible absolute top-1/2 left-10 flex -translate-y-1/2 transform items-center group-hover:visible">
		<div class="transfrom -mr-2 ml-1.5 h-3 w-3 rotate-45 bg-black"></div>
		<div class="z-10 rounded-md bg-black px-2 py-1 text-left">
			<div class="text-sm text-nowrap text-white">Settings</div>
		</div>
	</div>
</button>

<style>
</style>
