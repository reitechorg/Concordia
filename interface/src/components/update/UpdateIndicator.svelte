<script lang="ts">
	import { installUpdate, updateInfo } from "$lib/updater.svelte";
	import IconDownload from "~icons/lucide/download";

	function onclick() {
		if (updateInfo.isAvailable && !updateInfo.isDownloading) {
			installUpdate();
		}
	}
</script>

{#if updateInfo.isAvailable}
	<button class="relative cursor-pointer w-10 h-10 rounded-xl hover:rounded-lg bg-[#2c2c2c] transition-all flex flex-col gap-1 justify-center items-center group {updateInfo.isDownloading ? '' : 'hover:bg-green-600'}" {onclick}>
		<IconDownload color="white" />

		{#if updateInfo.isDownloading}
			<div class="w-8/12 h-0.5 bg-neutral-600 rounded-full overflow-hidden">
				<div class="h-full bg-green-500 transition-all" style="width: {(100 * updateInfo.downloaded) / (updateInfo.totalLength || 1)}%"></div>
			</div>
		{/if}

		<div class="absolute top-1/2 left-10 transform -translate-y-1/2 flex items-center invisible group-hover:visible">
			<div class="w-3 h-3 bg-black transfrom rotate-45 ml-1.5 -mr-2"></div>
			<div class="bg-black px-2 py-1 rounded-md z-10 text-left">
				<div class="text-sm text-white text-nowrap">{updateInfo.isDownloading ? "Downloading..." : "Update available"}</div>
				<div class="text-xs text-neutral-400 text-nowrap">{updateInfo.isDownloading ? `${Math.round((100 * updateInfo.downloaded) / (updateInfo.totalLength || 1))}%` : `Version ${updateInfo.newVersion}`}</div>
			</div>
		</div>
	</button>
{/if}
