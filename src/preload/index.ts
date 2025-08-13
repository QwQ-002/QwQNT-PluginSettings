import { contextBridge, ipcRenderer } from 'electron';

const readConfig = <T>(id: string, defaultConfig?: T): T => {
  return ipcRenderer.sendSync('QwQNTPluginSettings.readConfig', id, defaultConfig);
};

const writeConfig = <T>(id: string, newConfig: T): boolean => {
  return ipcRenderer.sendSync('QwQNTPluginSettings.writeConfig', id, newConfig);
};

const openPath = (path: string) => {
  ipcRenderer.send('QwQNTPluginSettings.openPath', path);
};

const openExternal = (url: string) => {
  ipcRenderer.send('QwQNTPluginSettings.openExternal', url);
};

contextBridge.exposeInMainWorld('QwQNTPluginSettings', {
  readConfig,
  writeConfig,
  openPath,
  openExternal,
  parsePath: (...pathParts: string[]): Promise<string> => {
    return ipcRenderer.invoke('QwQNTPluginSettings.parsePath', ...pathParts);
  },
});

Object.defineProperty(globalThis, 'PluginSettings', {
  value: {
    preload: {
      readConfig,
      writeConfig,
      openPath,
      openExternal,
    },
  },
  writable: true,
});