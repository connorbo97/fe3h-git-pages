<script lang="ts">
	import { WEAPON_TYPES_TO_LEVEL_FEATURES } from 'src/constants/weaponLevel';
	import { getLevelUpDescription } from 'src/descriptionUtils';

	export let type: any;
	export let level: any;
	export let disablePickOne: any = false;

	$: levelUpDescription = getLevelUpDescription(
		WEAPON_TYPES_TO_LEVEL_FEATURES[type]?.[level],
		disablePickOne
	);
</script>

<div class="container">
	<div><u>{disablePickOne ? 'Always ' : ''}Unlocks</u></div>
	{#if levelUpDescription}
		<div>{levelUpDescription}</div>
	{/if}
	{#if !levelUpDescription}
		<div>Nothing :)</div>
	{/if}
</div>

<style lang="scss">
</style>
