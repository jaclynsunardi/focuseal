const { contextBridge, ipcRenderer } = require('electron');

// Proper contextBridge exposure
contextBridge.exposeInMainWorld('electronAPI', {
    saveText: (text) => ipcRenderer.invoke('appendText', text)
});