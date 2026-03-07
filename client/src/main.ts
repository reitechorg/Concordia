import { app, BrowserWindow } from 'electron';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDev } from './utils/is-dev.js';
import express from 'express';
const PORT = 3000;

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			preload: join(
				dirname(fileURLToPath(import.meta.url)),
				'preload.js',
			),
		},
	});

	if (isDev) {
		win.loadURL('http://localhost:1420');
		console.log('Running in development mode');
	} else {
		// win.loadURL(`http://localhost:${PORT}`);
		win.loadFile(join(dirname(fileURLToPath(import.meta.url)), "../build/index.html"));
	}

	return win;
};

app.on('ready', () => {
	// start local server
	// const server = express();
	// const buildPath = (join(dirname(fileURLToPath(import.meta.url)), "build"));
	// server.use(express.static(buildPath));

	// server.get("/{*splat}", (req, res) => {
	// 	res.sendFile(join(buildPath, "index.html"));
	// });

	// server.listen(PORT, () => {
	// 	console.log(`Server running at http://localhost:${PORT}`);
	// });
	
	createWindow();
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
