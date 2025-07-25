export interface IQwQNTPlugin {
  name: string;
  qwqnt: {
    name: string;
    inject: {
      renderer?: string;
      preload?: string;
    };
    settings?: string;
  };
};

export interface IQwQNTPlugins {
  packageJson: IQwQNTPlugin;
  path: string;
};