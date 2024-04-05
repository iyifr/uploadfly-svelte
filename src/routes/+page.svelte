<script lang="ts">
	// @ts-ignore
	import { Fly } from '$lib/index.js';

	let isUploaded: null | boolean = null;
	let fileUrl;
</script>

<Fly
	multiple
	on:uploaded={(e) =>
		e.detail.success === true ? alert('Upload successful') : alert('Upload failed.')}
/>

<Fly on:uploaded={(e) => alert(e.detail.url)} />
