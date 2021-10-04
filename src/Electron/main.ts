import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDevelopment } from '../Shared/environment-variables';

function createWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.resolve(__dirname, 'preload')
    }
  });

  window.webContents.setWindowOpenHandler(() => {
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        frame: true,
        fullscreenable: true,
        webPreferences: {
          preload: path.resolve(__dirname, 'book-render-preload')
        }
      }
    }
  })

  if (isDevelopment) {
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
