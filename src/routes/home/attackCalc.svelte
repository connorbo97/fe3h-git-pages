<script lang="ts">
	import { CONTEXTS } from 'src/constants';

	import { CLASS_TO_FEATURES } from 'src/constants/classes';

	import { COMBAT_ARTS_TO_FEATURES } from 'src/constants/combatArts';
	import { COMBAT_SKILLS_TO_FEATURES } from 'src/constants/combatSkills';
	import { CRESTS_TO_FEATURES, CrestTrigger, CrestType } from 'src/constants/crests';
	import { PLAYER_STAT, PLAYER_STAT_TO_SHORT_LABEL } from 'src/constants/stats';

	import { BOW_WEAPONS, HEALING_MAGIC, WEAPONS, WEAPON_TO_TYPE } from 'src/constants/weapons';
	import { WEAPON_TYPE } from 'src/constants/weaponType';
	import { addNumberPrefix, classBuilder, getCritRangeText } from 'src/textUtils';
	import {
		checkHealPlus,
		getModifierByPlayerStat,
		printCalc,
		rollCalc,
		setEquality,
		simplifyCalc
	} from 'src/utils';
	import { getContext } from 'svelte';
	import AttackCalcHeader from './attackCalcHeader.svelte';
	import AttackRollModal from './attackRollModal.svelte';
	import EntryPicker from './queryPicker.svelte';

	const { open } = getContext(CONTEXTS.MODAL);
	export let playerName: any;
	export let equippedClass: string;
	export let equippedCombatArts: Array<string>;
	export let equippedCombatSkills: Array<string>;
	export let equippedWeapons: Array<string>;
	export let playerCrest: PlayerCrest;
	export let playerStats: any;

	export let allWeapons: AllWeapons;
	export let allCombatArts: AllCombatArts;

	export let weaponUses: any;
	export let onUpdateWeaponUses: any;

	export let selectedWeapon: any;
	export let setSelectedWeapon: any;

	export let selectedCombatArt: any;
	export let setSelectedCombatArt: any;

	export let curSuperiorityDies: any;
	export let setCurSuperiorityDie: any;

	let distanceToTarget: number = 1;
	const setDistanceToTarget = (newDistance) => (distanceToTarget = newDistance);

	let showModal;
	$: weaponsToFeatures = allWeapons.fullFeatures;
	$: dexMod = getModifierByPlayerStat(playerStats[PLAYER_STAT.DEX]);
	$: hasHealPlus = checkHealPlus(equippedClass, equippedCombatSkills);
	$: selectedWeaponType = WEAPON_TO_TYPE[selectedWeapon];

	// queries
	$: calcQueriesMap = (): { [s: string]: Query } => {
		const combatSkillQueries = equippedCombatSkills.reduce((acc: any, skill) => {
			const curQueries = COMBAT_SKILLS_TO_FEATURES[skill].queries || [];

			curQueries.forEach((query, index) => {
				if (query.compatibleWeapons.includes(weaponsToFeatures[selectedWeapon]?.type)) {
					const key = skill + '__' + index;
					acc[key] = { ...query, key: skill + '__' + index };
				}
			});

			return acc;
		}, {});

		return combatSkillQueries;
	};
	$: queriesMap = calcQueriesMap();
	$: queries = Object.values(queriesMap);
	$: queryKeys = queries.map((q) => q.key);
	let prevQueryKeys: any = { current: null };

	let selections: { [s: string]: QueryOption } | undefined;
	$: {
		if (!selections) {
			selections = queries.reduce((acc: { [s: string]: QueryOption }, query: Query) => {
				acc[query.key || ''] = query.options[0];
				return acc;
			}, {});
		} else if (!setEquality(new Set(prevQueryKeys.current), new Set(queryKeys))) {
			prevQueryKeys.current = queryKeys;
			selections = queries.reduce((acc: { [s: string]: QueryOption }, query: Query) => {
				acc[query.key || ''] = query.options[0];
				return acc;
			}, {});
		}
	}

	$: onUpdateQuerySelection = (key: string, value: QueryOption) => {
		selections = { ...selections, [key]: value };
	};

	// crest activation
	$: crestTrigger = new Set(CRESTS_TO_FEATURES[playerCrest.type]?.triggersOn);
	$: calcShouldRollCrest = () => {
		if (selectedCombatArt) {
			return crestTrigger.has(CrestTrigger.COMBAT_ART) || crestTrigger.has(CrestTrigger.ATTACK);
		} else if (
			selectedWeaponType === WEAPON_TYPE.REASON ||
			selectedWeaponType === WEAPON_TYPE.FAITH
		) {
			return (
				(crestTrigger.has(CrestTrigger.MAGIC_ATTACK) &&
					weaponsToFeatures[selectedWeapon]?.damage?.[0] !== 0 &&
					!HEALING_MAGIC.has(selectedWeapon)) ||
				(crestTrigger.has(CrestTrigger.HEAL) && HEALING_MAGIC.has(selectedWeapon))
			);
		} else {
			return crestTrigger.has(CrestTrigger.ATTACK);
		}
	};

	$: crestType = playerCrest.type;
	$: crestName = CRESTS_TO_FEATURES[crestType]?.label;
	$: crestDescription = CRESTS_TO_FEATURES[crestType]?.description;
	$: crestDamageBonus = CRESTS_TO_FEATURES[crestType]?.damageBonus || [];
	$: crestCombatArtDamageModifier = CRESTS_TO_FEATURES[crestType]?.combatArtDamageMultiplier || 1;
	$: crestConservesResource = CRESTS_TO_FEATURES[crestType]?.conservesResource || false;
	// $: crestHPRecoveryPercent = CRESTS_TO_FEATURES[crestType]?.hpRecoveryPercent || 0;
	$: shouldRollCrest = calcShouldRollCrest();
	$: crestDC = shouldRollCrest
		? CRESTS_TO_FEATURES[crestType].activationDC[
				playerCrest.isMajor ? CrestType.MAJOR : CrestType.MINOR
		  ]
		: Infinity;

	// Attack
	$: attackDexModifier = dexMod;
	$: weaponAttackModifier = weaponsToFeatures[selectedWeapon]?.attackBonus || 0;
	$: weaponArtAttackModifier = COMBAT_ARTS_TO_FEATURES[selectedCombatArt]?.attackBonus || [];
	$: skillAttackModifier = equippedCombatSkills.reduce((acc: any, skill: any) => {
		return [
			...acc,
			...(COMBAT_SKILLS_TO_FEATURES[skill].attackBonus?.[selectedWeaponType] ||
				COMBAT_SKILLS_TO_FEATURES[skill].attackBonus?.['ANY'] ||
				[])
		];
	}, []);
	$: optionalAttackModifier = Object.keys(selections || {}).reduce(
		(acc: Array<CalcEntry>, key: string) => {
			if (selections?.[key].attackBonus) {
				acc = [...acc, ...(selections[key].attackBonus || [])];
			}
			return acc;
		},
		[]
	);
	$: attackDistanceModifier = BOW_WEAPONS.includes(selectedWeapon)
		? Math.max(distanceToTarget - 2, 0) * -2
		: 0;
	$: attackModifier = [
		...skillAttackModifier,
		...weaponArtAttackModifier,
		weaponAttackModifier,
		attackDistanceModifier,
		attackDexModifier,
		...optionalAttackModifier
	].filter((a) => a !== 0);
	$: simplifiedAttackModifier = simplifyCalc(attackModifier);

	// Damage
	$: weaponDamageType = weaponsToFeatures[selectedWeapon]?.damageType;
	let prevWeaponDamageType = { current: weaponDamageType };
	let damageTypeSelection = '';

	$: {
		if (!damageTypeSelection || prevWeaponDamageType.current !== weaponDamageType) {
			prevWeaponDamageType.current = weaponDamageType;
			if (weaponDamageType) {
				damageTypeSelection = weaponDamageType[0];
			} else {
				damageTypeSelection = PLAYER_STAT.STR;
			}
		}
	}
	$: damageBase = getModifierByPlayerStat(playerStats[damageTypeSelection] || 10);
	$: damageTypeLabel = PLAYER_STAT_TO_SHORT_LABEL[damageTypeSelection];
	$: weaponDamageModifier = [...(weaponsToFeatures[selectedWeapon]?.damage || [])];
	$: healPlusModifier = selectedWeapon === WEAPONS.HEAL && hasHealPlus ? 2 : 0;

	$: weaponArtDamageModifier = COMBAT_ARTS_TO_FEATURES[selectedCombatArt]?.damageBonus || [];
	$: optionsDamageModifier = Object.keys(selections || {}).reduce(
		(acc: Array<CalcEntry>, key: string) => {
			if (selections?.[key].damageBonus) {
				acc = [...acc, ...(selections[key].damageBonus || [])];
			}
			return acc;
		},
		[]
	);
	$: damageCalc = [
		damageBase,
		...weaponDamageModifier,
		...weaponArtDamageModifier,
		...equippedClassDamageModifier,
		healPlusModifier,
		...optionsDamageModifier
	].filter((a) => a !== 0);
	$: simplifiedDamageCalc = simplifyCalc(damageCalc);

	// Crit
	$: critDexModifier = -1;
	$: weaponCritModifier = weaponsToFeatures[selectedWeapon]?.critBonus || 0;
	$: weaponArtCritModifier = COMBAT_ARTS_TO_FEATURES[selectedCombatArt]?.critBonus || [];
	$: optionsCritModifier = [];
	$: critModifier = rollCalc([
		dexMod,
		critDexModifier,
		weaponCritModifier,
		equippedClassCritModifier,
		...weaponArtCritModifier,
		...optionsCritModifier
	]);

	// Range
	$: equippedClassRangeModifier =
		CLASS_TO_FEATURES[equippedClass]?.whenEquipped?.bonusRange?.[
			weaponsToFeatures[selectedWeapon]?.type
		] || 0;
	$: equippedClassCritModifier =
		CLASS_TO_FEATURES[equippedClass]?.whenEquipped?.bonusCrit?.[
			weaponsToFeatures[selectedWeapon]?.type
		] || 0;
	$: equippedClassDamageModifier =
		CLASS_TO_FEATURES[equippedClass]?.whenEquipped?.bonusDamage?.[
			weaponsToFeatures[selectedWeapon]?.type
		] || [];
	$: combatArtRange = allCombatArts.fullFeatures[selectedCombatArt]?.range;
	$: combatSkillsRangeModifier = equippedCombatSkills.reduce(
		(acc, skill) =>
			acc +
			(COMBAT_SKILLS_TO_FEATURES[skill]?.bonusRange?.[weaponsToFeatures[selectedWeapon]?.type] ||
				0),
		0
	);
	$: optionsRangeModifier = 0;
	$: calcWeaponRange = () => {
		let baseWeaponRange = combatArtRange
			? [...combatArtRange]
			: // copying b/c of mutation lower down
			  [...(weaponsToFeatures[selectedWeapon]?.range || [1])];

		if (selectedWeapon === WEAPONS.RESTORE) {
			baseWeaponRange = [1, 2 + getModifierByPlayerStat(playerStats[PLAYER_STAT.INT])];
		} else if (selectedWeapon === WEAPONS.PHYSIC) {
			baseWeaponRange = [1, 2 + 2 * getModifierByPlayerStat(playerStats[PLAYER_STAT.INT])];
		}

		if (baseWeaponRange[1] === undefined) {
			baseWeaponRange[1] = baseWeaponRange[0];
		}

		baseWeaponRange[1] =
			parseInt(baseWeaponRange[1] + '') +
			equippedClassRangeModifier +
			combatSkillsRangeModifier +
			optionsRangeModifier;

		return baseWeaponRange;
	};
	$: [weaponRangeMin, weaponRangeMax] = calcWeaponRange();

	$: onOpenAttackModal = () => (showModal = true);

	$: isHealWeapon = HEALING_MAGIC.has(selectedWeapon);

	let shouldDoVisualRolls = true;
	$: toggleVisualRolls = () => {
		shouldDoVisualRolls = !shouldDoVisualRolls;
	};
</script>

<div class="outer">
	<div class={classBuilder('container')}>
		<AttackCalcHeader
			{damageTypeSelection}
			{weaponsToFeatures}
			{allCombatArts}
			{allWeapons}
			{equippedCombatArts}
			{equippedWeapons}
			{selectedWeapon}
			{setSelectedWeapon}
			{selectedCombatArt}
			{setSelectedCombatArt}
			{distanceToTarget}
			{setDistanceToTarget}
			{equippedClass}
		/>
		{#if !showModal}
			<div class="calcs">
				<div class="calc attack-container">
					<h2 class="content">
						<span class="calc-label">Attack: 1d20</span>
						<span class="modifiers">
							{#if attackDexModifier}
								<span>+ {attackDexModifier}<span class="source">(dex)</span></span>
							{/if}
							{#if weaponAttackModifier}
								<span>
									{addNumberPrefix(weaponAttackModifier, true)}<span class="source">(weapon)</span>
								</span>{/if}
							{#if weaponArtAttackModifier.length}
								<span>
									+ {printCalc(weaponArtAttackModifier)}<span class="source">(combat art)</span>
								</span>
							{/if}
							{#if attackDistanceModifier}
								<span>
									{addNumberPrefix(attackDistanceModifier, true)}<span class="source"
										>(distance)</span
									>
								</span>
							{/if}
							{#if skillAttackModifier.length}
								<span>
									+ {printCalc(skillAttackModifier)}<span class="source">(combat skills)</span>
								</span>
							{/if}
							{#if optionalAttackModifier.length > 0}
								<span>
									+ {printCalc(simplifyCalc(optionalAttackModifier))}<span class="source"
										>(optionals)</span
									>
								</span>
							{/if}
						</span>
					</h2>
				</div>
				<h2 class="result attack-condensed">
					= 1d20 <span class="modifiers">+ {printCalc(simplifiedAttackModifier)}</span>
				</h2>
				<div class="calc damage-container">
					<h2 class="content">
						{isHealWeapon ? 'HP Restored' : 'Damage'}: {#if selectedWeapon}
							{damageBase}{#if damageTypeSelection && (weaponDamageType || []).length <= 1}
								<span>({damageTypeLabel})</span>
							{/if}{#if weaponDamageType && weaponDamageType.length > 1}
								<select
									on:change={(e) => {
										damageTypeSelection = e.currentTarget.value;
									}}
								>
									<option value={''}>-</option>
									{#each weaponDamageType as type}
										<option value={type} selected={type === damageTypeSelection}
											>{PLAYER_STAT_TO_SHORT_LABEL[type]}</option
										>
									{/each}
								</select>
							{/if}

							<span class="modifiers">
								{#if weaponDamageModifier.length}
									<span
										>+ {printCalc(weaponDamageModifier)}<span class="source">(weapon)</span></span
									>
								{/if}
								{#if healPlusModifier}
									<span>+ {healPlusModifier}<span class="source">(Heal Plus)</span></span>
								{/if}
								{#if weaponArtDamageModifier.length}
									<span>+ {weaponArtDamageModifier}<span class="source">(combat art)</span></span>
								{/if}
								{#if optionsDamageModifier.length}
									<span
										>+ {printCalc(simplifyCalc(optionsDamageModifier))}<span class="source"
											>(options)</span
										></span
									>
								{/if}
								{#if equippedClassDamageModifier.length}
									<span
										>+ {printCalc(equippedClassDamageModifier)}<span class="source"
											>(class)</span
										></span
									>
								{/if}
							</span>
						{/if}
					</h2>
				</div>
				<h2 class="result damage-condensed">
					= <span>{printCalc(simplifiedDamageCalc)}</span>
				</h2>
				<div class="calc crit-container">
					<h2 class="content">
						Crit Modifier: {dexMod + critDexModifier}<span class="source"
							>(Dex{critDexModifier > 0 ? '+' + critDexModifier : critDexModifier})</span
						>
						<span class="modifiers">
							{#if weaponCritModifier}
								<span
									>{weaponCritModifier > 0 ? '+ ' + weaponCritModifier : weaponCritModifier}<span
										class="source">(weapon)</span
									></span
								>
							{/if}
							{#if weaponArtCritModifier.length}
								<span
									>+ {printCalc(weaponArtCritModifier)}<span class="source">(combat art)</span
									></span
								>
							{/if}
							{#if optionsCritModifier.length}
								<span>+ {optionsCritModifier}<span class="source">(options)</span></span>
							{/if}
							{#if equippedClassCritModifier}
								<span
									>+ {printCalc(simplifyCalc([equippedClassCritModifier]))}<span class="source"
										>(class)</span
									></span
								>
							{/if}
						</span>
					</h2>
				</div>
				<h2 class="result crit-condensed">
					{#if critModifier >= 0}= {getCritRangeText(critModifier)}{/if}
					{#if critModifier < 0}= Can't Crit{/if}
				</h2>
				<div class="calc range-container">
					<h2 class="content">
						Range: {#if selectedWeapon}
							{weaponRangeMin}
							{#if weaponRangeMax !== weaponRangeMin}to {weaponRangeMax}{/if}
						{/if}
					</h2>
				</div>
				<div class="empty range-condensed" />
				{#if shouldRollCrest}
					<div class="crest-container">
						<h2 class="content">
							Crest of {crestName} (DC {crestDC}):
							<span class="crest-description">Hover your crest to see its effect</span>
						</h2>
					</div>
				{/if}
			</div>
		{/if}
		{#if showModal}
			<div class="attack-roll-container">
				<AttackRollModal
					{playerName}
					{critModifier}
					{crestCombatArtDamageModifier}
					{selectedWeapon}
					{weaponUses}
					{onUpdateWeaponUses}
					{crestConservesResource}
					{selectedCombatArt}
					{allWeapons}
					{allCombatArts}
					{curSuperiorityDies}
					{setCurSuperiorityDie}
					onCloseModal={() => (showModal = false)}
					attackCalc={simplifiedAttackModifier}
					damageCalc={simplifiedDamageCalc}
					crestDC={shouldRollCrest ? crestDC : Infinity}
					crestDamage={crestDamageBonus}
					crestType={shouldRollCrest ? crestType : ''}
					combatArtDamageBonus={weaponArtDamageModifier}
					{shouldDoVisualRolls}
					{toggleVisualRolls}
				/>
			</div>
		{/if}
		{#if !showModal}
			<div class="rolls">
				<button style:height={'100%'} on:click={onOpenAttackModal} disabled={!selectedWeapon}
					>ATTACK</button
				>
			</div>
		{/if}
		{#if queries.length > 0}
			<div class="options">
				<EntryPicker {queries} {selections} {onUpdateQuerySelection} />
				<button
					class="reset"
					on:click={() => {
						selections = undefined;
					}}>Reset Queries</button
				>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.outer {
		background-color: #4d3c52a3;
	}
	.container {
		margin: 10px;

		display: grid;
		grid-template-areas:
			'header header'
			'rolls buttons'
			'picks picks';

		// &.no-queries {
		// 	grid-template-areas:
		// 		'header header'
		// 		'rolls buttons';
		// 	grid-template-rows: min-content 1fr;
		// }

		grid-template-rows: min-content 1fr min-content;
		grid-template-columns: 1fr min-content;
		row-gap: 5px;
		height: calc(100% - 20px);

		button {
			width: 100px;
			border-radius: 0 1px 1px 0;
		}
	}

	.calcs {
		display: grid;
		grid-template-columns: 1fr min-content;
		background-color: #dfd6c2;
		padding: 5px;
		> h2 {
			font-size: 20px;
		}
	}

	.result {
		white-space: nowrap;
		margin: 0;
		margin-left: 5px;
		margin-right: 5px;
	}

	.content {
		margin: 0;
	}

	.calc {
		border-right: 1px solid gray;
		> h2 {
			font-size: 20px;
		}
	}
	.attack-container {
		display: flex;
	}
	.damage-container {
		display: flex;
	}
	.crit-container {
		display: flex;
	}
	.source {
		font-size: 20px;
	}
	.modifiers {
		color: royalblue;
	}

	.options {
		position: relative;
		display: flex;
		flex-direction: row;
		grid-area: picks;
	}

	.reset {
		height: 100%;
		align-self: stretch;
	}

	.crest-description {
		font-size: 15px;
		font-weight: normal;
	}

	.crest-container {
		grid-column: 1 / span 2;
		> h2 {
			font-size: 20px;
		}
	}

	.rolls {
		button {
			border-radius: 0 1px 1px 0;
		}
	}
</style>
