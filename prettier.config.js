/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
	arrowParens: 'avoid',
	bracketSameLine: true,
	bracketSpacing: true,
	endOfLine: 'lf',
	htmlWhitespaceSensitivity: 'css',
	jsxSingleQuote: true,
	quoteProps: 'consistent',
	semi: true,
	singleAttributePerLine: false,
	singleQuote: true,
	tabWidth: 4,
	trailingComma: 'all',
	useTabs: true,
	printWidth: 100,
	plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};

export default config;
