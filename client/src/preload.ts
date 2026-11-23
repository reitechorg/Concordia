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
});

contextBridge.exposeInMainWorld('ws', {
	connect: (server: string) => ipcRenderer.invoke('ws:connect', server),
	message: (callback: (value: any) => {}) =>
		ipcRenderer.on('ws:message', (_event, value) => {
			callback(value);
		}),
});
