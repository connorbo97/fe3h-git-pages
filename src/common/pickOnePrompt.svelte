<script lang="ts">
	import { CONTEXTS, PickOnePromptType } from 'src/constants';

	import { COMBAT_ARTS_TO_FEATURES, getCombatArtsDescription } from 'src/constants/combatArts';
	import { COMBAT_SKILLS_TO_FEATURES } from 'src/constants/combatSkills';
	import { PLAYER_STAT_TO_SHORT_LABEL } from 'src/constants/stats';

	import { getWeaponDescription, WEAPONS_TO_FEATURES } from 'src/constants/weapons';
	import { getContext } from 'svelte';

	const { close } = getContext(CONTEXTS.MODAL);

	export let descriptionElement: any;
	export let descriptionElementProps: any;

	export let pickOne: Array<PickOnePrompt> = [];
	export let onSubmit: any = () => {};
	export let reason: any;

	export let customCombatArts: any = {};
	export let customCombatSkills: any = {};
	export let customWeapons: any = {};
	export let playerStats: any = {};

	export let onUpdatePlayerStats: any = () => {};
	export let onUpdateCustomCombatArts: any = () => {};
	export let onUpdateCustomCombatSkills: any = () => {};
	export let onUpdateCustomWeapons: any = () => {};

	let selections: Array<any> = pickOne.map(() => null);

	const getOptionLabel = (type: PickOnePromptType, option: PickOnePromptOption) => {
		switch (type) {
			case PickOnePromptType.Weapon:
				if (option.toString() === 'DOUBLE_BASE_USES') {
					return 'Double the uses of the spell you chose at Reason Level D';
				}
				return (
					WEAPONS_TO_FEATURES[option.toString()].label +
					': ' +
					getWeaponDescription(WEAPONS_TO_FEATURES[option.toString()])
				);
			case PickOnePromptType.CombatArt:
				return (
					COMBAT_ARTS_TO_FEATURES[option.toString()].label +
					': ' +
					getCombatArtsDescription(COMBAT_ARTS_TO_FEATURES[option.toString()])
				);
			case PickOnePromptType.CombatSkill:
				return (
					COMBAT_SKILLS_TO_FEATURES[option.toString()].label +
					': ' +
					COMBAT_SKILLS_TO_FEATURES[option.toString()].description
				);
			case PickOnePromptType.PlayerStat:
				const safeStat = typeof option === 'string' ? option : option.stat;
				const safeValue = typeof option === 'string' ? option : option.value;
				return `Increase ${PLAYER_STAT_TO_SHORT_LABEL[safeStat]} to at least ${safeValue}`;
		}
	};

	$: handleSelection = (type: any, newValues: Array<PickOnePromptOption>) => {
		switch (type) {
			case PickOnePromptType.Weapon:
				const newCustomWeapons = newValues.reduce(
					(acc: any, weapon: any) => {
						if (weapon === 'DOUBLE_BASE_USES') {
							const baseWeapon = Object.keys(customWeapons).find(
								(w: any) => customWeapons[w]?.reason === 'Unlocked Reason level D'
							);

							if (baseWeapon) {
								const totalUses = acc[baseWeapon]?.uses || WEAPONS_TO_FEATURES[baseWeapon]?.uses;
								acc[baseWeapon] = { ...acc[baseWeapon], uses: totalUses * 2 };
							}
						} else {
							acc[weapon] = { ...acc[weapon], reason };
						}

						return acc;
					},
					{ ...customWeapons }
				);
				onUpdateCustomWeapons(newCustomWeapons);
				return;
			case PickOnePromptType.CombatArt:
				const newCombatArts = newValues.reduce(
					(acc: any, art: any) => {
						acc[art] = { ...acc[art], reason };

						return acc;
					},
					{ ...customCombatArts }
				);
				onUpdateCustomCombatArts(newCombatArts);
				return;
			case PickOnePromptType.CombatSkill:
				const newCombatSkills = newValues.reduce(
					(acc: any, skill: any) => {
						acc[skill] = { ...acc[skill], reason };

						return acc;
					},
					{ ...customCombatSkills }
				);
				onUpdateCustomCombatSkills(newCombatSkills);
				return;
			case PickOnePromptType.PlayerStat:
				const newPlayerStats = newValues.reduce(
					(acc: any, option: any) => {
						const { stat, value } = option;
						if (Math.max(value, acc[stat]) === value) {
							acc[stat] = value;
						}
						return acc;
					},
					{ ...playerStats }
				);
				onUpdatePlayerStats(newPlayerStats);
				return;
		}
	};
	$: onSubmitButtonClick = () => {
		const condensedSelections = selections.reduce((acc, s, index) => {
			const curType = pickOne[index].type;
			const curSet = acc[curType] || new Set();

			curSet.add(s);

			acc[curType] = curSet;

			return acc;
		}, {});

		Object.keys(condensedSelections).forEach((type) =>
			handleSelection(type, Array.from(condensedSelections[type]))
		);

		onSubmit();
		close();
	};
	$: randomDisabled = pickOne.some((p) => p.disableRandom);
</script>

<div class="container">
	<h1>Making choice(s) because: <span class="reason">{reason}</span></h1>
	{#if descriptionElement}
		<svelte:component this={descriptionElement} {...descriptionElementProps} />
	{/if}
	<div class="content">
		{#if !randomDisabled}
			<button
				style:align-self="center"
				on:click={() => {
					selections = pickOne.map((entry) => {
						// random number between 0 * length -1
						const rng = Math.floor(Math.random() * entry.options.length);

						return entry.options[rng];
					});
				}}
			>
				Randomize Choices
			</button>
		{/if}
		{#each pickOne as entry, index}
			<h2>Pick a {entry.type}</h2>
			{#if entry.description}
				<span class="description">{entry.description}</span>
			{/if}
			<!-- {#key } -->
			<select
				name={entry.type + index}
				on:change={(e) => {
					selections = [...selections];
					selections[index] = JSON.parse(e.currentTarget.value);
				}}
			>
				<option value={null}>-</option>
				{#each entry.options as option}
					<option value={JSON.stringify(option)} selected={selections[index] === option}
						>{getOptionLabel(entry.type, option)}</option
					>
				{/each}
			</select>
			<!-- {/key} -->
		{/each}
	</div>
	<button
		class="submit"
		disabled={!selections.every((s) => s !== null)}
		on:click={onSubmitButtonClick}>Submit Choices</button
	>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
		h2 {
			margin: 0;
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
	}
	.description {
		font-size: 12px;
		color: red;
	}
	.reason {
		color: blue;
	}
</style>
