/// <reference types="vite/client" />

declare namespace RendererEvents {
  const onSettingsWindowCreated: (callback: () => void) => void;
}

interface IQwQNTPlugin {
  name: string;
  qwqnt: {
    name: string;
    inject: {
      renderer?: string;
      preload?: string;
    };
  };
}

declare namespace PluginSettings {
  interface ICommon {
    readConfig: <T>(id: string, defaultConfig?: T) => Promise<T>;
    writeConfig: <T>(id: string, newConfig: T) => void;
  }
  interface IRenderer extends ICommon {
    registerPluginSettings: (packageJson: IQwQNTPlugin) => HTMLDivElement;
  }

  const main: ICommon;
  const renderer: IRenderer;
}

declare namespace QwQNTPluginSettings {
  const readConfig: <T>(id: string, defaultConfig?: T) => Promise<T>;
  const writeConfig: <T>(id: string, newConfig: T) => void;
}
