import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('versions', {
	node: () => process.versions.node,
	chrome: () => process.versions.chrome,
	electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld('rsa', {
	create: (keyId: string) => ipcRenderer.invoke('rsa:create', keyId),
	getPublic: (keyId: string) => ipcRenderer.invoke('rsa:getPublic', keyId),
});
