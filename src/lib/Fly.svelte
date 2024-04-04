<script lang="ts">
	export let apiKey: string;
	// export let multipleSelect: boolean;
	import FilePicker from './FilePicker.svelte';
	export let showAttribution = true;

	let file: File[] | null = null;
	import { CreateUploadflyClient } from '@uploadfly/js';

	function upload() {
		if (!file) {
			throw new Error('No files found');
		}
		const uploadfly = new CreateUploadflyClient(apiKey);

		const uploadAFly = async (file: File) => {
			await uploadfly.upload(file);
		};

		try {
			file?.map(async (item) => await uploadAFly(item).then(() => alert('Heck yeah')));
		} catch (e) {
			new Error(e as string | undefined);
		}
	}
</script>

<div>
	<button>
		<slot>Upload the beauty</slot>
	</button>

	<FilePicker multiple on:picked={(event) => (file = event.detail.files)} />

	<button on:click={() => upload()}>Upload</button>
	{#if showAttribution}
		<pre>Powered by uploadfly</pre>
	{/if}
</div>

<style>
	:global([data-part='root']) {
		margin-top: 2em;
	}
</style>
