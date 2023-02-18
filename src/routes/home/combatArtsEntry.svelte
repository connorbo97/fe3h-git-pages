<script lang="ts">
	import EquippedButton from 'src/common/equippedButton.svelte';
	import { COMBAT_ARTS_TO_FEATURES, MAX_COMBAT_ARTS } from 'src/constants';
	import { getCombatArtsDescription } from 'src/constants/combatArts';
	import { WEAPON_TYPE_TO_IMAGE } from 'src/constants/weaponType';
	import Editor from '../editor/editor.svelte';

	export let art: any;

	export let equippedCombatArts: any;
	export let onToggleCombatArts: any;

	export let allCombatArts: any;

	export let equippedWeaponTypes: Set<any>;

	$: features = allCombatArts.fullFeatures;
	$: compatibleWeapons = features[art]?.compatibleWeapons || [];

	let hideDescription: any = false;

	$: descriptionText = getCombatArtsDescription(features[art], { disableDescription: true });
</script>

<div class="container">
	<div class="content">
		<!-- <button
			class={selectedCombatArt === art ? 'selected' : ''}
			on:click={() => setSelectedCombatArt(art)}
			disabled={equippedCombatArts.indexOf(art) === -1}
		/> -->
		<div class="label" on:click={() => (hideDescription = !hideDescription)}>
			<span>
				{features[art].label}
			</span>
			{#each compatibleWeapons as type}
				{#if WEAPON_TYPE_TO_IMAGE[type]}
					<img
						class={`icon ${equippedWeaponTypes?.has(type) ? 'equipped' : 'not-equipped'}`}
						src={WEAPON_TYPE_TO_IMAGE[type]}
						alt="icon"
					/>
				{/if}
			{/each}
		</div>
		<div
			class={`caret ${hideDescription ? '' : 'flip'}`}
			on:click={() => (hideDescription = !hideDescription)}
		>
			v
		</div>
		<EquippedButton
			isEquipped={equippedCombatArts.includes(art)}
			onClick={() => onToggleCombatArts(art)}
			isVisible={equippedCombatArts.length < MAX_COMBAT_ARTS || equippedCombatArts.includes(art)}
		/>
	</div>
	{#if hideDescription}
		<div class="description">
			{#if features[art]?.reason}
				<div class="reason">{features[art].reason}</div>
				<br />
			{/if}
			{#if descriptionText}
				<span>{descriptionText}</span>
			{/if}
			{#if features[art]?.description}
				{#if descriptionText}
					<br />
				{/if}
				<div class="description-extra">{features[art].description}</div>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		row-gap: 5px;
		margin-right: 5px;
		background-color: #eae8da;
		border: 1px solid #c9c6bb;
		padding: 5px;
		font-size: 13px;
	}

	.caret {
		transition: transform 0.2s linear;
		padding: 0px 5px;
		cursor: pointer;
		margin-bottom: 1px;
		border: 1px solid black;
		border-radius: 100%;

		font-size: 12px;
	}

	.flip {
		transform: rotate(180deg);
	}

	.active {
		background-color: blue;
	}

	.content {
		display: flex;
		column-gap: 5px;
		align-items: center;
	}
	.description {
		background-color: lightgray;
		padding: 5px;
		border-radius: 5px;
		font-size: 15px;
		border: 1px solid gray;
		font-family: sans-serif;

		display: flex;
		flex-direction: column;
	}
	.label {
		cursor: pointer;
		flex: 1;
		display: flex;
		align-items: center;
	}

	.equipped {
		background-color: #51bf51;
	}
	.reason {
		color: brown;
		font-size: 12px;
	}
	.description-extra {
		color: #9a1aa0;
	}

	.icon {
		height: 15px;
		border-radius: 100%;
		margin-left: 5px;
	}
	.not-equipped {
		filter: opacity(0.2);
		background-color: white;
	}
</style>
