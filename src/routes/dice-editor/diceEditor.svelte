<script lang="ts">
	import { DEFAULT_DICE_OPTIONS } from 'src/constants';
	import { Dice } from 'src/constants/dice';
	import { rollVisualDice } from 'src/utils';

	import { onMount } from 'svelte';

	let DiceBox: any = null;
	let changedOptions: any = {};
	let curLocalStorage: any = {};
	let resetCounter = 0;

	onMount(() => {
		import('@3d-dice/dice-box').then((pack) => {
			DiceBox = pack.default;
		});
		getLocalStorageOptions();
	});

	const getLocalStorageOptions = () => {
		try {
			curLocalStorage = JSON.parse(localStorage.getItem('diceBoxOptions') || '{}');
		} catch (err) {
			console.log(err);
		}
		return curLocalStorage;
	};

	$: commitDiceBoxChange = (shouldWriteLocalStorage = false, isReset = false) => {
		const mergedVal = isReset ? {} : changedOptions;
		let diceBoxOptions;
		try {
			diceBoxOptions = getLocalStorageOptions();
		} catch (err) {
			console.log(err);
		}

		if (shouldWriteLocalStorage) {
			try {
				localStorage.setItem('diceBoxOptions', JSON.stringify({ ...diceBoxOptions, ...mergedVal }));
				curLocalStorage = { ...diceBoxOptions, ...mergedVal };
			} catch (err) {
				console.log(err);
			}
		}

		const diceBox = new DiceBox('#dice-box', {
			...DEFAULT_DICE_OPTIONS,
			...diceBoxOptions,
			...mergedVal
		});
		window.diceBoxContainer.removeChild(document.getElementById('dice-canvas'));

		return diceBox.init().then(() => {
			window.diceBox = diceBox;
		});
	};

	$: getValue = (key, defaultVal: any = 1) => {
		const changedOptionVal = changedOptions[key] !== undefined ? changedOptions[key] : null;

		if (changedOptionVal !== null) {
			return changedOptionVal;
		}

		const localStorageValue = curLocalStorage[key] !== undefined ? curLocalStorage[key] : null;
		if (localStorageValue !== null) {
			return localStorageValue;
		}
		const defaultOptionValue =
			DEFAULT_DICE_OPTIONS[key] !== undefined ? DEFAULT_DICE_OPTIONS[key] : null;

		if (defaultOptionValue !== null) {
			return defaultOptionValue;
		}

		return defaultVal;
	};
</script>

<div class="container">
	<h1>Update how your dice rolls look</h1>

	{#key resetCounter}
		<div class="button-container">
			<div class="">
				<button
					on:click={() => {
						commitDiceBoxChange().then(() => {
							rollVisualDice([Dice.d20]);
						});
					}}>Test Settings</button
				>
				<button
					on:click={() => {
						commitDiceBoxChange(true);
					}}>Save Changes</button
				>
			</div>
			<div class="">
				<button
					on:click={() => {
						commitDiceBoxChange(false, true).then(() => {
							rollVisualDice([Dice.d20]);
						});
					}}
				>
					Reset to Current Settings
				</button>
				<button
					on:click={() => {
						changedOptions = {};
						resetCounter += 1;
					}}
				>
					Reset Form to Current Settings
				</button>
				<button
					on:click={() => {
						changedOptions = { ...DEFAULT_DICE_OPTIONS };
						resetCounter += 1;
					}}>Reset Form to Default Settings</button
				>
			</div>
		</div>

		<div class="field">
			<span>Die Color (must be full RGB hex (e.g. #FF0000 for red))</span>
			<input
				on:input={(e) => {
					changedOptions.themeColor = e.currentTarget.value;
				}}
				value={getValue('themeColor', '#FF0000')}
			/>
			{#if getValue('themeColor').length === 7}
				<span style:background-color={getValue('themeColor')}>EXAMPLE</span>
			{/if}
		</div>

		<div class="field">
			<span>Gravity</span>
			<input
				type="range"
				min="1"
				max="10"
				class="slider"
				value={getValue('gravity')}
				id="myRange"
				on:input={(e) => (changedOptions.gravity = parseInt(e.currentTarget.value))}
			/>
			<span>{getValue('gravity')}</span>
		</div>

		<div class="field">
			<span>Mass</span>
			<input
				type="range"
				min="1"
				max="20"
				class="slider"
				value={getValue('mass')}
				id="myRange"
				on:input={(e) => (changedOptions.mass = parseInt(e.currentTarget.value))}
			/>
			<span>{getValue('mass')}</span>
		</div>

		<div class="field">
			<span>Scale</span>
			<input
				type="range"
				min="1"
				max="10"
				class="slider"
				value={getValue('scale')}
				id="myRange"
				on:input={(e) => (changedOptions.scale = parseInt(e.currentTarget.value))}
			/>
			<span>{getValue('scale')}</span>
		</div>

		<div class="field">
			<span>Friction</span>
			<input
				type="range"
				min="1"
				max="10"
				class="slider"
				value={getValue('friction') * 10}
				id="myRange"
				on:input={(e) => (changedOptions.friction = parseInt(e.currentTarget.value) / 10)}
			/>
			<span>{getValue('friction')}</span>
		</div>

		<div class="field">
			<span>Throw Force</span>
			<input
				type="range"
				min="0"
				max="15"
				class="slider"
				value={getValue('throwForce')}
				id="myRange"
				on:input={(e) => (changedOptions.throwForce = parseInt(e.currentTarget.value))}
			/>
			<span>{getValue('throwForce')}</span>
		</div>

		<div class="field">
			<span>Starting Height</span>
			<input
				type="range"
				min="1"
				max="15"
				class="slider"
				value={getValue('startingHeight')}
				id="myRange"
				on:input={(e) => (changedOptions.startingHeight = parseInt(e.currentTarget.value))}
			/>
			<span>{getValue('startingHeight')}</span>
		</div>
	{/key}
</div>

<style lang="scss">
	.button-container {
		display: flex;
		justify-content: space-between;
	}
</style>
