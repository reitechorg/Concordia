import type { Action } from 'svelte/action';

/**
 * Svelte use:autoFocus action for focusing an element on mount.
 * @param node - The element to focus.
 */
export const autoFocus: Action = (node) => {
	setTimeout(() => {
		node?.focus();
	}, 0);
}
