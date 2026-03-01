export function formatBytes(bytes: number, decimals = 2, k = 1024) {
	if (bytes === 0) return "0 Bytes";

	//const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = k === 1024 ? ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"] : ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function formatPlural(count: number, one: string, few: string, many: string, zero: string | undefined = undefined): string {
	count = Math.abs(count);
	if (count === 0 && zero) return zero;
	if (count === 1) return one;
	if (count >= 2 && count <= 4) return few;
	return many;
}
