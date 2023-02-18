<script lang="ts">
	import CategoryHeader from 'src/common/categoryHeader.svelte';
	import PickOnePrompt from 'src/common/pickOnePrompt.svelte';
	import SvelteTip from 'src/common/SvelteTip.svelte';

	import { BEGINNER_CLASSES, CLASS_TO_LABEL, CONTEXTS, INTERMEDIATE_CLASSES } from 'src/constants';
	import { CLASS_TO_FEATURES } from 'src/constants/classes';
	import { classBuilder } from 'src/textUtils';
	import { getContext } from 'svelte';
	import ClassesEntry from './classesEntry.svelte';

	const { open } = getContext(CONTEXTS.MODAL);

	export let masteredClasses: any;

	export let equippedClass: string;
	export let setEquippedClass: Function;

	export let unlockedClasses: Array<string>;
	export let onUpdateUnlockedClasses: Function;

	export let customCombatSkills: any;
	export let onUpdateCustomCombatSkills: any;
	export let customCombatArts: any;
	export let onUpdateCustomCombatArts: any;
	export let customWeapons: any;
	export let onUpdateCustomWeapons: any;
	export let playerStats: any;
	export let onUpdatePlayerStats: any;

	let classChangeAudio = new Audio('class-change.webm');
	$: {
		classChangeAudio.volume = 0.05;
	}

	$: classSet = new Set(unlockedClasses);

	const onToggleEquipClass = (classToSelect: string) => {
		if (equippedClass === classToSelect) {
			setEquippedClass('');
		} else if (classSet.has(classToSelect)) {
			setEquippedClass(classToSelect);
		}
	};

	const promptUserIfRequired = (targetClass: any, onUnlockClass: any) => {
		open(PickOnePrompt, {
			pickOne: CLASS_TO_FEATURES[targetClass].unlocks.pickOne,
			reason: `Unlocked by obtaining ${CLASS_TO_LABEL[targetClass]} class`,
			customWeapons,
			customCombatArts,
			customCombatSkills,
			onUpdateCustomCombatArts,
			onUpdateCustomCombatSkills,
			onUpdateCustomWeapons,
			playerStats,
			onUpdatePlayerStats,
			onSubmit: onUnlockClass
		});
	};
	const onToggleClassActive = (targetClass: string) => {
		if (classSet.has(targetClass)) {
			if (equippedClass === targetClass) {
				setEquippedClass('');
			}
			onUpdateUnlockedClasses(Array.from(classSet).filter((val) => val !== targetClass));
		} else {
			classChangeAudio.currentTime = 0;
			classChangeAudio.play();

			const onUnlockClass = () => {
				const playerStatUnlocks = CLASS_TO_FEATURES[targetClass]?.unlocks?.playerStats;
				if (playerStatUnlocks) {
					const newStats = Object.keys(playerStatUnlocks).reduce(
						(acc, s) => {
							if (playerStatUnlocks?.[s] && acc[s] < (playerStatUnlocks?.[s] || 0)) {
								acc[s] = playerStatUnlocks[s];
							}
							return acc;
						},
						{ ...playerStats }
					);
					onUpdatePlayerStats(newStats);
				}
				onUpdateUnlockedClasses([...Array.from(classSet), targetClass]);
			};
			if (CLASS_TO_FEATURES[targetClass].unlocks.pickOne) {
				promptUserIfRequired(targetClass, onUnlockClass);
			} else {
				onUnlockClass();
			}
		}
	};
</script>

<div class="container">
	<CategoryHeader label="Classes" />
	<div class="category">
		<div class="label">Beginner</div>
		<div class="classes-container">
			{#each Array.from(BEGINNER_CLASSES) as targetClass}
				{@const isMastered = masteredClasses.includes(targetClass)}
				{@const isUnlocked = classSet?.has(targetClass)}
				<ClassesEntry
					{isMastered}
					{isUnlocked}
					{onToggleClassActive}
					{onToggleEquipClass}
					{targetClass}
					{equippedClass}
				/>
			{/each}
		</div>
	</div>
	<div class="category">
		<div class="label">Intermediate</div>
		<div class="classes-container">
			{#each Array.from(INTERMEDIATE_CLASSES) as targetClass}
				{@const isMastered = masteredClasses.includes(targetClass)}
				{@const isUnlocked = classSet?.has(targetClass)}
				<ClassesEntry
					{isMastered}
					{isUnlocked}
					{onToggleClassActive}
					{onToggleEquipClass}
					{targetClass}
					{equippedClass}
				/>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;

		background-color: #dfd6c2;
		border-left: 1px solid grey;

		row-gap: 10px;
		height: 100%;
		overflow-y: auto;

		border-right: 1px solid gray;
	}

	.classes-container {
		display: flex;
		flex-direction: column;
	}
</style>
