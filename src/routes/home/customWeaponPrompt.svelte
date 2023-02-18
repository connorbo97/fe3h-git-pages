<script lang="ts">
	import { CONTEXTS } from 'src/constants';
	import { getWeaponDescription } from 'src/constants/weapons';
	import { getContext, onMount } from 'svelte';

	const { close } = getContext(CONTEXTS.MODAL);
	export let defaultReason: string = '';
	export let weapon: any;
	export let weaponsToFeatures: { [s: string]: WeaponFeatures };
	export let customWeapons: { [s: string]: WeaponFeatures };
	export let onUpdateCustomWeapons: Function;

	$: alreadyCustom = Array.isArray(weapon) ? false : customWeapons[weapon];

	let reason: string = defaultReason;
	let input: any;

	let selected = Array.isArray(weapon) ? weapon[0] : weapon;

	onMount(() => {
		input?.select();
	});
	$: onSubmitForm = () => {
		if (alreadyCustom) {
			const { [selected]: removed, ...rest } = customWeapons;
			onUpdateCustomWeapons(rest);
		} else {
			onUpdateCustomWeapons({
				...customWeapons,
				[selected]: {
					...customWeapons[selected],
					reason: reason
				}
			});
		}
		close();
	};
</script>

<div class="container">
	<h1>{alreadyCustom ? 'Removing' : 'Adding'} custom weapon:</h1>
	{#if Array.isArray(weapon)}
		<select on:change={(e) => (selected = e.currentTarget.value)}>
			{#each weapon as w}
				<option value={w} selected={w === selected}>
					{weaponsToFeatures[w].label}: {getWeaponDescription(weaponsToFeatures[w])}
				</option>
			{/each}
		</select>
	{/if}
	{#if !alreadyCustom}
		<div class="content">
			<div>Reason:</div>
			<textarea
				bind:this={input}
				id="custom-weapon-prompt-input"
				type="text"
				bind:value={reason}
				rows={3}
			/>
		</div>
	{/if}
	{#if alreadyCustom}
		<div class="content">
			<b>Current Reason:</b>
			{customWeapons[weapon]?.reason}
		</div>
	{/if}
	<button class="action" on:click={onSubmitForm}
		>Click to {alreadyCustom ? 'Remove' : 'Submit'}</button
	>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
	}
	#custom-weapon-prompt-input {
		width: 100%;
	}

	.action {
		display: flex;
		justify-content: center;
		width: 100%;
		padding: 5px;
		font-size: 20px;
	}
</style>
