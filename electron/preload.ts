import { contextBridge, ipcRenderer } from "electron";

const validChannels = ['unauthorized'];

contextBridge.exposeInMainWorld("api", {
    receive(channel: string, callback: Function) {
        if (validChannels.includes(channel)) {
            return ipcRenderer.on(channel, (event, ...args) => callback(...args)); 
        }
    },
    removeReceiveListeners(channel: string) {
        if (validChannels.includes(channel)) {
            return ipcRenderer.removeAllListeners(channel); 
        }
    },
});