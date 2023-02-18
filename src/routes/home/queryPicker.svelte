<script lang="ts">
	export let queries: Array<Query>;
	export let selections: { [s: string]: QueryOption } | undefined;
	export let onUpdateQuerySelection: any;
</script>

<div class="container">
	{#each queries as query}
		{@const selectedOption = selections?.[query.key || '']}
		<div class="query">
			<div class="prompt">{query.prompt}</div>
			<div class="selection">
				<select
					class={selections && selectedOption !== query.options[0] ? 'selected' : ''}
					name={query.prompt}
					on:change={(e) => {
						onUpdateQuerySelection(query.key, query.options[parseInt(e?.currentTarget?.value)]);
					}}
				>
					{#each query.options as option, optionIndex}
						<option value={optionIndex} selected={selectedOption === option}>{option.label}</option>
					{/each}
				</select>
				<div class="description">{selectedOption?.description || ''}</div>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.container {
		padding: 5px;
		background-color: #beae88;
		box-sizing: content-box;

		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-auto-rows: 1fr;
		gap: 5px;

		flex: 1;
	}
	.query {
		border: 1px solid black;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #dfd6c2;
	}
	.prompt {
		background-color: #59506b;
		color: white;
		padding-left: 2px;
		padding-right: 2px;
		align-self: stretch;
	}
	.selected {
		background-color: lightpink;
	}

	.selection {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 3px;
	}
</style>
