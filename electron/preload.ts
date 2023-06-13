import { contextBridge, ipcRenderer } from "electron";

const validChannels = ["configLoad", "openAuthScreen", "authScreenComplete", "signOut", "signOutComplete"];

contextBridge.exposeInMainWorld("api", {
    receive(channel: string, callback: Function) {
        if (validChannels.includes(channel)) {
            return ipcRenderer.on(channel, (event, ...args) => callback(...args));
        }

        throw new Error("Invalid API Channel");
    },
    removeReceiveListeners(channel: string) {
        if (validChannels.includes(channel)) {
            return ipcRenderer.removeAllListeners(channel);
        }

        throw new Error("Invalid API Channel");
    },
    send(channel: string, ...data: any[]) {
        if (validChannels.includes(channel)) {
            console.log("Done");
            return ipcRenderer.send(channel, ...data);
        }

        throw new Error("Invalid API Channel");
    },
});
