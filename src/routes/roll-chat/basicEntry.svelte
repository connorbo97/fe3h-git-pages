<script lang="ts">
    import SvelteTip from 'src/common/SvelteTip.svelte';
	import { TooltipStyle } from 'src/constants/enums';
	import { addNumberPrefix } from 'src/textUtils';

	export let playerName = 'No Name';
	export let rollName = 'Basic Roll';
	export let rollBonus = 0;
	export let roll = '-';
	export let rollTooltip = 'n/a';
	export let date: any;
</script>

<div class="container">
	<b class="player">{playerName} - {rollName} ({addNumberPrefix(rollBonus)})</b>
	<div class="rolls" id={`chat-entry-${date}`}>
        <div class="attack">Result</div>
	</div>
	<div class="result">
			<div class="attack">
				<SvelteTip tooltipStyle={TooltipStyle.CENTER}>
					<span>
						{roll}
					</span>
					<div slot="t">
						{rollTooltip}
					</div>
				</SvelteTip>
			</div>
	</div>
</div>

<style lang="scss">
	@keyframes fadein {
		0% {
			opacity: 0;
			width: 0;
		}

		50% {
			width: 100%;
		}

		100% {
			opacity: 1;
		}
	}
	.container {
		display: flex;
		flex-direction: column;
		background-color: #362c49;
		border: 1px solid black;
		color: white;
		border-radius: 5px 5px 0 0;
		animation: fadein 1.5s forwards alternate;
	}
	.player {
		padding: 5px;
	}

	.rolls {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: #362c49;
		color: white;
		border-radius: 5px 5px 0 0;
		text-align: center;
		> * {
			display: flex;
			flex-direction: column;
			align-items: center;
			row-gap: 5px;
			flex: 1;
			&:not(:last-child) {
				border-right: 1px solid black;
			}
		}
	}
	.result {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: lightyellow;
		color: black;
		text-align: center;
		position: relative;
		> * {
			display: flex;
			justify-content: center;
			align-items: center;
			flex: 1;
			padding: 10px;
			&:not(:last-child) {
				border-right: 1px solid black;
			}

			min-height: 50px;
		}
	}
</style>
