import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	base: "/fe3h-git-pages/",
	plugins: [sveltekit()]
});
