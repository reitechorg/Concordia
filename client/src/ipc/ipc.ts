import { BrowserWindow, ipcMain } from 'electron';
import SignWithRSA from './rsa/sign.js';
import { GetPublicRSA } from './rsa/get.js';
import CreateRSAKeys from './rsa/create.js';
import DeleteRSAKeys from './rsa/delete.js';
import CreateWebSocket from './websockets/create.js';
import CloseAllWebSockets from './websockets/close.js';
import { ExportRSA } from './rsa/export.js';
import { ImportRSA } from './rsa/import.js';

export function RegisterIPC(win: BrowserWindow) {
	// RSA
	ipcMain.handle('rsa:sign', (_event, payload, keyId) => {
		return SignWithRSA(payload, keyId);
	});

	ipcMain.handle('rsa:getPublic', (_event, keyId: string) => {
		return GetPublicRSA(keyId);
	});

	ipcMain.handle('rsa:create', (_event, keyId: string) => {
		return CreateRSAKeys(keyId);
	});

	ipcMain.on('rsa:delete', (_event, keyId: string) => {
		return DeleteRSAKeys(keyId);
	});

	ipcMain.handle('rsa:export', (_event, identities: any[], password: string) => {
		return ExportRSA(identities, password);
	});

	ipcMain.handle('rsa:import', (_event, content: string, password: string) => {
		return ImportRSA(content, password);
	});

	// websockets
	ipcMain.handle('ws:connect', (_event, server: string) => {
		return CreateWebSocket(server, win);
	});

	ipcMain.on('ws:closeAll', _event => {
		return CloseAllWebSockets();
	});
}
