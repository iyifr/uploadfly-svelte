<script lang="ts">
	import { getFilesFromDropEvent, getFilesFromInputEvent } from './utils.js';
	import { createEventDispatcher, type EventDispatcher } from 'svelte';

  interface $$Events {
    picked: CustomEvent<{files: File[]}>
  }

  type Dispatcher<TEvents extends Record<keyof TEvents, CustomEvent<any>>> = {
    [Property in keyof TEvents]: TEvents[Property]['detail']
  }
  
	export let multiple = true;
	let files: File[] = [];

	let dragging = false;
	const dispatch = createEventDispatcher();

	function startDragging() {
		dragging = true;
	}

	function stopDragging() {
		dragging = false;
	}

	const onFile = (getFilesFunction: any) => (event: any) => {
		stopDragging();
		files = getFilesFunction(event);
		if (files.length) {
			dispatch('picked', { files });
		}
	};
</script>

<div id="root" data-part="root">
	<div data-part="dropzone">
		<label
			class:dragging
			on:drop|preventDefault={onFile(getFilesFromDropEvent)}
			on:dragover|preventDefault={startDragging}
			on:dragleave|preventDefault={stopDragging}
		>
			<slot {dragging}>
				<div style="display: flex; flex-direction: column; align-items:center">
					<span>Drag your files here</span>
					<span style="display: block; cursor: pointer" data-part="trigger">Upload from device</span
					>
				</div>
			</slot>
			<input type="file" {multiple} on:input={onFile(getFilesFromInputEvent)} />
		</label>
	</div>
</div>

<div class="preview">
	{#each files as file}
		<span class="imgprev">{file.name}</span>
	{/each}
</div>


<style>
	.preview {
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-top: 1rem;
	}

	.imgprev {
		background-color: whitesmoke;
		opacity: 90;
		padding: 0.8rem 1.6rem;
		width: 120px;
	}

	:global([data-part='root']) {
		border: 2px black dotted;
		width: 250px;
		display: flex;
		justify-items: center;
		align-items: center;
		flex-direction: column;
		padding: 12px;
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
	}

	:global([data-part='dropzone']) {
		margin-top: 2px;
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

	:global([data-part='trigger']) {
		background-color: rgb(39, 129, 39);
		padding: 0.45em 0.8em;
		display: inline-flex;
		margin-block: 8px;
		font-size: 14p;
		border-radius: 4px;
		color: white;
		white-space: nowrap;
	}
</style>
