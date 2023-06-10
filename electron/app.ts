import { config } from 'dotenv';
import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';

config({
    path: path.resolve(__dirname, '../.env'),
});

function createWindow() {
    const startUrl = process.env.ELECTRON_START_URL ?? url.format({
        pathname: path.join(__dirname, '../vite_dist/index.html'),
        protocol: 'file:',
        slashes: true,
    });

    const win = new BrowserWindow({
        minWidth: 700,
        minHeight: 500,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        },
    });

    win.setMenu(null);
    win.loadURL(startUrl);

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});