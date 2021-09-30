const { app, BrowserWindow } = require('electron')
const path = require('path')

const isDevelopment = process.env.NODE_ENV === "development"

function createWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    if(isDevelopment) {
        window.loadURL("http://localhost:8080")
    } else {
        window.loadFile(path.join(__dirname, "./renderer/index.html"))
    }
}

app.on('window-all-closed', function () {
    if(process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function() {
        if(BrowserWindow.getAllWindows().length === 0) createWindow()    
    })
})

