<script lang="ts">
	import { CLASS_TO_FEATURES } from 'src/constants/classes';

	import { MAGIC_WEAPON_TYPES } from 'src/constants/weaponType';

	export let equippedClass: any;

	export let allWeapons: AllWeapons;
	export let equippedWeapons: any;
	export let selectedWeapon: any;
	export let setSelectedWeapon: any;
	export let damageTypeSelection: any;
	export let weaponsToFeatures: { [s: string]: WeaponFeatures };

	export let distanceToTarget: any;
	export let setDistanceToTarget: any;

	$: selectedWeaponType = weaponsToFeatures[selectedWeapon]?.type;
	$: weaponsOptions = [
		...equippedWeapons,
		...(!equippedClass || CLASS_TO_FEATURES[equippedClass].canUseMagic === true
			? allWeapons.fullArray.filter((weapon) =>
					MAGIC_WEAPON_TYPES.includes(weaponsToFeatures[weapon].type)
			  )
			: [])
	];

	$: {
		if (selectedWeapon && !weaponsOptions.includes(selectedWeapon)) {
			setSelectedWeapon('');
		}
	}

	export let selectedCombatArt: any;
	export let setSelectedCombatArt: any;
	export let equippedCombatArts: any;
	export let allCombatArts: AllCombatArts;
	$: allCombatArtFeatures = allCombatArts.fullFeatures;
	$: combatArtsOptions = equippedCombatArts.filter((art: string) => {
		const compatibleWeapons = allCombatArtFeatures[art].compatibleWeapons || [];

		return compatibleWeapons.indexOf(selectedWeaponType) !== -1;
	});

	$: {
		if (selectedCombatArt && !combatArtsOptions.includes(selectedCombatArt)) {
			setSelectedCombatArt('');
		}
	}
</script>

<div class="container">
	<div class="entry">
		<div class="selection">
			<span class="label">
				{`Weapon: `}
			</span>
			{#key weaponsOptions}
				<select
					on:change={(e) => {
						setSelectedWeapon(e.currentTarget.value);
						damageTypeSelection = '';
					}}
				>
					<option value={''}> - </option>
					{#each weaponsOptions as weapon}
						<option value={weapon} selected={selectedWeapon === weapon}>
							{weaponsToFeatures[weapon]?.label}
						</option>
					{/each}
				</select>
			{/key}
		</div>
		<!-- <div class="description">
			{weaponsToFeatures[selectedWeapon]
				? getWeaponDescription(weaponsToFeatures[selectedWeapon])
				: ''}
		</div> -->
	</div>
	<div class="entry">
		{#if combatArtsOptions.length > 0}
			<div class="selection">
				<span class="label">
					{`Combat Art: `}
				</span>
				{#key combatArtsOptions}
					<select
						on:change={(e) => {
							setSelectedCombatArt(e.currentTarget.value);
						}}
					>
						<option value={''}> - </option>
						{#each combatArtsOptions as art}
							<option value={art} selected={selectedCombatArt === art}>
								{allCombatArtFeatures[art].label}
							</option>
						{/each}
					</select>
				{/key}
			</div>
			<!-- <div class="description">
				{COMBAT_ARTS_TO_FEATURES[selectedCombatArt]
					? getCombatArtsDescription(COMBAT_ARTS_TO_FEATURES[selectedCombatArt], {
							disableDescription: true
					  })
					: ''}
			</div> -->
		{/if}
	</div>
	<div class="range-finder">
		<span>Range</span>
		<input
			type="number"
			value={distanceToTarget}
			on:change={(e) => setDistanceToTarget(parseInt(e.currentTarget.value))}
			min="0"
		/>
	</div>
</div>

<style lang="scss">
	.container {
		border-radius: 1px;
		padding: 5px;
		background-color: #dfd6c2;

		display: flex;
		justify-content: space-between;
		grid-area: header;
		column-gap: 5px;
	}
	.entry {
		flex: 1;

		display: flex;
		flex-direction: column;
		row-gap: 5px;
	}
	.selection {
		display: flex;
		align-items: center;
		column-gap: 5px;
		select {
			flex: 1;
		}
	}

	.range-finder {
		input {
			width: 50px;
		}
	}
</style>
