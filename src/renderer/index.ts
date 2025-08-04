import '../components/index';
import { SettingInterface } from '../settings/index';
import type { IQwQNTPlugin } from '../types/QwQNTPlugin';

const settingInterface = new Promise<SettingInterface>(resolve => {
  RendererEvents.onSettingsWindowCreated(() => {
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
    },
  },
  writable: true,
});