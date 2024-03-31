<script>
	import { getFilesFromDropEvent, getFilesFromInputEvent } from './utils.ts';
	import { createEventDispatcher } from 'svelte';

	export let multiple = true;
	let files = []

	let dragging = false;
	const dispatch = createEventDispatcher();

	function startDragging() {
		dragging = true;
	}

	function stopDragging() {
		dragging = false;
	}

	const onFile = (getFilesFunction) => (event) => {
		stopDragging();
		files = getFilesFunction(event);
		if (files.length) {
			dispatch('input', { files: multiple ? files : files[0] });
		}
	};
</script>

<div class="fly">
	<label
		class:dragging
		on:drop|preventDefault={onFile(getFilesFromDropEvent)}
		on:dragover|preventDefault={startDragging}
		on:dragleave|preventDefault={stopDragging}
	>
		<slot {dragging}>
			<div style="display: flex; flex-direction: column; align-items:center">
				<span>Drag your files here</span>
				<span style="display: block; cursor: pointer" data-part="trigger">Upload from device</span>
			</div>
		</slot>
		<input type="file" {multiple} on:input={onFile(getFilesFromInputEvent)} on:click|stopPropagation={(event) => event.target.value = "" }/>
	</label>
</div>
<div>
	{#each files as file}
		<p>{file.name}</p>
	{/each}
</div>

<style>
	.fly {
		margin-top: 86px;
		border: 2px black dotted;
		padding: 2em;
		width: 250px;
	}

	input {
		position: absolute !important;
		height: 1px;
		width: 1px;
		overflow: hidden;
		clip: rect(1px 1px 1px 1px);
		clip: rect(1px, 1px, 1px, 1px);
		white-space: nowrap;
		cursor: pointer;
	}

	[data-part='trigger'] {
		background-color: greenyellow;
		padding: 12px;
		margin-block: 5px;
		border-radius: 12px;
	}
</style>
