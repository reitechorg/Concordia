import type { BrowserWindow } from 'electron';
import { logInfo } from '../../utils/logger.js';

export default function OpenDeeplink(link: string, win: BrowserWindow) {
	win.webContents.send('dl:open', link);
	logInfo(`Set req to open ${link} to frontend`);
}
