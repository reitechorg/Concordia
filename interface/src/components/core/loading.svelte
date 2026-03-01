<script lang="ts">
	const { size = 1 } = $props();
</script>

<div class="loading" style="scale: {size}">
	<div></div>
	<div></div>
	<div></div>
	<div></div>
</div>

<style>
	.loading,
	.loading div {
		box-sizing: border-box;
	}

	.loading {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 0.75rem;
	}

	.loading div {
		position: absolute;
		width: 13.33333px;
		height: 13.33333px;
		border-radius: 50%;
		background: var(--accent-color);
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}

	.loading div:nth-child(1) {
		left: 8px;
		animation: lds-ellipsis1 0.6s infinite;
	}

	.loading div:nth-child(2) {
		left: 8px;
		animation: lds-ellipsis2 0.6s infinite;
	}

	.loading div:nth-child(3) {
		left: 32px;
		animation: lds-ellipsis2 0.6s infinite;
	}

	.loading div:nth-child(4) {
		left: 56px;
		animation: lds-ellipsis3 0.6s infinite;
	}

	@keyframes lds-ellipsis1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes lds-ellipsis3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
	@keyframes lds-ellipsis2 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(24px, 0);
		}
	}
</style>
