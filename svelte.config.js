import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: preprocess(),
	kit: {
		alias: {
			$constants: resolve('./src/constants'),
			$root: resolve('./src'),
			src: resolve('./src')
		}
	},
	// hydrate the <div id="svelte"> element in src/app.html
	target: '#svelte',
	adapter: adapter({
		pages: 'build',
		assets: 'build',
		fallback: null
	})
};

export default config;