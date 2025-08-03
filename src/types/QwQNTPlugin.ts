export interface IQwQNTPlugin {
  name: string;
  qwqnt: {
    name: string;
    icon?: string;
    inject?: {
      renderer?: string;
      preload?: string;
    };
  };
};