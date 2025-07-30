import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('QwQNTPluginSettings', {
  readConfig: <T>(id: string, defaultConfig?: T): Promise<T> => {
    return ipcRenderer.invoke('QwQNTPluginSettings.readConfig', id, defaultConfig);
  },
  writeConfig: <T>(id: string, newConfig: T) => {
    ipcRenderer.send('QwQNTPluginSettings.writeConfig', id, newConfig);
  },
});