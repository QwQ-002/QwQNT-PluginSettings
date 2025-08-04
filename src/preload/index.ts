import { contextBridge, ipcRenderer } from 'electron';

const readConfig = <T>(id: string, defaultConfig?: T): Promise<T> => {
  return ipcRenderer.invoke('QwQNTPluginSettings.readConfig', id, defaultConfig);
};

const writeConfig = <T>(id: string, newConfig: T) => {
  ipcRenderer.send('QwQNTPluginSettings.writeConfig', id, newConfig);
};

contextBridge.exposeInMainWorld('QwQNTPluginSettings', {
  readConfig,
  writeConfig,
  parsePath: (...pathParts: string[]): Promise<string> => {
    return ipcRenderer.invoke('QwQNTPluginSettings.parsePath', ...pathParts);
  },
});

Object.defineProperty(window, 'PluginSettings', {
  value: {
    preload: {
      readConfig,
      writeConfig,
    },
  },
  writable: true,
});