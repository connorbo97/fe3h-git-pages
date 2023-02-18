<script lang="ts">
	export let size: any = '16px';
	export let isUnlocked: any = false;
	export let isMastered: any = false;
	export let isCustom: any = false;
	export let onClick: any;
	export let unlockedFilter: any = 'sepia(100%) saturate(1000%) brightness(45%) hue-rotate(174deg)';
	export let buttonBorder: any = '';
</script>

<button
	style:width={size}
	style:height={size}
	class={`container ${isCustom ? 'custom' : ''}`}
	style:border={buttonBorder}
>
	<img
		src={isMastered ? 'mastered.png' : 'unequipped.png'}
		width={size}
		height={size}
		class={`${!isMastered && isUnlocked ? 'equipped' : ''} `}
		alt="unlocked"
		style:filter={!isMastered && isUnlocked ? unlockedFilter : ''}
		on:click={onClick}
	/>
</button>

<style lang="scss">
	.container {
		border-radius: 100%;
		padding: 0;
		margin: 0;
		border: 0;
		background-color: transparent;
		box-shadow: none;
		box-sizing: content-box;
		border: 1px solid transparent;

		display: flex;
		align-items: center;
		justify-content: center;

		cursor: pointer;
	}

	.custom {
		border: 1px solid rgb(238, 95, 95);
	}
</style>
