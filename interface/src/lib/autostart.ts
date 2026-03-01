// import { enable, isEnabled, disable } from "@tauri-apps/plugin-autostart";

export function isAutostartEnabled(): Promise<boolean> {
	return Promise.resolve(false); // isEnabled(); // TODO: Replace with Electrons API
}

export function enableAutostart(): Promise<void> {
	throw new Error('Not implemented'); // return enable(); // TODO: Replace with Electrons API
}

export function disableAutostart(): void {
	throw new Error('Not implemented'); // disable(); // TODO: Replace with Electrons API
}

export async function toggleAutostart(): Promise<boolean> {
	const enabled = await isAutostartEnabled();
	enabled ? disableAutostart() : enableAutostart();
	return !enabled;
}
