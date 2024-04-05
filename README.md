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

</script>

<Fly multiple on:uploaded/>
```

#### Access Uploaded File URL

```javascript
<script lang="ts">
	import { Fly } from '$lib/index.js';
	let fileUrl: string = ""
</script>

<Fly on:uploaded={(e) => fileUrl = e.detail.resource?.[0]} />
```

## Author

- [@iyifr](https://www.github.com/iyifr)
