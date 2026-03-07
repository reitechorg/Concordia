import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import tailwindcss from '@tailwindcss/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		Icons({
			compiler: 'svelte',
			autoInstall: true,
		}),
		viteStaticCopy({
			targets: [
				{
					src: 'node_modules/@discordapp/twemoji/dist/svg',
					dest: 'emoji',
				}
			],
		}),
	],
	base: "./",

	clearScreen: false,
	server: {
		port: 1420,
		strictPort: true,
	},
});
