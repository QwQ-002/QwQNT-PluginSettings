import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('QwQNTTemplate', {
  greeting: () => {
    ipcRenderer.send('QwQNTTemplate.greeting');
  }
});