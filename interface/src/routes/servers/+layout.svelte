<script lang="ts">
	const { children } = $props();
	import "@fontsource-variable/funnel-sans";
	import Sidebar from "../../components/core/sidebar.svelte";
</script>

<div class=" h-screen flex flex-row">
	<Sidebar />
	{@render children()}
</div>
