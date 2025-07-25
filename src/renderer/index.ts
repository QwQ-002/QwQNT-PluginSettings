import '../components/index';
import { IQwQNTPlugins } from '../types/QwQNTPlugin';

const settingsMap = new Map<string, Document>();

const registerPluginSettings = (id: string, html: string | HTMLDivElement) => {
  let doc: Document = new Document();
  if(typeof html === 'string') doc = new DOMParser().parseFromString(html, 'text/html');
  else doc.append(html);

  settingsMap.set(id, doc);
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
  await import('../settings/static/style.css');
  const SettingInterface = (await import('../settings/index')).SettingInterface;
  const plugins = qwqnt.framework.plugins as IQwQNTPlugins[];

  plugins.forEach(plugin => {
    let id: string;

    if(plugin.packageJson.qwqnt.settings) id = plugin.packageJson.qwqnt.settings;
    else id = plugin.packageJson.name;

    if(settingsMap.has(id)){
      let view = new SettingInterface().add(plugin);
      const div = document.createElement('div');

      div.append(...settingsMap.get(id)!.childNodes.values().toArray() as Node[]);
      view.append(div);
    }
  });
});