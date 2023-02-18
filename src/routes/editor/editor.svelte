<script lang="ts">
	import { onExportSheet } from 'src/utils';

	import { JSONEditor, Mode } from 'svelte-jsoneditor';
	export let fullSheet: CharacterSheet;
	export let onChangeSheet: any;

	let prevSheet: { current: CharacterSheet | any } = { current: null };

	let content: any;
	$: {
		if (prevSheet.current !== fullSheet) {
			prevSheet.current = fullSheet;
			content = { json: fullSheet };
		}
	}
</script>

<div class="container">
	<div class="content">
		<h1>Edit your character sheet manually</h1>
		<button
			on:click={() => {
				let res = content.json;
				if (content.text) {
					try {
						res = JSON.parse(content.text);
					} catch (err) {
						alert('failed to parse the editor text');
					}
				} else if (content.json) {
					res = content.json;
				} else {
					alert('failed to parse the editor at all');
				}

				if (res) {
					const confirmation = confirm(
						`Are you sure you want to update your sheet? Your sheet will be downloaded as a back up before the change is committed`
					);

					if (!confirmation) {
						return;
					} else {
						onExportSheet(fullSheet, 'BACKUP-');
						onChangeSheet(res);
					}
				}
			}}>Commit Changes</button
		>
	</div>
	{#key fullSheet}
		<JSONEditor
			{content}
			mode={'code'}
			onChange={(newContent) => {
				content = newContent;
			}}
		/>
	{/key}
</div>

<style lang="scss">
	.container {
		display: flex;
		height: 100%;
		background-color: antiquewhite;
		border-radius: 5px;
	}
</style>
