import '../components/index';
import settingsStyle from '../settings/static/style.css?raw';
import { SettingInterface } from '../settings/index';
import type { IQwQNTPlugin } from '../types/QwQNTPlugin';

const settingInterface = new Promise<SettingInterface>(resolve => {
  RendererEvents.onSettingsWindowCreated(() => {
    document.head.insertAdjacentHTML('beforeend', `<style>${settingsStyle}</style>`);
    resolve(new SettingInterface());
  });
});

const registerPluginSettings = async (packageJson: IQwQNTPlugin): Promise<HTMLDivElement> => {
  return await (await settingInterface).add(packageJson);
};

Object.defineProperty(window, 'PluginSettings', {
  value: {
    renderer: {
      registerPluginSettings,
      readConfig: QwQNTPluginSettings.readConfig,
      writeConfig: QwQNTPluginSettings.writeConfig,
      openPath: QwQNTPluginSettings.openPath,
      openExternal: QwQNTPluginSettings.openExternal,
    },
  },
  writable: true,
});