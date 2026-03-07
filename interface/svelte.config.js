import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			fallback: 'index.html',
			pages: '../client/dist/build',
			assets: '../client/dist/build',
		}),
		// output: {
		// 	bundleStrategy: 'inline',
		// },
	},

	compilerOptions: {
		warningFilter: warning => {
			const ignore = [
				'a11y_media_has_caption',
				'a11y_no_redundant_roles',
				'a11y_consider_explicit_label',
				'a11y_no_noninteractive_tabindex',
				'a11y_click_events_have_key_events',
				'a11y_no_static_element_interactions',
				'a11y_no_noninteractive_element_interactions',
				'a11y_label_has_associated_control',
			];
			return !ignore.includes(warning.code);
		},
	},
};

export default config;
