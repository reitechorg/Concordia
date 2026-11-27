<script lang="ts">
	import { installUpdate, updateInfo } from '$lib/updater.svelte';
	import DownloadIcon from '../icons/DownloadIcon.svelte';

	function onclick() {
		if (updateInfo.isAvailable && !updateInfo.isDownloading) {
			installUpdate();
		}
	}
</script>

{#if updateInfo.isAvailable}
	<button
		class="group relative flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl bg-[#2c2c2c] transition-all hover:rounded-lg {updateInfo.isDownloading
			? ''
			: 'hover:bg-green-600'}"
		{onclick}>
		<div class="h-6 w-6">
			<DownloadIcon />
		</div>

		{#if updateInfo.isDownloading}
			<div class="h-0.5 w-8/12 overflow-hidden rounded-full bg-neutral-600">
				<div
					class="h-full bg-green-500 transition-all"
					style="width: {(100 * updateInfo.downloaded) / (updateInfo.totalLength || 1)}%">
				</div>
			</div>
		{/if}

		<div
			class="invisible absolute top-1/2 left-10 flex -translate-y-1/2 transform items-center group-hover:visible">
			<div class="transfrom -mr-2 ml-1.5 h-3 w-3 rotate-45 bg-black"></div>
			<div class="z-10 rounded-md bg-black px-2 py-1 text-left">
				<div class="text-sm text-nowrap text-white">
					{updateInfo.isDownloading ? 'Downloading...' : 'Update available'}
				</div>
				<div class="text-xs text-nowrap text-neutral-400">
					{updateInfo.isDownloading
						? `${Math.round((100 * updateInfo.downloaded) / (updateInfo.totalLength || 1))}%`
						: `Version ${updateInfo.newVersion}`}
				</div>
			</div>
		</div>
	</button>
{/if}
