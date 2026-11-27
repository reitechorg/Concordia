<script lang="ts">
	import PlusIcon from '../../icons/PlusIcon.svelte';
	import AddServerModal from './addServerModal.svelte';
	let open = $state(false);

	function addServer() {
		open = true;
	}
</script>

<button
	onclick={addServer}
	class="group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-[#2c2c2c] transition-all hover:rounded-lg hover:bg-(--accent-color)">
	<div class="h-5 w-5">
		<PlusIcon />
	</div>

	<div
		class="invisible absolute top-1/2 left-10 flex -translate-y-1/2 transform items-center group-hover:visible">
		<div class="transfrom -mr-2 ml-1.5 h-3 w-3 rotate-45 bg-black"></div>
		<div class="z-10 rounded-md bg-black px-2 py-1 text-left">
			<div class="text-sm text-nowrap text-white">Join a server</div>
		</div>
	</div>
</button>

<AddServerModal bind:open />

<style>
</style>
