<script lang="ts">
	import { classBuilder } from 'src/textUtils';

	export let size: any = '20px';
	export let isEquipped: any;
	export let onClick: any;
	export let isVisible: any = true;
	export let disabled: any = false;
</script>

<button
	class="container"
	style:opacity={isVisible ? '1' : '0'}
	style:width={size}
	style:height={size}
	disabled={disabled || !isVisible}
>
	<img
		src="equipped.png"
		width={size}
		height={size}
		class={classBuilder('img', { 'not-equipped': !isEquipped })}
		on:click={onClick}
		alt="equipped"
	/>
</button>

<style lang="scss">
	.container {
		border-radius: 0;
		padding: 0;
		margin: 0;
		border: 0;
		background-color: transparent;
		box-shadow: none;
		cursor: pointer;
	}

	.not-equipped {
		filter: grayscale(1);
	}
</style>
