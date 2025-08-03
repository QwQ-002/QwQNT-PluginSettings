import '../components/index';
import { SettingInterface } from '../settings/index';
import type { IQwQNTPlugin } from '../types/QwQNTPlugin';

const registerPluginSettings = async (packageJson: IQwQNTPlugin): Promise<HTMLDivElement> => {
  return new SettingInterface().add(packageJson);
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