<script lang="ts">
	let { label, value = $bindable('') } = $props();
</script>

<div class="flex gap-2">
	<label>{label}</label>
	<input bind:value class="overflow-hidden rounded bg-black px-2" type="text" />
</div>
