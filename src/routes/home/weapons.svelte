<script lang="ts">
	import CategoryHeader from 'src/common/categoryHeader.svelte';
	import {
		AXE_WEAPONS,
		BOW_WEAPONS,
		CONTEXTS,
		FIST_WEAPONS,
		LANCE_WEAPONS,
		SWORD_WEAPONS
	} from 'src/constants';
	import { MAGIC_WEAPONS, MARTIAL_WEAPONS, TRAINING_WEAPONS_SET } from 'src/constants/weapons';
	import { MAGIC_WEAPON_TYPES, WEAPON_TYPE } from 'src/constants/weaponType';
	import { classBuilder } from 'src/textUtils';
	import { getContext } from 'svelte';
	import CustomWeaponPrompt from './customWeaponPrompt.svelte';
	import WeaponsSection from './weaponsSection.svelte';

	const { open } = getContext(CONTEXTS.MODAL);

	export let equippedWeapons: any;
	export let onToggleEquippedWeapons: any;
	export let equippedCombatSkills: any;
	export let equippedClass: any;

	export let allWeapons: AllWeapons;

	export let weaponUses: { [s: string]: number };
	export let onUpdateWeaponUses: any;

	export let customWeapons: any;
	export let onUpdateCustomWeapons: any;

	export let curSuperiorityDies: any;
	export let maxSuperiorityDie: any;
	export let setCurSuperiorityDie: any;

	let spellUseFlag = 0;

	$: allWeaponFeatures = allWeapons.fullFeatures;
	$: reasonEntries = allWeapons.fullArray.filter(
		(w: string) => allWeaponFeatures[w].type === WEAPON_TYPE.REASON
	);
	$: faithEntries = allWeapons.fullArray.filter(
		(w: string) => allWeaponFeatures[w].type === WEAPON_TYPE.FAITH
	);
	$: onToggleEquip = (weapon: any) => {
		onToggleEquippedWeapons(weapon);
	};

	$: resetEquippedWeapons = () => equippedWeapons.forEach((w: any) => onToggleEquippedWeapons(w));

	$: promptNewMartialWeapon = () => {
		open(CustomWeaponPrompt, {
			weapon: MARTIAL_WEAPONS.filter((w: any) => !allWeapons.fullSet.has(w)),
			weaponsToFeatures: allWeaponFeatures,
			defaultReason: 'Manually added in weapons section',
			customWeapons,
			onUpdateCustomWeapons
		});
	};
	$: promptNewMagicWeapon = () => {
		open(CustomWeaponPrompt, {
			weapon: MAGIC_WEAPONS.filter((w: any) => !allWeapons.fullSet.has(w)),
			weaponsToFeatures: allWeaponFeatures,
			defaultReason: 'Manually added in weapons section',
			customWeapons,
			onUpdateCustomWeapons
		});
	};

	$: allWeaponsSet = allWeapons.fullSet;
	$: allMartialWeaponTypes = allWeapons.fullArray.reduce((acc, w) => {
		const type = allWeaponFeatures[w].type;

		if (!TRAINING_WEAPONS_SET.has(w) && !MAGIC_WEAPON_TYPES.includes(type)) {
			acc.add(type);
		}

		return acc;
	}, new Set());
	$: trainingWeaponsSet = new Set(
		allMartialWeaponTypes.size < 4 ? Array.from(TRAINING_WEAPONS_SET) : []
	);
	$: unlockedSwords = SWORD_WEAPONS.filter(
		(w) => allWeaponsSet.has(w) && !trainingWeaponsSet.has(w)
	);
	$: unlockedLances = LANCE_WEAPONS.filter(
		(w) => allWeaponsSet.has(w) && !trainingWeaponsSet.has(w)
	);
	$: unlockedAxes = AXE_WEAPONS.filter((w) => allWeaponsSet.has(w) && !trainingWeaponsSet.has(w));
	$: unlockedBows = BOW_WEAPONS.filter((w) => allWeaponsSet.has(w) && !trainingWeaponsSet.has(w));
	$: unlockedFists = FIST_WEAPONS.filter((w) => allWeaponsSet.has(w) && !trainingWeaponsSet.has(w));
	$: onlyTrainingWeapons =
		!unlockedAxes?.length &&
		!unlockedSwords?.length &&
		!unlockedBows?.length &&
		!unlockedFists?.length &&
		!unlockedLances?.length;
</script>

<div class="container">
	<CategoryHeader label="Weapons" />
	<div class="actions" style:white-space="nowrap">
		<span>Martial Weapons</span>
		<div class="superiority-die">
			<span>Superiority Dies:</span>
			<input
				style:width="25px"
				type="number"
				class={`die-input ${
					curSuperiorityDies <= 0
						? 'bad'
						: curSuperiorityDies <= Math.ceil(maxSuperiorityDie / 3)
						? 'danger'
						: ''
				}`}
				min="0"
				value={curSuperiorityDies}
				on:change={(e) => {
					const newValue = parseInt(e.currentTarget.value);
					if (newValue >= 0 && newValue <= maxSuperiorityDie) {
						setCurSuperiorityDie(newValue);
						e.currentTarget.value = newValue + '';
					} else {
						e.currentTarget.value = curSuperiorityDies + '';
					}
				}}
			/>
			<span>/ {maxSuperiorityDie}</span>
		</div>
		<button on:click={() => setCurSuperiorityDie(maxSuperiorityDie)}>Reset Superiority Dice</button>
		<button on:click={() => (spellUseFlag += 1)}>Reset Spell Uses</button>
		<button on:click={resetEquippedWeapons}>Unequip all weapons</button>
	</div>
	<div class="divider" style:height="2px" />
	<div class="divider" />
	<div class="martial-weapons">
		{#if unlockedSwords.length}
			<div class="category">
				<div class="label">Swords</div>
				<div class="category-container">
					{#each unlockedSwords as weapon}
						<WeaponsSection
							{allWeapons}
							{equippedWeapons}
							{weapon}
							{onToggleEquip}
							isMagic={false}
							spellUseFlag={0}
							{equippedCombatSkills}
							{equippedClass}
							{weaponUses}
							{onUpdateWeaponUses}
						/>
					{/each}
				</div>
			</div>
		{/if}
		{#if unlockedLances.length}
			<div class="category">
				<div class="label">Lances</div>
				<div class="category-container">
					{#each unlockedLances as weapon}
						<WeaponsSection
							{equippedWeapons}
							{weapon}
							{onToggleEquip}
							{allWeapons}
							isMagic={false}
							spellUseFlag={0}
							{equippedCombatSkills}
							{equippedClass}
							{weaponUses}
							{onUpdateWeaponUses}
						/>
					{/each}
				</div>
			</div>
		{/if}
		{#if unlockedAxes.length}
			<div class="category">
				<div class="label">Axes</div>
				<div class="category-container">
					{#each unlockedAxes as weapon}
						<WeaponsSection
							{equippedWeapons}
							{weapon}
							{onToggleEquip}
							{allWeapons}
							isMagic={false}
							spellUseFlag={0}
							{equippedCombatSkills}
							{equippedClass}
							{weaponUses}
							{onUpdateWeaponUses}
						/>
					{/each}
				</div>
			</div>
		{/if}
		{#if unlockedBows.length}
			<div class="category">
				<div class="label">Bows</div>
				<div class="category-container">
					{#each unlockedBows as weapon}
						<WeaponsSection
							{equippedWeapons}
							{weapon}
							{onToggleEquip}
							{allWeapons}
							isMagic={false}
							spellUseFlag={0}
							{equippedCombatSkills}
							{equippedClass}
							{weaponUses}
							{onUpdateWeaponUses}
						/>
					{/each}
				</div>
			</div>
		{/if}
		{#if unlockedFists.length}
			<div class="category">
				<div class="label">Fists</div>
				<div class="category-container">
					{#each unlockedFists as weapon}
						<WeaponsSection
							{equippedWeapons}
							{weapon}
							{onToggleEquip}
							{allWeapons}
							spellUseFlag={0}
							isMagic={false}
							{equippedCombatSkills}
							{equippedClass}
							{weaponUses}
							{onUpdateWeaponUses}
						/>
					{/each}
				</div>
			</div>
		{/if}
		{#if trainingWeaponsSet.size > 0}
			<div
				class={classBuilder('category', {
					'min-width': onlyTrainingWeapons
				})}
			>
				<div class="label">Training Weapons</div>
				<div class="category-container">
					{#each Array.from(trainingWeaponsSet) as weapon}
						<WeaponsSection
							{equippedWeapons}
							{weapon}
							{onToggleEquip}
							{allWeapons}
							spellUseFlag={0}
							isMagic={false}
							{equippedCombatSkills}
							{equippedClass}
							{weaponUses}
							{onUpdateWeaponUses}
						/>
					{/each}
				</div>
			</div>
		{/if}
	</div>
	<div class="actions" style:white-space="nowrap">
		<span style:flex="1">Magic Weapons</span>
		<button on:click={promptNewMartialWeapon} style:margin-right="5px"
			>Add new martial weapon</button
		>
		<button on:click={promptNewMagicWeapon}>Add new magic weapon</button>
	</div>
	<div class="divider" style:height="2px" />
	<div class="divider" />
	<div class="magic-weapons">
		{#if reasonEntries.length || faithEntries.length}
			<div class="magic-category">
				<div class="category">
					{#each [...reasonEntries, ...faithEntries] as weapon}
						<WeaponsSection
							{equippedWeapons}
							{weapon}
							{onToggleEquip}
							{allWeapons}
							isMagic={true}
							{spellUseFlag}
							{equippedCombatSkills}
							{equippedClass}
							{weaponUses}
							{onUpdateWeaponUses}
						/>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		position: relative;
		background-color: #dfd6c2;

		column-gap: 5px;
		height: 100%;
	}
	.actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		column-gap: 5px;
		margin-top: 2px;
		margin-bottom: 2px;

		font-size: 15px;

		> button {
			padding: 2px;
		}
	}
	.divider {
		height: 1px;
		background-color: #7c7562;
		margin-bottom: 2px;
	}

	.superiority-die {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		column-gap: 5px;
		flex: 1;
	}
	.martial-weapons {
		display: flex;
		justify-content: space-between;

		flex: 1;
		height: 100%;
	}

	.label {
		font-weight: bold;
	}
	.magic-weapons {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		.magic-category {
			padding: 5px;
			flex: 1;
			&:not(:last-child) {
				border-right: 1px solid black;
			}
		}
		.category {
			display: grid;
			flex-direction: column;
			grid-template-columns: repeat(5, 1fr);
			grid-auto-rows: max-content;

			column-gap: 5px;
		}
	}

	.category {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 5px;
	}
	.category-container {
		display: flex;
		flex-direction: column;
	}

	.danger {
		background-color: rgba(233, 156, 32, 0.617);
	}
	.bad {
		background-color: red;
	}
	.min-width {
		min-width: 33%;
		flex: 0;
	}

	.die-input {
		background-color: transparent;
		border: 1px solid gray;
	}
</style>
