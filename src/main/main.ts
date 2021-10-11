import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import eventNames from '@/shared/scripts/event-names';
import { isDevelopment } from '@/shared/scripts/environment-variables';

function createWindow() {
	const window = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.resolve(__dirname, 'appWinPreload')
		}
	});

	window.webContents.setWindowOpenHandler(() => {
		return {
			action: 'allow',
		}
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

ipcMain.handle(eventNames.showDialogFolder, async (event) => {
	return await dialog.showOpenDialog({ properties: ['openDirectory'] });
});
