<script lang="ts">
	import { download } from 'src/utils';
	import FileSaver from 'file-saver';
	import JSZip from 'jszip';
	export let curSheet: any;
	export let onChangeCurSheet: any;

	export let onAddSheet: any;
	export let otherSheetNames: Array<string>;

	let newSheetName: any;

	let importInput: any;
	let importSheets: FileList | null = null;

	$: onClickExportAll = async () => {
		let zip = new JSZip();
		try {
			console.log(otherSheetNames);

			[...otherSheetNames, 'sheet'].forEach((s) => {
				console.log('downloading', s);
				// add file directly
				const content = localStorage.getItem(s) || '';
				zip.folder('fe3h-sheets')?.file(s, content);
			});

			await zip?.generateAsync({ type:"blob" })
				.then((blob) => {
    				FileSaver.saveAs(blob, 'fe3h-sheets.zip');
				});
		} catch (err) {
			console.error(err);
		}
	};
	$: onClickImportAll = () => {
		if (!importSheets || !importSheets?.length) {
			alert('no sheets provided');
			return;
		}

		let sheetNames = new Set(otherSheetNames);
		try {
			const fileList = Array.from(importSheets);

			fileList.forEach((f) => {
				const firstPartOfName = f.name.split('.')[0];
				sheetNames.add(firstPartOfName);
				const fileReader = new FileReader();

				fileReader.onload = (e) => {
					console.log(firstPartOfName, e.target?.result);
					localStorage.setItem(firstPartOfName, e.target?.result?.toString() || '');
				};

				fileReader.readAsText(f, 'UTF-8');
			});
			console.log(sheetNames);
		} catch (err) {
			console.log(err);
		}
		localStorage.setItem('otherSheetNames', JSON.stringify(Array.from(sheetNames)));

		alert('REMEMBER TO REFRESH');
	};

	$: options = otherSheetNames.sort();
</script>

<div class="container">
	<h1>Manage other sheets</h1>

	<select on:change={(e) => onChangeCurSheet(e.currentTarget.value)}>
		<option value={'sheet'} selected={curSheet === 'sheet'}>Main Sheet</option>
		{#each options as name}
			<option value={name} selected={curSheet === name}>{name}</option>
		{/each}
	</select>

	<input bind:value={newSheetName} />
	<button
		disabled={!newSheetName || otherSheetNames.includes(newSheetName)}
		on:click={() => {
			onAddSheet(newSheetName);
			newSheetName = '';
		}}>Add New Sheet</button
	>
	<br />
	<div>
		<button on:click={onClickExportAll}>Export all sheets</button>
		<br />
		<br />
		<div>
			<button on:click={onClickImportAll}>Import all sheets</button>
			<input
				type="file"
				multiple
				bind:this={importInput}
				on:change={(e) => {
					// debugger;
					importSheets = e?.currentTarget?.files || null;
				}}
			/>
		</div>
	</div>
</div>

<style lang="scss">
</style>
