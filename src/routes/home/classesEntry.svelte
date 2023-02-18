<script lang="ts">
	import EquippedButton from 'src/common/equippedButton.svelte';

	import SvelteTip from 'src/common/SvelteTip.svelte';
	import UnlockedButton from 'src/common/unlockedButton.svelte';
	import { CLASS_TO_FEATURES, CLASS_TO_LABEL } from 'src/constants/classes';
	import { getStatBlockDescription } from 'src/descriptionUtils';

	export let isMastered: any;
	export let isUnlocked: any;
	export let onToggleClassActive: any;
	export let onToggleEquipClass: any;
	export let targetClass: any;

	export let equippedClass: any;

	$: classFeatures = CLASS_TO_FEATURES[targetClass];

	let hideDescription = false;
</script>

<div class="container">
	<div class="content">
		<SvelteTip disabled={!isMastered}>
			<div slot="t">Mastered</div>
		</SvelteTip>
		<UnlockedButton {isUnlocked} {isMastered} onClick={() => onToggleClassActive(targetClass)} />

		<div class={`class-label`} on:click={() => (hideDescription = !hideDescription)}>
			{CLASS_TO_LABEL[targetClass]}
		</div>
		<div
			class={`caret ${hideDescription ? '' : 'flip'}`}
			on:click={() => (hideDescription = !hideDescription)}
		>
			v
		</div>
		<EquippedButton
			isEquipped={equippedClass === targetClass}
			onClick={() => onToggleEquipClass(targetClass)}
			isVisible={isUnlocked}
		/>
	</div>
	{#if hideDescription}
		<div class="description">
			{#if Object.keys(classFeatures?.unlocks).length}
				<div>
					<div>
						<u>Unlocks</u>
					</div>
					{getStatBlockDescription(classFeatures.unlocks)}
				</div>
			{/if}
			{#if Object.keys(classFeatures?.whenEquipped).length}
				<div>
					<div>
						<u>When Equipped</u>
					</div>
					{getStatBlockDescription(classFeatures.whenEquipped)}
				</div>
			{/if}
			{#if isMastered && Object.keys(classFeatures?.whenMastered).length}
				<div>
					<div>
						<u>When Mastered</u>
					</div>
					{getStatBlockDescription(classFeatures.whenMastered)}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
	}
	.content {
		display: flex;
		align-items: center;
		column-gap: 2px;
		background-color: #eae8da;
		border: 1px solid #c9c6bb;
		border-bottom-width: 1px;

		:last-child {
			border-bottom-width: 1px;
		}
		padding: 5px;
	}
	.class-label {
		flex: 1;
		cursor: default;
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
	.description {
		margin: 2px;
		padding: 3px;
		background-color: lightgray;
		border: 1px solid black;
		border-radius: 5px;
		font-size: 12px;
	}
</style>
