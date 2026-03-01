<script lang="ts">
	import { goto } from "$app/navigation";
	import { pushHistory } from "$lib/history";
	import Settings from "~icons/lucide/settings";

	const handleClick = () => {
		pushHistory(window.location.pathname);

		goto("/settings/servers");
	};
</script>

<button class="relative cursor-pointer w-10 h-10 rounded-xl hover:rounded-lg bg-[#2c2c2c] transition-all flex justify-center items-center group hover:bg-(--accent-color)" onclick={handleClick}>
	<Settings color="white" />

	<div class="absolute top-1/2 left-10 transform -translate-y-1/2 flex items-center invisible group-hover:visible">
		<div class="w-3 h-3 bg-black transfrom rotate-45 ml-1.5 -mr-2"></div>
		<div class="bg-black px-2 py-1 rounded-md z-10 text-left">
			<div class="text-sm text-white text-nowrap">Settings</div>
		</div>
	</div>
</button>

<style>
</style>
