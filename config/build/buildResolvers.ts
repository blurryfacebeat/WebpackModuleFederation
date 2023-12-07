import { type Configuration } from 'webpack';
import { type BuildOptions } from './types/types';

export const buildResolvers = (
  options: BuildOptions,
): Configuration['resolve'] => {
  const { paths } = options;

  return {
    alias: {
      '@': paths.resolveAlias,
    },
    extensions: ['.tsx', '.ts', '.js'],
  };
};
