<script lang="ts">
	import { getSuperiorityDieFromClasses } from 'src/constants/classes';
	import RollChat from '../roll-chat/RollChat.svelte';

	import AttackCalc from './attackCalc.svelte';
	import Classes from './classes.svelte';
	import CombatArts from './combatArts.svelte';
	import CombatSkills from './combatSkills.svelte';
	import CombatStats from './combatStats.svelte';
	import Skills from './skills.svelte';
	import Stats from './stats.svelte';
	import Weapons from './weapons.svelte';

	export let playerName: any;

	export let homeMode: any;

	export let allWeapons: any;
	export let allCombatSkills: any;
	export let allCombatArts: any;

	export let masteredClasses: any;

	export let weaponUses: any;
	export let onUpdateWeaponUses: any;

	export let playerCrest: any;
	export let onUpdateCrest: any;

	export let selectedCombatArt: any;
	export let setSelectedCombatArt: any;

	export let selectedWeapon: any;
	export let setSelectedWeapon: any;

	export let playerStats: any;
	export let onUpdatePlayerStats: any;

	export let customCombatSkills: any;
	export let onUpdateCustomCombatSkills: any;

	export let customCombatArts: any;
	export let onUpdateCustomCombatArts: any;

	export let customWeapons: any;
	export let onUpdateCustomWeapons: any;

	export let playerSkillBonus: any;

	export let playerSkillProficiency: any;
	export let onToggleSkillProficiency: any;

	export let equippedWeapons: any;
	export let onToggleEquippedWeapons: any;

	export let equippedCombatArts: any;
	export let onToggleCombatArts: any;

	export let equippedCombatSkills: any;
	export let onToggleCombatSkill: any;

	export let equippedClass: any;
	export let setEquippedClass: any;

	export let unlockedClasses: any;
	export let onUpdateUnlockedClasses: any;

	// chat stuff
	export let chatEntries: any;
	export let spoilersOn: any;
	export let toggleSpoilersOn: any;
	export let alreadyRevealed: any;
	export let setAlreadyRevealed: any;


	let prevMax = { current: 0 };
	$: maxSuperiorityDie = getSuperiorityDieFromClasses(unlockedClasses);
	let curSuperiorityDies = maxSuperiorityDie;
	$: {
		if (prevMax.current !== maxSuperiorityDie) {
			curSuperiorityDies = maxSuperiorityDie;
			prevMax.current = maxSuperiorityDie;
		}
	}

	const setCurSuperiorityDie = (val) => {
		curSuperiorityDies = val;
	};
</script>

<div class="container">
	{#if homeMode % 3 !== 2}
		<div class="stats">
			<Stats stats={playerStats} {playerName} {onUpdatePlayerStats} {playerCrest} {onUpdateCrest} />
		</div>
		<div class="skills">
			<Skills
				stats={playerStats}
				{playerName}
				skillProficiency={playerSkillProficiency}
				skillBonus={playerSkillBonus}
				{onToggleSkillProficiency}
				{equippedClass}
				{masteredClasses}
			/>
		</div>
	{/if}
	{#if homeMode % 3 === 0}
		<div class="classes">
			<Classes
				{equippedClass}
				{setEquippedClass}
				{unlockedClasses}
				{onUpdateUnlockedClasses}
				{masteredClasses}
				{customCombatSkills}
				{onUpdateCustomCombatSkills}
				{customWeapons}
				{onUpdateCustomWeapons}
				{customCombatArts}
				{onUpdateCustomCombatArts}
				{playerStats}
				{onUpdatePlayerStats}
			/>
		</div>
		<div class="arts">
			<CombatArts
				{allCombatArts}
				{equippedCombatArts}
				{onToggleCombatArts}
				{equippedWeapons}
				{customCombatArts}
				{onUpdateCustomCombatArts}
			/>
			<CombatSkills
				{allCombatSkills}
				{equippedCombatSkills}
				{onToggleCombatSkill}
				{customCombatSkills}
				{onUpdateCustomCombatSkills}
			/>
		</div>
	{/if}
	{#if homeMode %3 !== 1}
		<div class="rest">
			<div class="weapons">
				<Weapons
					{allWeapons}
					{equippedWeapons}
					{onToggleEquippedWeapons}
					{equippedCombatSkills}
					{equippedClass}
					{weaponUses}
					{onUpdateWeaponUses}
					{curSuperiorityDies}
					{maxSuperiorityDie}
					{setCurSuperiorityDie}
					{customWeapons}
					{onUpdateCustomWeapons}
				/>
			</div>
			<div class="other">
				<CombatStats
					stats={playerStats}
					{allWeapons}
					{equippedClass}
					{unlockedClasses}
					{equippedCombatSkills}
					{selectedWeapon}
					{equippedWeapons}
					{equippedCombatArts}
					{allCombatSkills}
				/>
				<AttackCalc
					{playerName}
					{equippedClass}
					{equippedWeapons}
					{equippedCombatArts}
					{equippedCombatSkills}
					{weaponUses}
					{onUpdateWeaponUses}
					{curSuperiorityDies}
					{setCurSuperiorityDie}
					{allWeapons}
					{allCombatArts}
					{playerCrest}
					{playerStats}
					{selectedWeapon}
					{setSelectedWeapon}
					{selectedCombatArt}
					{setSelectedCombatArt}
				/>
			</div>
		</div>
	{/if}
	{#if homeMode % 3 !== 0}
		<div style:grid-area={homeMode % 3 === 1 ? "1 / classes/ 1 / rest" : "1 / stats / 1 / arts"}>
			<RollChat
				{chatEntries}
				{spoilersOn}
				{toggleSpoilersOn}
				{alreadyRevealed}
				{setAlreadyRevealed}
			/>
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		display: grid;
		grid-template-areas: 'stats skills classes arts rest';
		grid-template-columns: min-content 205px 160px 180px 1fr;
		grid-template-rows: 100%;

		height: calc(100%);
	}
	.stats {
		grid-area: stats;
	}

	.skills {
		grid-area: skills;
		display: flex;
		flex-direction: column;
		row-gap: 5px;
	}

	.classes {
		grid-area: classes;
		display: flex;
		flex-direction: column;
	}

	.rest {
		grid-area: rest;
		display: grid;
		grid-template-areas:
			'weapons weapons'
			'other other';
		grid-template-rows: max-content 1fr;
		grid-template-columns: 185px 1fr;
	}
	.other {
		grid-area: other;

		display: grid;
		grid-area: 'cStats' 'attack';
		grid-template-rows: min-content 1fr;
	}

	.weapons {
		grid-area: weapons;
	}

	.arts {
		grid-area: arts;
		display: flex;
		flex-direction: column;
		border-right: 1px solid gray;

		height: 100%;
	}
</style>
