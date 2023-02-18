import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	base: "/fe3h-git-pages/",
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$constants: resolve('./src/constants'),
			$root: resolve('./src'),
			src: resolve('./src')
		}
	}
});
