import { join } from 'path';
import { access, mkdir, readFile, writeFile } from 'fs/promises';
import { ipcMain } from 'electron';

const checkDirOrFileExist = async (path: string): Promise<boolean> => {
  let exist: boolean;

  try{
    await access(path);
    exist = true;
  } catch{
    exist = false;
  }

  return exist;
};

const writeConfig = async <T>(id: string, newConfig: T) => {
  const configsPath: string = qwqnt.framework.paths.configs;
  const configPath = join(configsPath, id, 'config.json');
  const rawNewConfig = JSON.stringify(newConfig, undefined, 2);

  await writeFile(configPath, rawNewConfig, 'utf-8');
};
const readConfig = async <T>(id: string, defaultConfig?: T): Promise<T> => {
  const configsPath: string = qwqnt.framework.paths.configs;
  const idPath = join(configsPath, id);
  const configPath = join(idPath, 'config.json');

  if(!await checkDirOrFileExist(idPath)) await mkdir(idPath);
  if(!await checkDirOrFileExist(configPath)) await writeConfig(id, defaultConfig ? defaultConfig : {});

  return JSON.parse(await readFile(configPath, 'utf-8'));
};

ipcMain.handle('QwQNTPluginSettings.readConfig', <T>(_, id: string, defaultConfig?: T) => {
  readConfig(id, defaultConfig);
});

ipcMain.on('QwQNTPluginSettings.writeConfig', <T>(_, id: string, newConfig: T) => {
  writeConfig(id, newConfig);
});

Object.defineProperty(global, 'PluginSettings', {
  value: {
    main: {
      readConfig,
      writeConfig,
    },
  },
  writable: true,
});