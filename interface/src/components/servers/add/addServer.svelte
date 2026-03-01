<script lang="ts">
	import Plus from "~icons/lucide/plus";
	import AddServerModal from "./addServerModal.svelte";
	let open = $state(false);

	function addServer() {
		open = true;
	}
</script>

<button onclick={addServer} class="relative cursor-pointer w-10 h-10 rounded-xl hover:rounded-lg bg-[#2c2c2c] transition-all flex justify-center items-center group hover:bg-(--accent-color)">
	<Plus color="white" />

	<div class="absolute top-1/2 left-10 transform -translate-y-1/2 flex items-center invisible group-hover:visible">
		<div class="w-3 h-3 bg-black transfrom rotate-45 ml-1.5 -mr-2"></div>
		<div class="bg-black px-2 py-1 rounded-md z-10 text-left">
			<div class="text-sm text-white text-nowrap">Join a server</div>
		</div>
	</div>
</button>

<AddServerModal bind:open />

<style>
</style>
