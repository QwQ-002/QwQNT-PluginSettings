import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('QwQNTPluginSettings', {
  readConfig: <T>(id: string): Promise<T> => ipcRenderer.invoke('QwQNTPluginSettings.readConfig', id),
  writeConfig: <T>(id: string, newConfig: T) => {
    ipcRenderer.send('QwQNTPluginSettings.writeConfig', id, newConfig);
  },
});