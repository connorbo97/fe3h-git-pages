<script lang="ts">
	import SvelteTip from 'src/common/SvelteTip.svelte';
	import { CONTEXTS } from 'src/constants';
	import { COMBAT_ARTS_TO_FEATURES } from 'src/constants/combatArts';

	import { CRESTS_TO_FEATURES, CRESTS_TO_LABELS } from 'src/constants/crests';
	import { Dice } from 'src/constants/dice';
	import { TooltipStyle } from 'src/constants/enums';
	import { HEALING_MAGIC, MAGIC_WEAPONS } from 'src/constants/weapons';
	import { addEntryToChat, checkCalcRequiresRoll } from 'src/rollUtils';
	import {
		classBuilder,
		copyToClipboard,
		isDice,
		printCalc,
		rollCalc,
		rollDice,
		rollVisualDice
	} from 'src/utils';
	import { getContext } from 'svelte';

	const db = getContext(CONTEXTS.DB);

	export let playerName: any;

	export let onCloseModal: any;

	export let allWeapons: any;
	export let allCombatArts: any;

	export let weaponUses: any;
	export let onUpdateWeaponUses: any;

	export let crestConservesResource: any;

	export let attackCalc: any;
	export let damageCalc: any;
	export let critModifier: any;

	export let combatArtDamageBonus: any;

	export let crestType: any;
	export let crestDC: any;
	export let crestDamage: any;
	export let crestCombatArtDamageModifier: any;

	export let selectedWeapon: any;
	export let selectedCombatArt: any;

	export let curSuperiorityDies: any;
	export let setCurSuperiorityDie: any;

	export let shouldDoVisualRolls: any;
	export let toggleVisualRolls: any;

	let crestSuccess: boolean = false;

	let attackRoll: any = '';
	let attackMod: any = '';

	let damageRoll: any = '';
	let damageRollText: any = '';
	let crestDamageRoll: any = '';

	let critRoll: any = '';
	let critMultiplier = 1;

	let crestRoll: any = '';

	$: {
		selectedWeapon;

		attackRoll = '';
		attackMod = '';
		damageRoll = '';
		damageRollText = '';
		crestDamageRoll = '';
		crestDamageRoll = '';
		critRoll = '';
		critMultiplier = 1;
		crestRoll = '';
	}

	$: isHealWeapon = HEALING_MAGIC.has(selectedWeapon);
	$: calcBaseDieCost = () => {
		const combatArtDieCost = COMBAT_ARTS_TO_FEATURES[selectedCombatArt]?.dieCost;

		if (!selectedCombatArt || !combatArtDieCost) {
			return 1;
		}

		const combatArtAffectedDieCost = rollCalc([combatArtDieCost.roll]) >= combatArtDieCost.target;
		const combatArtDieMod = combatArtDieCost?.mod || 0;

		return combatArtAffectedDieCost ? Math.max(1 + combatArtDieMod, 0) : 1;
	};
	$: curWeaponUses =
		weaponUses[selectedWeapon] === undefined ? Infinity : weaponUses[selectedWeapon];
	let superiorityDieCost = 1;
	let superiorityDieCostModifier = 1;
	let weaponCostModifier = 1;

	$: crestActivated = crestRoll >= crestDC;
	$: prefixedAttackCalc = printCalc(attackCalc, true);

	$: onAttackRoll = async () => {
		attackRoll = '';
		if (shouldDoVisualRolls) {
			attackRoll = await rollVisualDice([Dice.d20], {
				clearTimeout: 250,
				disableResultBox: true
			}).then((res: any) => res.value);
		} else {
			attackRoll = rollDice(20);
		}
		attackMod = rollCalc(attackCalc);
	};
	const onDamageRoll = async () => {
		damageRoll = '';
		damageRollText = '';
		if (checkCalcRequiresRoll(damageCalc)) {
			const mod = damageCalc.filter((d) => !isDice(d));
			const dice = damageCalc.filter(isDice);
			if (shouldDoVisualRolls) {
				const res = await rollVisualDice(dice, { modifier: mod });
				damageRoll = res.value;
				damageRollText = res.resultText;
			} else {
				const { value, resultText } = rollCalc(damageCalc, { returnAsString: true });
				damageRoll = value;
				damageRollText = resultText;
			}
		} else {
			damageRoll = rollCalc(damageCalc);
			damageRollText = damageRoll + '';
		}
	};
	const onCritRoll = async () => {
		critRoll = '';
		if (shouldDoVisualRolls) {
			critRoll = await rollVisualDice([Dice.d20], {
				clearTimeout: 250,
				disableResultBox: true
			}).then((res: any) => res.value);
		} else {
			critRoll = rollDice(20);
		}
		critMultiplier = critRoll >= 20 - critModifier ? (critRoll === 20 ? 3 : 2) : 1;
	};
	$: getCrestDamageRollText = () => {
		if (crestDamage.length) {
			return printCalc(crestDamage);
		} else if (crestCombatArtDamageModifier > 1) {
			return `${crestCombatArtDamageModifier}*${printCalc(combatArtDamageBonus)}`;
		}

		return '0';
	};
	$: onCrestRoll = async () => {
		crestRoll = '';
		if (shouldDoVisualRolls) {
			crestRoll = await rollVisualDice([Dice.d20], {
				clearTimeout: 250,
				disableResultBox: true
			}).then((res: any) => res.value);
		} else {
			crestRoll = rollDice(20);
		}

		if (crestRoll >= crestDC) {
			if (crestDamage.length) {
				crestDamageRoll = rollCalc(crestDamage);
			} else if (crestCombatArtDamageModifier > 1) {
				crestDamageRoll = Math.round(rollCalc(combatArtDamageBonus) * crestCombatArtDamageModifier);
			}
		} else {
			crestDamageRoll = '';
		}

		return crestDamageRoll;
	};

	$: combatArtLabel = selectedCombatArt
		? ` (${allCombatArts.fullFeatures[selectedCombatArt]?.label})`
		: '';
	$: weaponLabel = allWeapons.fullFeatures[selectedWeapon]?.label;
	$: headerLabel = `${weaponLabel}` + combatArtLabel;
	$: didCrit = critRoll >= 20 - critModifier;
	$: baseDamageRoll = parseInt(damageRoll) + parseInt(crestDamageRoll || 0);
	$: baseDamageRollText = `${didCrit ? '(' : ''}${damageRollText}${
		crestDamageRoll ? ` + ${crestDamageRoll}(crest)` : ''
	}${didCrit ? `) * ${critMultiplier} (crit)` : ''}`;
	$: finalDamageRoll = critMultiplier * baseDamageRoll;
	$: critRangeText = critModifier === 0 ? 20 : `${20 - critModifier} - 20`;

	$: rollDisabled = (selectedCombatArt && curSuperiorityDies <= 0) || curWeaponUses <= 0;

	$: getRoll20Text = () => {
		const critRoll = 20;
		const crestRoll = rollDice(20);

		const critActivated = critRoll > 20 - critModifier;
		const crestActivated = critRoll > 20 - critModifier;
		const calc = `${printCalc(damageCalc)}${
			crestActivated && crestRoll >= crestDC ? `+${getCrestDamageRollText()}` : ''
		}`;
		const damageResultText2 = `/roll ${calc}${
			critActivated ? '+' + (critRoll === 20 ? calc + '+' + calc : calc) : ''
		}${crestActivated ? ` [Crest Activated [${crestRoll}]]` : ''}${
			critActivated ? ` [CRIT[${critRoll}]]` : ''
		} [ID${Math.floor(Math.random() * 1000000)}]`;

		const attackRollText = `&{template:atk} {{rname=[${weaponLabel}](\`${damageResultText2})}} {{mod=${
			selectedCombatArt ? allCombatArts.fullFeatures[selectedCombatArt]?.label : '+0'
		}}} {{r1=[[1d20${prefixedAttackCalc}]]}} {{normal=1}} {{charname=${playerName}}}`;

		return attackRollText;
	};
	// $: DEPRECATED_getRoll20ResultText = () => {
	// 	const intro = `&{template:desc} {{desc=${weaponLabel}${
	// 		selectedCombatArt ? ` (${allCombatArts.fullFeatures[selectedCombatArt]?.label})` : ''
	// 	} attack from ${playerName}}}`;
	// 	const attackRollText = `&{template:simple} {{rname=Attack Roll}} {{normal=1}} {{r1=${attackRoll} + ${attackMod} = ${
	// 		attackRoll + attackMod
	// 	}}}`;
	// 	const critRollText =
	// 		critRoll !== ''
	// 			? `&{template:simple} {{rname=Crit Roll}} {{mod=${critRangeText}}} {{r1=${critRoll} + ${critModifier}${
	// 					didCrit ? ` = (CRIT)` : ''
	// 			  }}} {{normal=1}} ${didCrit ? `{{charname=${critModifier}x damage}}` : ''}`
	// 			: '';
	// 	const crestRollText =
	// 		crestType && crestRoll !== ''
	// 			? `&{template:simple} {{rname=Crest Roll}} {{mod=DC ${crestDC}}} {{r1=${crestRoll}${
	// 					crestActivated ? ' = (ACTIVATED)' : ''
	// 			  }}} {{normal=1}} ${
	// 					crestActivated ? `{{charname=${CRESTS_TO_FEATURES[crestType].description}}}` : ''
	// 			  }`
	// 			: '';
	// 	// const damageRollText = `&{template:dmg} {{rname=Damage}} {{damage=1}} {{dmg1flag=1}} {{dmg1=${baseDamageRollText}}} {{dmg2flag=1}} {{dmg2== ${finalDamageRoll}}}`;
	// 	const damageRollText = `&{template:simple} {{rname=Damage}} {{normal=1}} {{r1=${finalDamageRoll}}} {{charname=${baseDamageRollText}}}`;

	// 	return [intro, attackRollText, critRollText, crestRollText, damageRollText].join('\n');
	// };

	$: getRoll20AttackResultText = (addIntro = false) => {
		const attackRollText = `&{template:simple} {{rname=Attack Roll}} {{normal=1}} {{r1=${
			attackRoll + attackMod
		}}} {{charname=${attackRoll} + ${attackMod}}}`;

		if (addIntro) {
			return [
				`&{template:desc} {{desc=${weaponLabel}${
					selectedCombatArt ? ` (${allCombatArts.fullFeatures[selectedCombatArt]?.label})` : ''
				} attack roll from ${playerName}}}`,
				attackRollText
			].join('\n');
		}

		return attackRollText;
	};
	$: getRoll20DamageResultText = (addIntro = false) => {
		const damageResultText = `&{template:simple} {{rname=Damage}} {{normal=1}} {{r1=${finalDamageRoll}}} {{charname=${baseDamageRollText}}}`;

		if (addIntro) {
			return [
				`&{template:desc} {{desc=${weaponLabel}${
					selectedCombatArt ? ` (${allCombatArts.fullFeatures[selectedCombatArt]?.label})` : ''
				} damage roll from ${playerName}}}`,
				damageResultText
			].join('\n');
		}

		return damageResultText;
	};
	$: getRoll20ResultText = () => {
		const intro = `&{template:desc} {{desc=${weaponLabel}${
			selectedCombatArt ? ` (${allCombatArts.fullFeatures[selectedCombatArt]?.label})` : ''
		} attack from ${playerName}}}`;
		const attackRollText = getRoll20AttackResultText();
		const critRollText =
			critRoll !== ''
				? `&{template:simple} {{rname=Crit Roll}} {{mod=${critRangeText}}} {{r1=${
						didCrit ? `CRIT` : 'normal'
				  } (${critRoll})}} {{normal=1}} ${didCrit ? `{{charname=${critMultiplier}x damage}}` : ''}`
				: '';
		const crestRollText =
			crestType && crestRoll !== ''
				? `&{template:simple} {{rname=Crest Roll}} {{mod=DC ${crestDC}}} {{r1=${
						crestActivated ? `ACTIVATED` : 'normal'
				  } (${crestRoll})}}$ {{normal=1}} ${
						crestActivated ? `{{charname=${CRESTS_TO_FEATURES[crestType].description}}}` : ''
				  }`
				: '';
		const damageRollText = getRoll20DamageResultText();

		return [intro, attackRollText, critRollText, crestRollText, damageRollText].join('\n');
	};
	$: onRollAll = async () => {
		superiorityDieCost = 1;
		weaponCostModifier = 1;
		superiorityDieCostModifier = 1;

		attackRoll = '';
		damageRoll = '';
		damageRollText = '';
		critRoll = '';
		crestRoll = '';

		try {
			if (!isHealWeapon) {
				await onAttackRoll();
			}
			const {
				roll = 0,
				target = 1,
				mult = 1
			} = allWeapons.fullFeatures[selectedWeapon]?.dieCost || {};
			superiorityDieCost = calcBaseDieCost() * (rollCalc([roll]) >= target ? mult : 1);

			if (!isHealWeapon && critModifier >= 0) {
				await onCritRoll();
			}
			if (crestType) {
				await onCrestRoll();
				if (crestRoll >= crestDC && crestConservesResource) {
					if (selectedCombatArt) {
						superiorityDieCostModifier = 0;
					} else if (MAGIC_WEAPONS.includes(selectedWeapon)) {
						weaponCostModifier = 0;
					}
				}
			}
			await onDamageRoll();
		} catch (err) {
			console.error(err);
			alert('wait until all rolls have finished');
		}

		const entry: any = {
			playerName,
			type: "ATTACK_ROLL",
			attackName: headerLabel
		};

		if (attackRoll !== '') {
			entry.attackRoll = attackRoll + attackMod;
		}

		if (critRoll !== '') {
			entry.critRoll =
				critRoll >= 20 - critModifier ? `CRIT${critRoll === 20 ? '(20)' : ''}` : '--';
		}

		if (crestRoll !== '') {
			entry.crestName = CRESTS_TO_LABELS[crestType] || '';
			entry.crestRoll = crestRoll >= crestDC ? `ACTIVATED` : '--';
		}

		if (damageRoll !== '') {
			entry.damageRoll = (parseInt(damageRoll) + parseInt(crestDamageRoll || 0)) * critMultiplier;
			if (isHealWeapon) {
				entry.isHealWeapon = true;
			}
		}

		addEntryToChat(db, entry);

		if (weaponCostModifier !== 0) {
			onUpdateWeaponUses(selectedWeapon, -1 * weaponCostModifier);
		}

		if (selectedCombatArt) {
			setCurSuperiorityDie(curSuperiorityDies - superiorityDieCost * superiorityDieCostModifier);
		}
	};
</script>

<div class="container">
	<div class="actions">
		<button
			disabled={attackRoll === ''}
			on:click={() => {
				copyToClipboard(getRoll20ResultText());
			}}
		>
			Copy Results
		</button>
		<button
			disabled={attackRoll === ''}
			on:click={() => copyToClipboard(getRoll20AttackResultText(true))}
			>Copy Attack Result Only</button
		>
		<button
			disabled={attackRoll === ''}
			on:click={() => copyToClipboard(getRoll20DamageResultText(true))}
			>Copy Damage Result Only</button
		>
		<button on:click={() => copyToClipboard(getRoll20Text())}>Copy Attack Command</button>
		<!-- <div style:display="flex" style:flex="1" style:justify-content="flex-end"> -->
		<button style:flex="1" on:click={onCloseModal}>Back to Breakdown</button>
		<!-- </div> -->
	</div>
	<div class="content">
		<div class="rolls-container">
			<div class="rolls">
				{#if !isHealWeapon}
					<div class="attack">
						<h3>Attack</h3>
						<div class="content">{prefixedAttackCalc}</div>
						{#if attackRoll}
							<SvelteTip>
								<button class="re-roller" on:click={onAttackRoll}>Re-roll</button>
								<div slot="t">
									Only meant to be used for advantage/disadvantage. Will not automatically decrement
									your superiority die or weapon uses
								</div>
							</SvelteTip>
						{/if}
					</div>
				{/if}
				{#if !isHealWeapon && critModifier >= 0}
					<div class="crit">
						<h3>Crit Range</h3>
						<div class="content">
							<span>{critRangeText}</span>
						</div>
						<!-- <button on:click={onCritRoll}>Roll</button> -->
					</div>
				{/if}
				{#if crestType}
					<SvelteTip tooltipStyle={TooltipStyle.CENTER}>
						<div class="crest">
							<h3>Crest of {CRESTS_TO_LABELS[crestType]}</h3>
							<div class="content">
								{#if crestDC && crestDC <= 20}
									<span>DC {crestDC}</span>
								{/if}
							</div>
						</div>
						<div slot="t">{CRESTS_TO_FEATURES[crestType].description}</div>
					</SvelteTip>
					<!-- <button on:click={onCrestRoll}>Roll</button> -->
				{/if}
				<div class="damage">
					<h3>{isHealWeapon ? 'HP Restored' : 'Damage'}</h3>
					<div class="content">
						{printCalc(damageCalc)}
						{#if crestSuccess && crestDamage}
							<span>+ crestDamage</span>
						{/if}
					</div>
					<!-- <button on:click={onDamageRoll}>Roll</button> -->
				</div>
			</div>
			<div class="result">
				{#if !isHealWeapon}
					<div class="attack">
						<div>
							{attackRoll !== '' && attackMod !== ''
								? `${attackRoll} + ${attackMod} = ${attackRoll + attackMod}`
								: '...'}
						</div>
						{#if attackRoll !== '' && allCombatArts.fullFeatures[selectedCombatArt]?.description}
							<div class="combat-art-note">
								{allCombatArts.fullFeatures[selectedCombatArt]?.description}
							</div>
						{/if}
						{#if superiorityDieCost > 1}
							<div class="cf">Cost {superiorityDieCost - 1} extra superiority die</div>
						{/if}
						{#if superiorityDieCost < 1}
							<div class="cs">Cost 0 superiority die</div>
						{/if}
					</div>
				{/if}
				{#if !isHealWeapon && critModifier >= 0}
					<div class="crit">
						{#if critRoll !== ''}
							<div class="">
								<span class={critRoll >= 20 - critModifier ? 'cs' : ''}>
									{critRoll >= 20 - critModifier ? 'CRIT' : 'Normal'}
								</span>
								<span class={critRoll === 20 ? 'cs' : ''}>({critRoll})</span>
							</div>
							{#if critRoll >= 20 - critModifier}
								<div>
									{critRoll === 20 ? '3' : '2'}x Damage
								</div>
							{/if}
						{/if}
						{#if critRoll === ''}
							...
						{/if}
					</div>
				{/if}
				{#if crestType}
					<div class="crest">
						{#if crestRoll !== ''}
							{#if crestActivated}
								<div>
									<span class="cs">ACTIVATED</span><span>({crestRoll})</span>
								</div>
								{#if crestType}
									<div class="description">
										{CRESTS_TO_FEATURES[crestType]?.description}
									</div>
								{/if}
							{/if}
							{#if !crestActivated}
								<span>Normal</span><span>({crestRoll})</span>
							{/if}
						{/if}
						{#if crestRoll === ''}
							...
						{/if}
					</div>
				{/if}
				<div class="damage" style:flex-direction="column">
					{#if damageRoll}
						<div class="damage-text">
							<span class={classBuilder({ mini: parseInt(baseDamageRollText) !== damageRoll })}>
								{baseDamageRollText}
							</span>
							{#if parseInt(baseDamageRollText) !== damageRoll}
								<span class="final-damage">= {finalDamageRoll}</span>
							{/if}
						</div>
					{/if}
					{#if !damageRoll}
						...
					{/if}
				</div>
			</div>
		</div>

		<div class="attack-button-container">
			<button
				on:click={() => onRollAll().then(() => copyToClipboard(getRoll20ResultText()))}
				disabled={rollDisabled || !selectedWeapon}
				class={classBuilder('attack-button', { disabled: rollDisabled || !selectedWeapon })}
			>
				{rollDisabled
					? curWeaponUses <= 0
						? 'Out of weapon uses'
						: 'Out of Superiority Dies'
					: selectedWeapon
					? 'Roll Attack'
					: 'Select a weapon'}
			</button>
			<span>
				<span>Roll visual dice?</span>
				<input type="checkbox" checked={shouldDoVisualRolls} on:click={() => toggleVisualRolls()} />
			</span>
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		background-color: #dfd6c2;
		h3 {
			margin: 0;
		}

		height: 100%;
	}

	.content {
		display: flex;
		flex: 1;
	}
	.rolls-container {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.actions {
		display: flex;
		column-gap: 10px;
		align-items: center;
		padding: 5px;

		font-size: 15px;

		> button {
			font-size: 12px;
		}
	}
	.rolls {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: #362c49;
		color: white;
		text-align: center;
		> * {
			display: flex;
			flex-direction: column;
			align-items: center;
			row-gap: 5px;
			flex: 1;
			padding: 2px;
			&:not(:last-child) {
				border-right: 1px solid black;
			}

			> * {
				flex: 1;
			}
		}
	}
	.result {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: lightyellow;
		text-align: center;
		flex: 1;
		> * {
			display: flex;
			justify-content: center;
			align-items: center;
			flex: 1;
			padding: 10px;
			font-size: 20px;
			&:not(:last-child) {
				border-right: 1px solid black;
			}
		}
		.attack,
		.crit {
			display: flex;
			flex-direction: column;
			row-gap: 5px;
		}

		.crest {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			row-gap: 5px;

			text-align: center;
			.description {
				font-size: 12px;
			}
		}
		.combat-art-note {
			color: #7dbff0;
		}
	}

	// .damage {
	// }

	.cs {
		color: green;
	}

	.cf {
		color: maroon;
	}

	.attack-button-container {
		display: flex;
		flex-direction: column;
		row-gap: 5px;
		align-self: stretch;
		align-items: center;
	}

	.attack-button {
		padding: 5px;
		margin-bottom: 5px;
		font-size: 20px;
		flex: 1;
		background-color: rgb(114, 203, 114);
		align-self: stretch;
	}

	.disabled {
		background-color: rgba(255, 0, 0, 0.69);
		cursor: not-allowed;
	}

	.divider {
		background-color: black;
		margin-bottom: 10px;
		height: 2px;
	}

	.re-roller {
		height: 15px;
		margin: 0;
		padding: 0;
		font-size: 12px;
	}

	.mini {
		font-size: 12px;
	}

	.damage-text {
		display: flex;
		align-items: center;
		column-gap: 5px;
	}
	.final-damage {
		white-space: nowrap;
	}
</style>
