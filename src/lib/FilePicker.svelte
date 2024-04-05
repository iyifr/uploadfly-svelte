<script lang="ts">
	import { getFilesFromDropEvent, getFilesFromInputEvent } from './utils.js';
	import { createEventDispatcher, type EventDispatcher } from 'svelte';

	interface $$Events {
		picked: CustomEvent<{ files: File[] }>;
	}

	type Dispatcher<TEvents extends Record<keyof TEvents, CustomEvent<any>>> = {
		[Property in keyof TEvents]: TEvents[Property]['detail'];
	};

	const dispatch = createEventDispatcher<Dispatcher<$$Events>>();

	export let hideDropzone: boolean = true;
	export let multiple = true;
	let files: File[] = [];

	let dragging = true;

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

{#if !hideDropzone}
	<div id="root" data-part="root">
		<div data-part="dropzone">
			<label
				on:drop|preventDefault={onFile(getFilesFromDropEvent)}
				on:dragover|preventDefault={startDragging}
				on:dragleave|preventDefault={stopDragging}
			>
				<slot {dragging}>
					<div style="display: flex; flex-direction: column; align-items:center; padding: 20px;">
						<span style="font-size: 18px;">Drag your files here or</span>
						<span style="margin-top: 8px;" />
						<slot>
							<span data-part="upload">Upload from device</span>
						</slot>
					</div>
				</slot>
				<input type="file" {multiple} on:input={onFile(getFilesFromInputEvent)} />
			</label>
		</div>
	</div>
{/if}

{#if hideDropzone}
	<label>
		<slot>
			<span data-part="upload">Upload file</span>
		</slot>
		<input type="file" {multiple} on:input={onFile(getFilesFromInputEvent)} />
	</label>
{/if}

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
		padding: 1rem 0.4rem;
		width: fit-content;
		border-radius: 12px;
	}

	:global([data-part='root']) {
		width: 250px;
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
		border: 2px black dotted;
		border-radius: 12px;
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
</style>
