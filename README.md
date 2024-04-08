# UploadFly Svelte

Simple component to upload files from your svelte apps to uploadfly.

## Installation

Install with your preferred package manager.

```bash
  pnpm add uploadfly-svelte
```

```bash
  yarn add uploadfly-svelte
```

## Environment Variables

To use this component make sure you've signed up to [uploadfly](https://uploadlfy.co) and have your api key as an environment variable in `env.local`.

Don't forget to prefix with Vite in development.
`VITE_UPLOADFLY_API_KEY=****`

## Usage/Examples

The fly component exports an `uploaded` event which tells us whether our file uploaded successfully

```javascript
<script lang="ts">

import Fly from 'uploadfly-svelte'

function handle(e: Event) {
    e.detail.success ?
    // Handle successful upload
    alert('Upload successful')

    // handle error (show an error toast or display an alert)
    : alert('Upload failed')
}

</script>

<Fly multiple on:uploaded={handle}/>
```

#### Access Uploaded File URL

```javascript
<script lang="ts">
	import { Fly } from '$lib/index.js';
	let fileUrl: string = ""
</script>

<Fly on:uploaded={(e) => fileUrl = e.detail.url} />
```

#### Multiple Files.

Events are emitted for each individual file upload, so when uploading multiple files, use a reactive function to capture the urls and store them in your database (or whatever is required)

```javascript
<script lang="ts">
	import { Fly } from '$lib/index.js';
	let fileUrls: string[] = []

    $: updateUrls = (url) => fileUrls = [...fileUrls, url]
</script>

<Fly
  multiple
  on:uploaded={(e) => updateUrls(e.detail.url)}
/>
```

### Image Previews

Coming soon.

### Styling

Coming soon.

## Author

- [@iyifr](https://www.github.com/iyifr)
