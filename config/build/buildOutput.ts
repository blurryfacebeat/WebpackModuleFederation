import { type Configuration } from 'webpack';
import { type BuildOptions } from './types/types';

export const buildOutput = (options: BuildOptions): Configuration['output'] => {
  const { paths } = options;

  return {
    path: paths.output,
    // contentshash берет контент из файла и делает хеш. Нужно для того, чтобы названия файлов обновлялись и сбрасывался кеш
    filename: '[name].[contenthash].js',
    clean: true,
  };
};
