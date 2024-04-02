import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
	plugins: [sveltekit(), nodePolyfills()],
	server: {
		host: '0.0.0.0',
	},
	define: {
		global: 'window'
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
