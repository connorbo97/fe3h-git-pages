<script lang="ts">
	import CategoryHeader from 'src/common/categoryHeader.svelte';
	import {
		DEFAULT_PLAYER_SKILL_BONUSES,
		DEFAULT_PLAYER_SKILL_PROFICIENCY,
		DEFAULT_PLAYER_STAT,
		CLASS_TO_FEATURES,
		PLAYER_SKILL
	} from 'src/constants';
	import { SkillProficiency } from 'src/constants/playerSkills';
	import SkillEntry from './skillEntry.svelte';

	export let stats = DEFAULT_PLAYER_STAT;
	export let skillProficiency = DEFAULT_PLAYER_SKILL_PROFICIENCY;
	export let skillBonus = DEFAULT_PLAYER_SKILL_BONUSES;
	export let onToggleSkillProficiency: Function;
	export let equippedClass: any;
	export let masteredClasses: any;
	export let playerName: any;

	$: classProficiencies = {
		...(equippedClass ? CLASS_TO_FEATURES[equippedClass].whenEquipped.playerSkills : {}),
		...masteredClasses.reduce((acc, c) => {
			acc = { ...acc, ...CLASS_TO_FEATURES[c].whenMastered?.playerSkills };
			return acc;
		}, {})
	};

	$: allProficiencies = Object.keys(classProficiencies).reduce(
		(acc, key: string) => {
			if (acc[key] === undefined) {
				acc[key] = classProficiencies[key];
			} else {
				acc[key] = Math.max(acc[key], classProficiencies[key]);
			}
			return acc;
		},
		{ ...skillProficiency }
	);
</script>

<div class="container">
	<CategoryHeader label={'Skills'} />
	<div class="divider" />
	<div class="skills">
		{#each Object.values(PLAYER_SKILL) as skill}
			<SkillEntry
				{playerName}
				{skill}
				{stats}
				{skillBonus}
				{classProficiencies}
				skillProficiency={allProficiencies}
				{onToggleSkillProficiency}
			/>
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		background-color: #dfd6c2;
		row-gap: 5px;

		height: 100%;

		flex: 1;
	}

	.skills {
		display: flex;
		flex-direction: column;
		overflow: auto;
	}
	.divider {
		margin-top: 1px;
		height: 1px;
		background-image: linear-gradient(to right, #bbb9ad, 75%, transparent);
		border-radius: 1px;
	}
</style>
