import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: preprocess(),
	kit: {
		paths: {
			base: '/fe3h-git-pages',
		},
		alias: {
			$constants: resolve('./src/constants'),
			$root: resolve('./src'),
			src: resolve('./src')
		},
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			trailingSlash: 'always',
			fallback: null
		}),
		appDir: 'app'
	},
};

export default config;