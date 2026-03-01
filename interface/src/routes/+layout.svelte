<script lang="ts">
	import { initDeeplinks } from "$lib/deepLink";
	import { registerUpdateCheckerEffect } from "$lib/updater.svelte";
	import initWebSockets from "$lib/webSockets";
	import { onMount } from "svelte";
	import { initServerListStorage } from "../components/servers/getServers.svelte";
	import initTray from "$lib/tray";

	// import { getCurrentWindow } from "@tauri-apps/api/window";

	const unlisten = async () => {
		// TODO: Replace with Electrons API
		// const window = await getCurrentWindow();
		// window.onCloseRequested((event) => {
		// 	console.log("CLOSE REQ");

		// 	event.preventDefault();
		// 	window.hide();
		// });
		initTray(window);
	};

	unlisten();
	initServerListStorage();
	initDeeplinks();
	initWebSockets();
	registerUpdateCheckerEffect();

	const { children } = $props();
</script>

{@render children()}
