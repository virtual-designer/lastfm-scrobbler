import { config } from 'dotenv';
import { app, BrowserWindow, App as ElectronApp } from 'electron';
import path from 'path';
import url from 'url';
import { ConfigManager } from './ConfigManager';

config({
    path: path.resolve(__dirname, '../.env'),
});

export class App {
    public readonly app: ElectronApp;
    public readonly configManager: ConfigManager;

    public constructor(public readonly win: BrowserWindow) {
        this.app = app;
        this.configManager = new ConfigManager(this);
    }

    public run() {
        if (!this.configManager.config.user) {
            this.win.webContents.send('unauthorized');
        }
    }
}

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
            preload: path.resolve(__dirname, "preload.js")
        },
    });

    if (process.env.SYSENV !== 'dev')
        win.setMenu(null);
    
    win.loadURL(startUrl);

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    win.webContents.once('did-finish-load', () => {
        const application = new App(win);
        application.run();
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