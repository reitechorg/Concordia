function createPersistentCacheStorage<Tkey, Tval>(cacheId: string) {
	const inMemoryStorage = new Map<Tkey, Tval>();
	const cacheKey = `cache:${cacheId}`;

	const saveCache = () => {
		localStorage.setItem(cacheKey, JSON.stringify(Array.from(inMemoryStorage.entries())));
	};
	const loadCache = () => {
		const cache = localStorage.getItem(cacheKey);
		if (cache) {
			inMemoryStorage.clear();
			for (const [key, value] of JSON.parse(cache)) {
				inMemoryStorage.set(key, value);
			}
		}
	};
	loadCache();

	const storage = {
		get(key: Tkey) {
			return inMemoryStorage.get(key);
		},
		set(key: Tkey, value: Tval) {
			inMemoryStorage.set(key, value);
			saveCache();
		},
		delete(key: Tkey) {
			inMemoryStorage.delete(key);
			saveCache();
		},
		clear() {
			inMemoryStorage.clear();
			localStorage.removeItem(cacheKey);
		},
	};

	return storage;
}

export function cached<T extends (...args: Parameters<T>) => ReturnType<T>>(fn: T, cacheId: string) {
	const cache = createPersistentCacheStorage<string, ReturnType<T>>(cacheId);

	return async (...args: Parameters<T>) => {
		const key = JSON.stringify(args);
		if (cache.get(key)) {
			return cache.get(key);
		}

		const result = await fn(...args);
		cache.set(key, result);

		return result;
	};
}
