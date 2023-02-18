<script lang="ts">
	import SvelteTip from 'src/common/SvelteTip.svelte';

	import { CLASS_TO_FEATURES, CLASS_TO_LABEL } from 'src/constants/classes';
	import { WEAPON_LEVEL, WEAPON_LEVEL_TO_MAX_XP } from 'src/constants/weaponLevel';
	import { COMBAT_XP_OPTIONS, WEAPON_TYPE, WEAPON_TYPE_TO_LABEL } from 'src/constants/weaponType';
	import { getXPMoochText } from 'src/descriptionUtils';

	export let equippedClass: any;
	export let weaponXP: any;
	export let onWeaponXpChange: any;

	let totalXPForCombat = 24;
	let battalionEquipped = false;
	let weaponsUsedInCombat: any = {};

	$: equippedXPMooch = CLASS_TO_FEATURES[equippedClass]?.whenEquipped?.xpMooch || {};
	$: equippedXPMods = CLASS_TO_FEATURES[equippedClass]?.whenEquipped?.xpMods || {};
	$: hasXPMooch = !!Object.keys(equippedXPMooch).length;

	$: onCombatXPSubmit = async () => {
		const totalUsedWeapons = Object.keys(weaponsUsedInCombat);
		const combatWeaponXP = totalUsedWeapons.reduce((acc: any, w) => {
			//@ts-ignore
			acc[w] = Math.round((totalXPForCombat / totalUsedWeapons.length) * (equippedXPMods[w] || 1));
			return acc;
		}, {});

		if (hasXPMooch) {
			Object.keys(equippedXPMooch).forEach(
				(w) => (combatWeaponXP[w] = Math.round(totalXPForCombat * equippedXPMooch[w]))
			);
		}

		const combatWeaponXPTypes = Object.keys(combatWeaponXP);

		for (const type of combatWeaponXPTypes) {
			const weaponXPObj = weaponXP[type] || { level: WEAPON_LEVEL.E, total: 0, mastered: false };
			await onWeaponXpChange(combatWeaponXP[type], {
				type,
				curLevel: weaponXPObj.level,
				curXP: weaponXPObj.total,
				maxXP: WEAPON_LEVEL_TO_MAX_XP[weaponXPObj.level]
			});
		}

		if (battalionEquipped) {
			const type = WEAPON_TYPE.LEADERSHIP;
			const weaponXPObj = weaponXP[type] || { level: WEAPON_LEVEL.E, total: 0, mastered: false };
			onWeaponXpChange(Math.round(totalXPForCombat / 2), {
				type,
				curLevel: weaponXPObj.level,
				curXP: weaponXPObj.total,
				maxXP: WEAPON_LEVEL_TO_MAX_XP[weaponXPObj.level]
			});
		}
	};
</script>

<div class="container">
	<div style:display="flex" style:flex-direction="column">
		<span><u>Combat XP</u></span>
		<span style:display="flex" style:column-gap="5px">
			<div>Equipped Class:</div>
			<b>{CLASS_TO_LABEL[equippedClass] || 'None'}</b>
		</span>
		<span style:display="flex" style:column-gap="5px">
			<div>Total XP for the Combat:</div>
			<input type="number" bind:value={totalXPForCombat} style:width="30px" />
		</span>
		<span style:display="flex" style:column-gap="5px">
			<SvelteTip>
				<label for="battalion-equipped">Battalion Equipped?</label>
				<div slot="t" style:white-space="break-spaces">
					If you have a battalion equipped, you will gain 50% of Max XP to the leadership skill
				</div>
			</SvelteTip>
			<input id="battalion-equipped" type="checkbox" bind:checked={battalionEquipped} />
		</span>
	</div>
	<div style:flex="1" style:display="flex" style:flex-direction="column">
		<fieldset>
			<legend>Select all weapons used in the combat</legend>
			{#each COMBAT_XP_OPTIONS as type}
				<div style:display="flex" style:flex-direction="column" style:align-items="center">
					<div style:display="flex">
						<input
							type="checkbox"
							name="weapon"
							id={type}
							checked={weaponsUsedInCombat[type]}
							on:click={() => {
								if (weaponsUsedInCombat[type]) {
									const { [type]: removed, ...res } = weaponsUsedInCombat;
									weaponsUsedInCombat = res;
								} else {
									weaponsUsedInCombat = {
										...weaponsUsedInCombat,
										[type]: true
									};
								}
							}}
						/>
						<label for={type}>{WEAPON_TYPE_TO_LABEL[type]}</label>
					</div>
					{#if weaponsUsedInCombat[type]}
						<div>
							+{Math.round(
								(totalXPForCombat / Object.keys(weaponsUsedInCombat).length) *
									//@ts-ignore
									(equippedXPMods[type] || 1)
							)}
						</div>
					{/if}
				</div>
			{/each}
		</fieldset>
		{#if hasXPMooch}
			<div>
				{getXPMoochText(equippedXPMooch, { prefix: 'Extra XP from equipped class:' })}
			</div>
		{/if}
	</div>
	<div class="button-container">
		<button on:click={onCombatXPSubmit} disabled={!Object.keys(weaponsUsedInCombat).length}>
			Add combat XP
		</button>
		<button
			on:click={() => (weaponsUsedInCombat = {})}
			disabled={!Object.keys(weaponsUsedInCombat).length}
		>
			Click to clear all
		</button>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		align-items: center;
		white-space: nowrap;
		column-gap: 5px;
		padding: 5px;
		fieldset {
			display: flex;
			flex-wrap: wrap;
		}
	}
	.button-container {
		display: flex;
		flex-direction: column;
		row-gap: 5px;
	}
</style>
