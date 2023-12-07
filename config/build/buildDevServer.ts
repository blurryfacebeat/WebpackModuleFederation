import { type Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { type BuildOptions } from './types/types';

export const buildDevServer = (
  options: BuildOptions,
): DevServerConfiguration => {
  const { port } = options;

  return {
    port: port || 3000,
    open: true,
  };
};
