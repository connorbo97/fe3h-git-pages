<script lang="ts">
	import CategoryHeader from 'src/common/categoryHeader.svelte';
	import PickOnePrompt from 'src/common/pickOnePrompt.svelte';

	import SvelteTip from 'src/common/SvelteTip.svelte';
	import { CONTEXTS, MAX_COMBAT_ARTS, MAX_WEAPONS_EQUIPPED } from 'src/constants';
	import { COMBAT_ARTS } from 'src/constants/combatArts';
	import { PickOnePromptType, TooltipStyle } from 'src/constants/enums';
	import { WEAPONS_TO_FEATURES } from 'src/constants/weapons';
	import { getContext } from 'svelte';

	import CombatArtsEntry from './combatArtsEntry.svelte';

	const { open } = getContext(CONTEXTS.MODAL);

	export let allCombatArts: AllCombatArts;

	export let customCombatArts;
	export let onUpdateCustomCombatArts;

	export let equippedCombatArts: any;
	export let onToggleCombatArts: any;

	export let equippedWeapons: any;

	$: equippedWeaponTypes = new Set(equippedWeapons.map((w) => WEAPONS_TO_FEATURES[w]?.type));

	$: availableCombatArts = Object.values(COMBAT_ARTS).filter((a) => !allCombatArts.fullSet.has(a));
	$: openAddPrompt = () => {
		open(PickOnePrompt, {
			pickOne: [
				{
					type: PickOnePromptType.CombatArt,
					options: availableCombatArts
				}
			],
			reason: `Manually adding in combat arts section`,
			customCombatArts,
			onUpdateCustomCombatArts: (newVals) =>
				onUpdateCustomCombatArts({ ...customCombatArts, ...newVals })
		});
	};
</script>

<div class="container">
	<CategoryHeader>
		<div slot="content" class="header">
			<div>
				<span>Combat Arts</span>
				<SvelteTip tooltipStyle={TooltipStyle.BOTTOM_CENTER}>
					<span
						on:click={() =>
							equippedCombatArts.forEach((w) => {
								onToggleCombatArts(w);
							})}
					>
						({equippedCombatArts.length}/{MAX_COMBAT_ARTS})
					</span>
					<div slot="t">Click to Clear All</div>
				</SvelteTip>
			</div>
			<button on:click={openAddPrompt}> + </button>
		</div>
	</CategoryHeader>
	<div style:height="11px" />
	<div class="content">
		{#each allCombatArts.fullArray as art}
			<CombatArtsEntry
				{art}
				{allCombatArts}
				{equippedCombatArts}
				{onToggleCombatArts}
				{equippedWeaponTypes}
			/>
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		background-color: #dfd6c2;
		border-bottom: 1px solid gray;
		flex: 1;

		height: 50%;
	}

	.header {
		display: flex;
		justify-content: space-between;
		z-index: 1;
		> button {
			height: 20px;
			width: 20px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		row-gap: 2px;
		overflow-y: auto;
	}
</style>
