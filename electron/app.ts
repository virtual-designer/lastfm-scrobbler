import { config } from "dotenv";
import { app, BrowserWindow, App as ElectronApp, ipcMain, shell } from "electron";
import express from "express";
import path from "path";
import url from "url";
import { ConfigManager } from "./ConfigManager";

config({
    path: path.resolve(__dirname, "../.env"),
});

export class App {
    public readonly app: ElectronApp;
    public readonly configManager: ConfigManager;

    public constructor(public readonly win: BrowserWindow) {
        this.app = app;
        this.configManager = new ConfigManager(this);
    }

    public run() {
        this.win.webContents.send("configLoad", this.configManager.config);
        
        ipcMain.on("signOut", () => {
            this.configManager.config.user = undefined;
            this.configManager.write();
            console.log("Signed out");
            this.win.webContents.send("signOutComplete");
        });

        ipcMain.on("openAuthScreen", () => {
            const url = `http://www.last.fm/api/auth/?api_key=${process.env.API_KEY}`;
            console.log("Here 1");

            const server = express();
            let listenReturn: any;

            console.log("Here 2");
            server.get("/auth/callback", (req, res) => {
                console.log("Here 4");

                const { token } = req.query;

                if (!token) {
                    return;
                }

                this.configManager.config.user = {
                    authorized: true,
                    token,
                };

                this.configManager.write();
                res.send("<h1>Authorization complete!</h1><p>You may close this broswer tab or window now.</p>");

                listenReturn?.close();
                this.win.webContents.send("authScreenComplete", token);
                this.win.show();
                this.win.focus();
            });

            console.log("Here 3");
            listenReturn = server.listen(5500, () => {
                console.log("Server started");
                shell.openExternal(url);
            });
        });
    }
}

function createWindow() {
    const startUrl =
        process.env.ELECTRON_START_URL ??
        url.format({
            pathname: path.join(__dirname, "../vite_dist/index.html"),
            protocol: "file:",
            slashes: true,
        });

    const win = new BrowserWindow({
        minWidth: 700,
        minHeight: 500,
        webPreferences: {
            nodeIntegration: true,
            preload: path.resolve(__dirname, "preload.js"),
        },
    });

    if (process.env.SYSENV !== "dev") win.setMenu(null);

    win.loadURL(startUrl);

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    });

    win.webContents.once("did-finish-load", () => {
        const application = new App(win);
        application.run();
    });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
