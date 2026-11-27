import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('versions', {
	node: () => process.versions.node,
	chrome: () => process.versions.chrome,
	electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld('rsa', {
	create: (keyId: string) => ipcRenderer.invoke('rsa:create', keyId),
	getPublic: (keyId: string) => ipcRenderer.invoke('rsa:getPublic', keyId),
	sign: (payload: string, keyId: string) => ipcRenderer.invoke('rsa:sign', payload, keyId),
	delete: (keyId: string) => ipcRenderer.send('rsa:delete', keyId),
	export: (identities: any[], password: string) =>
		ipcRenderer.invoke('rsa:export', identities, password),
	import: (content: string, password: string) =>
		ipcRenderer.invoke('rsa:import', content, password),
});

contextBridge.exposeInMainWorld('ws', {
	connect: (server: string) => ipcRenderer.invoke('ws:connect', server),
	closeAll: () => ipcRenderer.send('ws:closeAll'),
	message: (callback: (value: any) => {}) =>
		ipcRenderer.on('ws:message', (_event, value) => {
			callback(value);
		}),
});

contextBridge.exposeInMainWorld('dl', {
	open: (callback: (link: string) => {}) =>
		ipcRenderer.on('dl:open', (_event, value) => {
			callback(value);
		}),
});

contextBridge.exposeInMainWorld('update', {
	available: (callback: () => {}) => {
		ipcRenderer.on('update:available', _event => {
			callback();
		});
	},
	install: () => ipcRenderer.invoke('update:install'),
});
