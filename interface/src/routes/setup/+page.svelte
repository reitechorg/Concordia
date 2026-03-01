<script lang="ts">
	import { goto } from "$app/navigation";
	import { generateRandomUsername } from "$lib/generators";
	import { createIdentity } from "$lib/identityManagement";
	import { autoFocus } from "$lib/use/autoFocus.svelte";
	import { validateUsername } from "$lib/validators";
	import StyledButton from "../../components/core/styledButton.svelte";
	import IconRight from "~icons/lucide/chevron-right";

	let username = $state("");
	let loading = $state(false);
	let errorMessage = $state<string|true>(true);

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		errorMessage = validateUsername(username);
		if (errorMessage !== true) return;

		if (loading) return;
		loading = true;
		await createIdentity({ username, description: "Main identity" });
		loading = false;
		goto("/");
	};


</script>

<div class="flex justify-center items-center h-screen w-full bg-gradient-to-tl from-[#654ea3] to-[#eaafc8]">
	<div class="bg-[#0f0f0f] flex flex-col gap-7 rounded-xl p-6">
		<div class="flex flex-row justify-start gap-4 items-center">
			<img src="/icon.png" alt="Concordia" class="w-25 h-25" />
			<div>
				<h1 class="text-2xl font-bold">Welcome to Concordia!</h1>
				<p>Decentralised chatting platform</p>
			</div>
		</div>

		<div class="flex flex-col items-center gap-3">
			<h2>Tell us your name so we can greet you properly! 👋</h2>

			<form onsubmit={handleSubmit} class="flex flex-col items-center">
				<div class="bg-white rounded-xl flex overflow-hidden">
					<input use:autoFocus class="px-4 text-black outline-0" placeholder={generateRandomUsername()} bind:value={username} type="text" disabled={loading} />
					<div class="pr-2 py-2">
						<StyledButton type="submit" {loading} title="Create identity">
							<IconRight />
						</StyledButton>
					</div>
				</div>
			</form>

			{#if errorMessage !== true}
				<p class="text-red-500 text-sm">{errorMessage}</p>
			{/if}
			{#if loading}
				<p class="text-neutral-400 text-center">
					This can take a few seconds, please wait...
				</p>
			{/if}
		</div>
	</div>
</div>

<style></style>
