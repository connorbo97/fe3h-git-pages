import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$constants: resolve('./src/constants'),
			$root: resolve('./src'),
			src: resolve('./src')
		}
	}
});
