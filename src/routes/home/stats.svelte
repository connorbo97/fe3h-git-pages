<script lang="ts">
	import Popup from './Popup.svelte';

	import {
		getCrestStrength,
		getCrestStrengthText,
		getModifierByPlayerStat,
		rollD20,
		rollVisualDice
	} from 'src/utils';
	import {
		CONTEXTS,
		CRESTS,
		CRESTS_TO_FEATURES,
		CrestType,
		DEFAULT_PLAYER_STAT,
		PLAYER_STAT_TO_LABEL
	} from '../../constants';
	import { getContext } from 'svelte';
	import SvelteTip from 'src/common/SvelteTip.svelte';
	import CategoryHeader from 'src/common/categoryHeader.svelte';
	import { Dice } from 'src/constants/dice';

	const { open } = getContext(CONTEXTS.MODAL);

	// state
	export let stats = DEFAULT_PLAYER_STAT;
	export let onUpdatePlayerStats: Function;

	export let playerName: any;
	export let playerCrest: PlayerCrest;
	export let onUpdateCrest: any;

	let majorMinorDropdown: any = {};

	$: db = getContext(CONTEXTS.DB);

	$: {
		if (majorMinorDropdown) {
			majorMinorDropdown.value = playerCrest.type
				? playerCrest?.isMajor
					? CrestType.MAJOR
					: CrestType.MINOR
				: 'none';
		}
	}

	// handlers
	const onPlayerStatRoll = (stat: string) => {
		const statBuff = getModifierByPlayerStat(stats[stat]);
		const rng = rollD20();
		const result = rng + statBuff;
		rollVisualDice([Dice.d20], {
			modifier: [statBuff],
			chatEntryOnRes: {
				playerName,
				rollName: PLAYER_STAT_TO_LABEL[stat],
				rollBonus: statBuff,
			},
			db,
		});
	};

	const onPlayerStatChange = (stat: string, value: any) => {
		onUpdatePlayerStats({ ...stats, [stat]: isNaN(value) ? 0 : value });
	};

	const showPopup = () => {
		open(Popup, { message: "It's a popup!" });
	};

	$: playerCrestFeatures = CRESTS_TO_FEATURES[playerCrest?.type] || {};
</script>

<div class="container">
	<CategoryHeader label={'Stats'} />
	{#each Object.keys(stats) as stat}
		<div class="stat-container">
			<button class="label" on:click={() => onPlayerStatRoll(stat)}>
				{PLAYER_STAT_TO_LABEL[stat]}
			</button>
			<div class="mod">{getModifierByPlayerStat(stats[stat])}</div>
			<input
				class="value"
				value={typeof stats[stat] === 'number' ? stats[stat] : 0}
				on:input={(e) => onPlayerStatChange(stat, parseInt(e.currentTarget.value))}
				type="number"
			/>
		</div>
	{/each}
	<div class="crest">
		{#if playerCrestFeatures?.image}
			<SvelteTip>
				<div slot="t">
					<div>
						<u
							>Crest of {playerCrestFeatures?.label} ({getCrestStrengthText(playerCrest?.isMajor)},
							DC {playerCrestFeatures.activationDC[getCrestStrength(playerCrest?.isMajor)]})</u
						>
					</div>
					{`${playerCrestFeatures?.description}`}
				</div>
				<div class="image-container">
					<img
						style:border-color={playerCrest.isMajor ? 'slateblue' : 'lightskyblue'}
						class="crest-image"
						src={playerCrestFeatures.image}
						alt={playerCrest?.type}
					/>
				</div>
			</SvelteTip>
		{/if}
		<select
			name="crest"
			on:change={(e) => {
				onUpdateCrest({
					type: e.currentTarget.value,
					isMajor: false
				});
			}}
		>
			<option value={''} selected={!playerCrest.type}>Crest?</option>
			{#each Object.keys(CRESTS) as crest}
				<option value={crest} selected={playerCrest?.type === crest}>
					{CRESTS_TO_FEATURES[crest]?.label}
				</option>
			{/each}
		</select>
		<select
			bind:this={majorMinorDropdown}
			name="major-minor"
			on:change={(e) =>
				onUpdateCrest({ ...playerCrest, isMajor: e.currentTarget.value === 'MAJOR' })}
		>
			<option value={'none'}>Major/Minor?</option>
			<option value={CrestType.MAJOR}>{'Major'}</option>
			<option value={CrestType.MINOR}>{'Minor'}</option>
		</select>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		justify-content: flex- start;
		align-items: stretch;

		row-gap: 10px;
		background-color: #dfd6c2;
		border-right: 1px solid rgba(gray, 0.6);

		// padding-top: 35px;
		height: 100%;
	}
	.stat-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 5px;
		background-color: #eae8da;
		border: 1px solid #786c54;
		margin: 5px;

		text-align: center;

		border-radius: 5px;

		button {
			border: 0;
			border-radius: 0;
			padding: 0;
			background-color: #58506b;
			width: 100%;
			box-shadow: none;
			color: white;
			text-shadow: 1px 1px black;

			&:hover {
				color: #6a88a8;
			}
		}
		input {
			display: inline-block;
			text-align: center;
			max-width: 50px;
			margin-left: 12px;
		}
	}
	.mod {
		font-family: sans-serif;
	}

	.crest {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding: 5px;
	}
	.crest-image {
		box-sizing: border-box;
		background-color: white;
		border-radius: 100%;
		border: 5px solid gray;
		width: 95%;
	}
</style>
