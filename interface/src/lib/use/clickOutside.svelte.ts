type ClickOutsideCallback = () => void;
const debounceTime = 100;

export function clickOutside<T extends HTMLElement = HTMLElement>(node: T, cb: ClickOutsideCallback) {
	const clickHandler = (e: MouseEvent) => {
		if (node && !node.contains(e.target as Node) && cb) {
			cb();
		}
	};

	let willBeDestroyed = false;

	$effect(() => {
		setTimeout(() => {
			if (node && !willBeDestroyed) {
				window.addEventListener("click", clickHandler);
			}
		}, debounceTime);

		return () => {
			willBeDestroyed = true;
			window.removeEventListener("click", clickHandler);
		};
	});
}
