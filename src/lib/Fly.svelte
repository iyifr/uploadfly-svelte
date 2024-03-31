<script lang="ts">
	export let apiKey
	// export let multipleSelect: boolean;
	export let customFileName: string | undefined = undefined;
	import FilePicker from './FilePicker.svelte';

	let file: File;
	import { CreateUploadflyClient } from '@uploadfly/js';

	function handler(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (event?.currentTarget?.files?.[0]) {
			file = event.currentTarget.files[0];
		}
	}

	async function upload() {
		const uploadfly = new CreateUploadflyClient(apiKey);

		try {
			const fly = await uploadfly.upload(file, {
				filename: customFileName
			});
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div>
	<input type="file" on:change={handler} />
	<button>
		<slot>Upload</slot>
	</button>

	<FilePicker/>
</div>
