import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDevelopment } from '@/shared/scripts/environment-variables';

function createWindow() {
	const window = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			//nodeIntegrationInSubFrames: true,
			preload: path.resolve(__dirname, 'appWinPreload')
		}
	});

	window.webContents.setWindowOpenHandler(({ url, frameName }) => {
		if (frameName == 'reader-win') {
			return {
				action: 'allow',
				overrideBrowserWindowOptions: {
					webPreferences: {
						preload: path.resolve(__dirname, 'readerWinPreload')
					}
				}
			}
		}
		return { action: 'deny' }
	})

	if (false) {
		window.loadURL('http://localhost:8080');
	} else {
		window.loadFile(path.resolve(__dirname, 'renderer', 'index.html'));
	}
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});
