<script lang="ts">
	import NoticePrompt from 'src/common/noticePrompt.svelte';

	import PickOnePrompt from 'src/common/pickOnePrompt.svelte';
	import SvelteTip from 'src/common/SvelteTip.svelte';

	import {
		CLASS_TO_LABEL,
		CONTEXTS,
		LEVEL_UP_ORDER,
		PROFICIENCY_BONUS,
		WEAPON_LEVEL,
		WEAPON_LEVEL_TO_LABEL,
		WEAPON_LEVEL_TO_MAX_XP,
		WEAPON_TYPE,
		WEAPON_TYPE_TO_LABEL
	} from 'src/constants';
	import { CLASS_TO_FEATURES } from 'src/constants/classes';
	import { Dice } from 'src/constants/dice';
	import { TooltipStyle } from 'src/constants/enums';
	import { PLAYER_SKILL } from 'src/constants/playerSkills';
	import { PLAYER_STAT, PLAYER_STAT_TO_SHORT_LABEL } from 'src/constants/stats';
	import { WEAPON_TYPES_TO_LEVEL_FEATURES } from 'src/constants/weaponLevel';
	import { WEAPONS_TO_FEATURES } from 'src/constants/weapons';
	import { COMBAT_XP_OPTIONS, WEAPON_TYPE_TO_STAT } from 'src/constants/weaponType';
	import { getLevelUpDescription, getXPMoochText } from 'src/descriptionUtils';
	import { addEntryToChat } from 'src/rollUtils';
	import {
		addNumberPrefix,
		classBuilder,
		getModifierByPlayerStat,
		rollVisualDice
	} from 'src/utils';
	import { getContext } from 'svelte';
	import CombatXpForm from './combatXPForm.svelte';
	import LevelUpDescription from './levelUpDescription.svelte';
	const { open } = getContext(CONTEXTS.MODAL);

	export let unlockedClasses: any;
	export let weaponXP: XPMap;
	export let classXP: any;

	export let playerSkillProficiency;
	export let playerSkillBonus;

	export let onUpdateClassXP: any;
	export let onUpdateWeaponXP: any;

	export let customCombatArts: any;
	export let customCombatSkills: any;
	export let customWeapons: any;
	export let playerStats: any;

	export let onUpdatePlayerStats: any;
	export let onUpdateCustomCombatArts: any;
	export let onUpdateCustomCombatSkills: any;
	export let onUpdateCustomWeapons: any;

	export let equippedClass: any;

	export let playerName: any;

	let resetInputs = true;

	let levelUpAudio = new Audio('success-sound.webm');
	let failure = new Audio('failure.webm');
	let bell = new Audio('bell.webm');
	let itemReceived = new Audio('item-received.webm');
	let successSound = new Audio('success-sound.webm');

	$: {
		levelUpAudio.volume = 0.05;
		failure.volume = 0.05;
		bell.volume = 0.05;
		itemReceived.volume = 0.1;
		successSound.volume = 0.025;
	}

	const pauseAllAudios = () => {
		failure.pause();
		bell.pause();
		itemReceived.pause();
		successSound.pause();
	};
	const DEFAULT_ROLLS = 4;
	let rollsRemaining = DEFAULT_ROLLS;
	let greatAlreadyHappened = false;

	let statPerWeaponType = Object.keys(WEAPON_TYPE_TO_STAT).reduce((acc, key) => {
		acc[key] = WEAPON_TYPE_TO_STAT[key][0];

		return acc;
	}, {});

	$: db = getContext(CONTEXTS.DB)

	$: promptWeaponLevelUp = (type: any, level, onSuccess = () => {}, onClose = () => {}) => {
		pauseAllAudios();
		levelUpAudio.currentTime = 0;
		levelUpAudio.play();
		const pickOne = WEAPON_TYPES_TO_LEVEL_FEATURES[type][level]?.unlocks?.pickOne;

		if (!pickOne) {
			open(NoticePrompt, {
				header: `Unlocked ${WEAPON_TYPE_TO_LABEL[type]} level ${WEAPON_LEVEL_TO_LABEL[level]}`,
				childElement: LevelUpDescription,
				childElementProps: {
					type,
					level
				},
				SPECIAL_callOnClose: () => {
					onSuccess();
					onClose();
				}
			});
		} else {
			open(PickOnePrompt, {
				SPECIAL_callOnClose: () => {
					onClose();
				},
				pickOne,
				onSubmit: onSuccess,
				reason: `Unlocked ${WEAPON_TYPE_TO_LABEL[type]} level ${WEAPON_LEVEL_TO_LABEL[level]}`,
				customCombatArts,
				customCombatSkills,
				customWeapons,
				playerStats,
				onUpdatePlayerStats,
				onUpdateClassXP,
				onUpdateCustomCombatArts,
				onUpdateCustomCombatSkills,
				onUpdateCustomWeapons,
				descriptionElement: LevelUpDescription,
				descriptionElementProps: {
					type,
					level,
					disablePickOne: true
				}
			});
			open(PickOnePrompt, {
				SPECIAL_callOnClose: () => {
					onClose();
				},
				pickOne,
				onSubmit: onSuccess,
				reason: `Unlocked ${WEAPON_TYPE_TO_LABEL[type]} level ${WEAPON_LEVEL_TO_LABEL[level]}`,
				customCombatArts,
				customCombatSkills,
				customWeapons,
				playerStats,
				onUpdatePlayerStats,
				onUpdateClassXP,
				onUpdateCustomCombatArts,
				onUpdateCustomCombatSkills,
				onUpdateCustomWeapons,
				descriptionElement: LevelUpDescription,
				descriptionElementProps: {
					type,
					level,
					disablePickOne: true
				}
			});
		}
	};
	$: onWeaponXpChange = (value: any, { curLevel, curXP, maxXP, type, onSuccess }: any) => {
		return new Promise((res) => {
			let newLevel = curLevel;

			let newXP = curXP + value;

			const didSubmit = { current: false };

			const onSuccessPrompt = () => {
				onUpdateWeaponXP(type, newXP, newLevel);
				resetInputs = !resetInputs;
				onSuccess && onSuccess();

				res(true);
				didSubmit.current = true;
			};
			const onClosePrompt = () => {
				if (!didSubmit.current) {
					alert('Rolling back this Level Up b/c prompt was not completed');
					res(false);
				}
			};

			if (newXP >= maxXP) {
				newLevel = LEVEL_UP_ORDER[LEVEL_UP_ORDER.indexOf(curLevel) + 1] || curLevel;
				newXP = newXP - maxXP;
				console.log('should play', levelUpAudio);
				promptWeaponLevelUp(type, newLevel, onSuccessPrompt, onClosePrompt);
			} else {
				onSuccessPrompt();
			}
		});
	};
	$: onWeaponXPChangeFromInput = (e, args) => {
		const target = e.currentTarget;
		const parsedValue = parseInt(e.currentTarget.value);
		const onSuccess = () => {
			target.value = '';
		};

		onWeaponXpChange(parsedValue, { ...args, onSuccess });
	};
	$: onWeaponChangeLevel = (e: any, { type, curLevel }: any) => {
		const newLevel = e.currentTarget.value;

		const onSuccess = () => {
			onUpdateWeaponXP(type, 0, newLevel);
			resetInputs != resetInputs;
		};

		if (!curLevel || LEVEL_UP_ORDER.indexOf(curLevel) < LEVEL_UP_ORDER.indexOf(newLevel)) {
			promptWeaponLevelUp(type, newLevel, onSuccess);
		} else {
			onSuccess();
		}
	};

	$: rollXP = async (args) => {
		const { type: weaponType } = args;
		const curStatForType = statPerWeaponType[weaponType];
		const isAnimalHandling = curStatForType === PLAYER_SKILL.ANIMAL_HANDLING;
		const animalHandlingSkillProficiency =
			(playerSkillProficiency[PLAYER_SKILL.ANIMAL_HANDLING] * PROFICIENCY_BONUS || 0) +
			(playerSkillBonus[PLAYER_SKILL.ANIMAL_HANDLING] || 0);
		const statLabel = isAnimalHandling
			? 'Animal Handling'
			: PLAYER_STAT_TO_SHORT_LABEL[curStatForType];
		const statMod = isAnimalHandling
			? getModifierByPlayerStat(playerStats[PLAYER_STAT.WIS]) + animalHandlingSkillProficiency
			: getModifierByPlayerStat(playerStats[curStatForType]);
		const customResultBoxLabel = (_, finalCalcResult) => {
			let suffix = '';
			let moddedValue = finalCalcResult + statMod;
			if (finalCalcResult === 20) {
				suffix = 'Perfect: 16 XP + 1 roll!';
			} else if (finalCalcResult === 1 || moddedValue <= 1) {
				suffix = 'Awful: 0 XP';
			} else if (moddedValue <= 5) {
				suffix = 'Poor: 6 XP';
			} else if (moddedValue <= 15) {
				suffix = 'Good: 9 XP';
			} else {
				suffix = `Great: 12 XP ${!greatAlreadyHappened ? '+ 1 roll (once per session)' : ''}`;
			}

			const finalCalcStyle =
				finalCalcResult === 20 ? '"color: green"' : finalCalcResult === 1 ? '"color: red"' : '';

			return `<div><span style=${finalCalcStyle}>${finalCalcResult}</span> ${addNumberPrefix(
				statMod,
				true
			)}(${statLabel}) = ${moddedValue}</div><div style='text-align:center'>${suffix}</div>`;
		};
		const { value } = await rollVisualDice([Dice.d20], {
			customResultBoxLabel,
		});
		const finalValue = value + statMod;
		addEntryToChat(db, {
			playerName,
			rollName: "XP Roll (" + WEAPON_TYPE_TO_LABEL[weaponType] + ")",
			rollBonus: statMod,
			roll: finalValue + "",
			rollTooltip: value + addNumberPrefix(statMod),
		});

		let newRolls = rollsRemaining - 1;
		pauseAllAudios();
		if (value === 20) {
			successSound.currentTime = 0;
			successSound.play();
			onWeaponXpChange(16, args);
			newRolls += 1;
		} else if (value === 1 || finalValue <= 1) {
			failure.currentTime = 0;
			failure.play();
			//nothing
		} else if (finalValue <= 5) {
			failure.currentTime = 0;
			failure.play();
			onWeaponXpChange(6, args);
		} else if (finalValue <= 15) {
			itemReceived.currentTime = 0;
			itemReceived.play();
			onWeaponXpChange(9, args);
		} else {
			successSound.currentTime = 0;
			successSound.play();
			if (!greatAlreadyHappened) {
				newRolls += 1;
			}
			onWeaponXpChange(12, args);
			greatAlreadyHappened = true;
		}

		rollsRemaining = newRolls;
	};

	let focusedRow = { i: -1, weaponSide: true };
	const focusGenerator = (i, weaponSide) => () => {
		focusedRow = { i, weaponSide };
	};
</script>

<div class="container">
	<div class="weapon-xp-container">
		<div class="category">
			<u class="header" style:justify-content="flex-start">Type</u>
			<u class="header" style:text-align="center" style:white-space="nowrap"
				>XP (Current XP / XP Required to Level Up)</u
			>
			<span class="header" />
			<u class="header" style:text-align="center" style:white-space="nowrap">Lvl</u>
			<SvelteTip>
				<u class="header" style:text-align="center" style:white-space="nowrap">Stat Modifier</u>
				<div slot="t">The stat that will be added when doing XP rolls.</div>
			</SvelteTip>
			<span class="header" />
			{#each Object.keys(WEAPON_TYPE) as type, i}
				{@const curXP = weaponXP[type]?.total || 0}
				{@const curLevel = weaponXP[type]?.level || WEAPON_LEVEL.E}
				{@const nextLevel =
					LEVEL_UP_ORDER[LEVEL_UP_ORDER.findIndex((a) => a === weaponXP[type]?.level) + 1]}
				{@const nextLevelDescription = getLevelUpDescription(
					WEAPON_TYPES_TO_LEVEL_FEATURES[type]?.[nextLevel]
				)}
				{@const maxXP = WEAPON_LEVEL_TO_MAX_XP[curLevel]}
				<div
					class={classBuilder('label content', {
						focused: focusedRow.i === i && focusedRow.weaponSide
					})}
				>
					{WEAPON_TYPE_TO_LABEL[type]}
				</div>
				<div class="xp-bar content">
					<div class="fill" style:right={`${((maxXP - curXP) / maxXP) * 100.0}%`}>
						<span>{`${curXP} / ${maxXP}`}</span>
					</div>
				</div>
				<div class="form content">
					<div class="prompt">XP to Add</div>
					<input
						type="number"
						on:mouseover={focusGenerator(i, true)}
						on:mouseleave={focusGenerator(-1, true)}
						on:focus={focusGenerator(i, true)}
						on:change={(e) => onWeaponXPChangeFromInput(e, { curLevel, curXP, maxXP, type })}
					/>
				</div>
				{#key resetInputs}
					<SvelteTip tooltipStyle={TooltipStyle.BOTTOM_CENTER}>
						<div slot="t">
							<div>
								<u> Current Level: </u>
							</div>
							<div>
								{getLevelUpDescription(WEAPON_TYPES_TO_LEVEL_FEATURES[type]?.[curLevel]) ||
									'Nothing'}
							</div>
							<div>
								<u> On Level Up: </u>
							</div>
							<div>
								{nextLevelDescription || 'Nothing'}
							</div>
						</div>
						<div class="content">
							<select
								name="weapon_level"
								on:change={(e) => {
									resetInputs = !resetInputs;
									onWeaponChangeLevel(e, { type, curLevel });
								}}
								on:mouseover={focusGenerator(i, true)}
								on:mouseleave={focusGenerator(-1, true)}
								on:focus={focusGenerator(i, true)}
							>
								{#each Object.keys(WEAPON_LEVEL) as level}
									<option value={WEAPON_LEVEL[level]} selected={curLevel === level}>
										{WEAPON_LEVEL_TO_LABEL[level]}</option
									>
								{/each}
							</select>
						</div>
					</SvelteTip>
				{/key}
				{#if WEAPON_TYPE_TO_STAT[type].length > 1}
					<select
						class="content"
						on:change={(e) => {
							statPerWeaponType = { ...statPerWeaponType, [type]: e.currentTarget.value };
						}}
						on:mouseover={focusGenerator(i, true)}
						on:mouseleave={focusGenerator(-1, true)}
						on:focus={focusGenerator(i, true)}
					>
						{#each WEAPON_TYPE_TO_STAT[type] as stat}
							<option value={stat} selected={statPerWeaponType[type] === stat}
								>{PLAYER_STAT_TO_SHORT_LABEL[stat]}</option
							>
						{/each}
					</select>
				{/if}
				{#if WEAPON_TYPE_TO_STAT[type].length <= 1}
					<span style:text-align="center" style:cursor="default" class="content"
						>{PLAYER_STAT_TO_SHORT_LABEL[WEAPON_TYPE_TO_STAT[type][0]]}</span
					>
				{/if}
				<SvelteTip tooltipStyle={TooltipStyle.BOTTOM_CENTER} tooltipPositionerStyle="z-index: 100">
					<button
						disabled={rollsRemaining <= 0}
						on:click={() => rollXP({ curLevel, curXP, maxXP, type })}
						on:mouseover={focusGenerator(i, true)}
						on:mouseleave={focusGenerator(-1, true)}
						on:focus={focusGenerator(i, true)}
					>
						Roll</button
					>
					<div slot="t">
						<div>Roll for your lecture:</div>
						<div class="test">
							<span>{'<= 1 Awful'}</span>
							<span>= 0 XP</span>
						</div>
						<div class="test">
							<span>{'2-5 Poor'}</span>
							<span>= 6 XP</span>
						</div>
						<div class="test">
							<span>6-15 Good</span>
							<span>= 9 XP</span>
						</div>
						<div class="test">
							<span>{'>= 16 Great'}</span>
							<span> = 12 XP and +1 Roll (1 per session)</span>
						</div>
						<div class="test">
							<span>Nat 1 Awful </span>
							<span>= 0 XP</span>
						</div>
						<div class="test">
							<span>Nat 20 Perfect </span>
							<span> = 16 XP and +1 Roll</span>
						</div>
					</div>
				</SvelteTip>
			{/each}
		</div>
		<CombatXpForm {equippedClass} {weaponXP} {onWeaponXpChange} />
		<div class="auto-xp" style:flex="1">
			<span style:flex="1"><u>Automatic Training</u></span>
			<SvelteTip>
				<div slot="t">
					<span>
						This text turns orange when you have rolled a 16+ for this training session already.
						Meaning any more 16+ will not add 1 to your available training sessions.
					</span>
					<br />
					<span>Will be reset when you click the Reset Rolls button</span>
				</div>
				<span class={classBuilder({ 'great-already': greatAlreadyHappened })}
					># of rolls remaining:</span
				>
			</SvelteTip>
			<input
				type="number"
				value={rollsRemaining}
				on:change={(e) => (rollsRemaining = parseInt(e.currentTarget.value))}
			/>
			<button
				on:click={() => {
					rollsRemaining = DEFAULT_ROLLS;
					greatAlreadyHappened = false;
				}}>Reset Rolls</button
			>
		</div>
	</div>
	<div class="category class-xp-container">
		<u class="header" style:justify-content="flex-start">Class</u>
		<u
			class="header"
			style:text-align="center"
			style:white-space="nowrap"
			style:justify-content="flex-start"
		>
			Class XP (Current Battles / Battles Required to Master)</u
		>
		<span class="header" />
		<span class="header" style:padding="0" />
		<span class="header" style:padding="0" />
		<span class="header" style:padding="0" />
		{#each unlockedClasses as curClass, i}
			{@const curXP = classXP[curClass]?.total || 0}
			{@const maxXP = 10}
			{@const mastered = classXP[curClass]?.mastered}
			<div
				class={classBuilder('label content', {
					focused: focusedRow.i === i && !focusedRow.weaponSide
				})}
			>
				{CLASS_TO_LABEL[curClass]}
			</div>
			<div class="xp-bar content">
				<div
					class={`fill ${mastered ? 'mastered' : ''}`}
					style:right={`${((maxXP - curXP) / maxXP) * 100.0}%`}
				>
					<span>{`${curXP} / ${maxXP}`}</span>
				</div>
			</div>
			<div class="form">
				<div class="prompt">XP to Add</div>
				<input
					type="number"
					on:mouseover={focusGenerator(i, false)}
					on:mouseleave={focusGenerator(-1, false)}
					on:focus={focusGenerator(i, false)}
					on:change={(e) => {
						let parsedValue = parseInt(e.currentTarget.value);

						let newXP = curXP + parsedValue;

						if (newXP >= maxXP) {
							newXP = maxXP;
							levelUpAudio.currentTime = 0;
							levelUpAudio.play();
						}

						onUpdateClassXP(curClass, newXP, newXP === maxXP);

						e.currentTarget.value = '';
					}}
				/>
			</div>
			<span />
			<span />
			<span />
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		> * {
			flex: 1;
		}
		column-gap: 5px;
		padding: 5px;
		user-select: none;
	}
	.weapon-xp-container {
		display: flex;
		flex-direction: column;
		border-radius: 5px;
		background-color: #eae8da;
		border: 3px solid #c9c6bb;
		padding-bottom: 10px;
	}
	.class-xp-container {
		background-color: #eae8da;
		border: 3px solid #c9c6bb;
	}
	.category {
		padding: 10px;
		border-radius: 5px;

		display: grid;
		grid-template-columns: max-content 1fr max-content min-content min-content max-content;
		grid-auto-rows: min-content;
		align-items: center;
		row-gap: 5px;
	}
	.xp-bar {
		height: 100%;
		flex: 1;
		position: relative;
		background-color: white;
		outline: 1px solid black;
		border-radius: 5px;

		.fill {
			position: absolute;
			display: flex;
			align-items: center;
			inset: 2px;
			border-radius: 5px;
			background-color: #5ecd5f;
			white-space: nowrap;
			> span {
				margin-left: 2px;
			}
		}
	}
	.form {
		display: flex;
		align-items: center;
		column-gap: 5px;
		input {
			width: 40px;
		}
	}

	.auto-xp {
		display: flex;
		align-items: flex-end;
		padding: 5px;
		flex: 1;
		column-gap: 5px;
		> input {
			width: 50px;
		}
	}

	.mastered.mastered {
		background-color: lightskyblue;
	}
	.test {
		display: flex;
		justify-content: space-between;
		column-gap: 5px;
		> :first-child {
			flex: 1;
			text-align: left;
		}
	}

	.great-already {
		color: orange;
	}

	.focused {
		color: red;
	}

	.hidden-container {
		position: absolute;
		opacity: 0;
		z-index: -999;
	}
	.level-up-text {
		color: red;
	}

	.header {
		background-color: #574d65;
		color: white;
		padding: 3px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.content {
		margin-left: 5px;
		margin-right: 5px;
	}
</style>
