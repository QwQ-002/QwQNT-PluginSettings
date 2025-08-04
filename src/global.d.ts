/// <reference types="vite/client" />

declare namespace RendererEvents {
  const onSettingsWindowCreated: (callback: () => void) => void;
}

declare namespace PluginSettings {
  interface ICommon {
    readConfig: <T>(id: string, defaultConfig?: T) => Promise<T>;
    writeConfig: <T>(id: string, newConfig: T) => void;
  }
  interface IRenderer extends ICommon {
    registerPluginSettings: (packageJson: import('./types/QwQNTPlugin').IQwQNTPlugin) => Promise<HTMLDivElement>;
  }

  const main: ICommon;
  const preload: ICommon;
  const renderer: IRenderer;
}

declare namespace QwQNTPluginSettings {
  const readConfig: <T>(id: string, defaultConfig?: T) => Promise<T>;
  const writeConfig: <T>(id: string, newConfig: T) => void;
  const parsePath: (...pathParts: string[]) => Promise<string>;
}
