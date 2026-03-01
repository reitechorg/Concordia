<script lang="ts">
	import { page } from "$app/state";

	const settings = [
		{ name: "Servers", path: "/settings/servers" },
		{ name: "Identities", path: "/settings/identities" },
	];
</script>

<div class="mt-2">
	<div class="flex flex-col gap-1.5">
		{#each settings as setting}
			<a class="bg-zinc-800" href={setting.path} class:active={page.url.pathname === setting.path}>
				{setting.name}
			</a>
		{/each}
	</div>
</div>

<style>
	div {
		margin-left: 0.5rem;
	}

	a {
		padding: 0.5rem 1.5rem;
		border-radius: 0.25rem;
		cursor: pointer;
	}

	.active {
		background-color: #3f3f3f;
	}
</style>
