<script lang="ts">
	const { children } = $props();
	import Sidebar from '../../components/core/sidebar.svelte';
</script>

<div class="flex h-screen flex-row">
	<Sidebar />
	{@render children()}
</div>
