import { type Configuration } from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { buildOutput } from './buildOutput';
import { type BuildOptions } from './types/types';

export const buildWebpack = (options: BuildOptions): Configuration => {
  const { mode, paths } = options;

  const isDev = mode === 'development';

  return {
    mode: mode ?? 'development',
    resolve: buildResolvers(options),
    entry: paths.entry,
    output: buildOutput(options),
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    devtool: isDev && 'inline-source-map',
    devServer: isDev ? buildDevServer(options) : undefined,
  };
};
