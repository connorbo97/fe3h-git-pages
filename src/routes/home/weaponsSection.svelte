<script lang="ts">
	import EquippedButton from 'src/common/equippedButton.svelte';
	import SvelteTip from 'src/common/SvelteTip.svelte';

	import { CONTEXTS, MAX_WEAPONS_EQUIPPED } from 'src/constants';
	import { TooltipStyle } from 'src/constants/enums';

	import { getWeaponDescription, WEAPONS } from 'src/constants/weapons';
	import { classBuilder } from 'src/textUtils';
	import { checkHealPlus } from 'src/utils';

	export let weapon: any;
	export let equippedClass: any;
	export let equippedWeapons: any;
	export let equippedCombatSkills: any;
	export let onToggleEquip: any;
	export let allWeapons: AllWeapons;
	export let spellUseFlag: any;

	export let isMagic: any;

	export let weaponUses: { [s: string]: number };
	export let onUpdateWeaponUses: any;

	let prevSpellUseFlag = { current: spellUseFlag };
	$: hasHealPlus = checkHealPlus(equippedClass, equippedCombatSkills);
	let prevMaxUses: any = { current: null };
	$: maxUses =
		(allWeapons.fullFeatures[weapon]?.uses || Infinity) *
		(hasHealPlus && weapon === WEAPONS.HEAL ? 2 : 1);
	$: curUses = weaponUses[weapon];

	$: {
		if (curUses === undefined && maxUses !== undefined) {
			curUses = maxUses;
		}
	}
	$: updateCurWeaponUses = (newTotal: any) => {
		if (newTotal <= maxUses && newTotal >= 0) {
			onUpdateWeaponUses(weapon, newTotal);
		}
	};

	$: {
		if (prevSpellUseFlag.current != spellUseFlag || maxUses !== prevMaxUses.current) {
			updateCurWeaponUses(maxUses);
			prevMaxUses.current = maxUses;
			prevSpellUseFlag.current = spellUseFlag;
		}
	}

	$: isCustomUnlock = allWeapons?.customSet.has(weapon);
	$: isClassUnlock =
		allWeapons?.classUnlockSet.has(weapon) || allWeapons?.equippedClassSet.has(weapon);
	$: isTrainingWeapon = weapon.indexOf('TRAINING') >= 0;

	$: isUnlocked = isCustomUnlock || isClassUnlock || isTrainingWeapon;

	$: weaponsToFeatures = allWeapons.fullFeatures;
	$: tooltipText = weaponsToFeatures[weapon].reason;
</script>

<div class="container">
	<!-- <SvelteTip disabled={!tooltipText}>
		<UnlockedButton
			isUnlocked={allWeapons.fullSet.has(weapon)}
			isCustom={isCustomUnlock}
			onClick={() => {
				open(CustomWeaponPrompt, {
					weapon,
					customWeapons,
					weaponsToFeatures,
					onUpdateCustomWeapons,
					defaultReason: 'Manually added in weapons section'
				});
			}}
		/>
		<div slot="t">{weaponsToFeatures[weapon].reason}</div>
	</SvelteTip> -->
	<SvelteTip tooltipStyle={TooltipStyle.CENTER} timeout={300}>
		<div slot="t">
			{getWeaponDescription(allWeapons.fullFeatures[weapon])}
			<span style:color="#9c8e8e">
				{weaponsToFeatures[weapon].reason ? `(${weaponsToFeatures[weapon].reason})` : ''}
			</span>
		</div>
		<div class={classBuilder('label', { magic: isMagic, custom: isCustomUnlock })}>
			{allWeapons.weaponsToLabel[weapon]}
		</div>
	</SvelteTip>
	{#if !isMagic}
		<div class="equip-button">
			<EquippedButton
				isEquipped={equippedWeapons.includes(weapon)}
				onClick={() => onToggleEquip(weapon, isUnlocked)}
				isVisible={equippedWeapons.length < MAX_WEAPONS_EQUIPPED ||
					equippedWeapons.includes(weapon)}
			/>
		</div>
	{/if}
	{#if isMagic}
		<div class="equip-button">
			{#key maxUses}
				<input
					class={'count ' +
						(curUses === 0 ? 'bad' : curUses <= Math.ceil(maxUses / 3) ? 'danger' : '')}
					type="number"
					min="0"
					on:change={(e) => {
						const value = parseInt(e.currentTarget.value);

						if (value >= 0 && value <= maxUses) {
							updateCurWeaponUses(value);
							e.currentTarget.value = value + '';
						} else {
							e.currentTarget.value = maxUses + '';
						}
					}}
					value={curUses}
				/>
			{/key}
			/<span style:width={'15px'}>{maxUses}</span>
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex: 1;

		font-weight: normal;

		justify-content: space-between;
		align-items: center;
		column-gap: 5px;
		background-color: #eae8da;
		border: 1px solid #c9c6bb;
		padding: 1px;
		font-size: 15px;

		.label {
			line-height: 15px;
			&.magic {
				font-size: 15px;
			}
		}

		.equip-button {
			flex: 1;
			display: flex;
			justify-content: flex-end;
		}
	}

	.custom-unlock {
		border-color: red;
	}

	// .available-button {
	// 	cursor: pointer !important;
	// }

	.unlocked {
		background-color: blue;
	}

	.equipped {
		background-color: #51bf51;
	}
	.count {
		width: 30px;
		border: 1px solid transparent;
		background-color: transparent;
		margin-top: -0.5px;
		margin-right: -7px;
	}

	.danger {
		background-color: rgba(233, 156, 32, 0.617);
	}
	.bad {
		background-color: red;
	}
</style>
