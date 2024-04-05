<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	let apiKey: string | undefined = import.meta.env.VITE_UPLOADFLY_API_KEY!;

	export let multiple: boolean = false;
	export let hideDropzone: boolean = false;
	import FilePicker from './FilePicker.svelte';

	import { CreateUploadflyClient } from '@uploadfly/js';
	import { getHeightAndWidthFromDataUrl } from './utils.js';

	interface $$Events {
		uploaded: CustomEvent<{ success: boolean;  url: string | null; file: File  }>;
	}

	type Dispatcher<TEvents extends Record<keyof TEvents, CustomEvent<any>>> = {
		[Property in keyof TEvents]: TEvents[Property]['detail'];
	};

	// EXTERNAL PROPS
	export let showAttribution = true;

	// Access slots
	const SLOTS = $$props.$$slots;

	// Uploaded file URL
	let fileData: { url: string; file: File }[] = [];

	const dispatch = createEventDispatcher<Dispatcher<$$Events>>();

	function upload(files: File[] | null) {
		if (!files) {
			alert('No files to upload');
			return;
		}

		if (!apiKey) {
			alert('No Uploadfly Credential found');
			return;
		}
		fileData = [];

		const uploadfly = new CreateUploadflyClient(apiKey);
		files.forEach(async (file) => {
			try {
				const fileAsDataURL = window.URL.createObjectURL(file);

				const dimensions: any = await getHeightAndWidthFromDataUrl(fileAsDataURL);
				const { width, height } = dimensions;
				const uploadResult = await uploadfly.image.upload(file, {
					width,
					height,
					maxFileSize: '10MB',
					filename: file.name
				});
				dispatch('uploaded', { success: true, url: uploadResult.data.url, file: file });
			} catch (e) {
				dispatch('uploaded', { success: false, url: null, file });
				return;
			}
		});
	}
</script>

<div>
	{#if SLOTS}
		<FilePicker {multiple} on:picked={(event) => upload(event.detail.files)} {hideDropzone}>
			<slot />
		</FilePicker>
	{:else}
		<FilePicker {multiple} on:picked={(event) => upload(event.detail.files)} {hideDropzone} />
	{/if}

	{#if showAttribution}
		<code>Powered by uploadfly&#8482</code>
	{/if}
</div>

<style>
	:global([data-part='root']) {
		margin-top: 2em;
		width: 400px;
	}

	/* CSS */
	:global([data-part='upload']) {
		appearance: none;
		background-color: #000000;
		border: 2px solid #1a1a1a;
		border-radius: 12px;
		box-sizing: border-box;
		color: #ffffff;
		cursor: pointer;
		display: inline-block;
		font-family:
			Roobert,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Helvetica,
			Arial,
			sans-serif,
			'Apple Color Emoji',
			'Segoe UI Emoji',
			'Segoe UI Symbol';
		font-size: 16px;
		font-weight: 600;
		line-height: normal;
		margin: 0;
		min-height: 2.9rem;
		min-width: 0;
		outline: none;
		padding: 12px 24px;
		text-align: center;
		text-decoration: none;
		transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
		width: auto;
		will-change: transform;
	}

	:global([data-part='upload']):disabled {
		pointer-events: none;
	}

	:global([data-part='upload']):hover {
		box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
		transform: translateY(-2px);
	}

	:global([data-part='upload']):active {
		box-shadow: none;
		transform: translateY(0);
	}
	code {
		color: rgb(65, 50, 21);
	}
</style>
