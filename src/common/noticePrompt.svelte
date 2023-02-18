<script lang="ts">
	import { CONTEXTS } from 'src/constants';

	import { getContext } from 'svelte';

	const { close } = getContext(CONTEXTS.MODAL);

	export let header: any;
	export let content: any;
	export let childElement: any;
	export let childElementProps: any;
</script>

<div class="container">
	<h2>{header}</h2>
	{#if content}
		<div>{content}</div>
	{/if}
	{#if childElement}
		<svelte:component this={childElement} {...childElementProps} />
	{/if}

	<button on:click={() => close()} style:width="100%">Close</button>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		row-gap: 5px;
	}
</style>
