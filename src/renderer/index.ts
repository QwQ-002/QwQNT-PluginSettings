import '../components/index';
import { SettingInterface } from '../settings/index';
import type { IQwQNTPlugin } from '../types/QwQNTPlugin';
import packageJson from '../../package.json';

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

RendererEvents.onSettingsWindowCreated(async () => {
  await registerPluginSettings(packageJson);
});