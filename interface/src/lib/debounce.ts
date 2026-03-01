type VoidOrPromiseVoid = void | Promise<void>;
export function debounce<T extends (...args: Parameters<T>) => VoidOrPromiseVoid>(fn: T, delay: number) {
	let timer: NodeJS.Timeout | undefined;

	return (...args: Parameters<T>) => {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			fn(...args);
			timer = undefined;
		}, delay);
	};
}
