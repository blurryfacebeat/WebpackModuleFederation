import type webpack from 'webpack';
import { buildWebpack } from './config/build/buildWebpack';
import {
  type BuildMode,
  type BuildPaths,
  type BuildPlatform,
} from './config/build/types/types';
import path from 'path';

type Env = {
  mode: BuildMode;
  port: number;
  analyzer: boolean;
  platform: BuildPlatform;
};

export default (env: Env) => {
  const { mode, port, analyzer, platform } = env;

  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: path.resolve(__dirname, 'dist'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
  };

  const config: webpack.Configuration = buildWebpack({
    port: port ?? 3000,
    mode: mode ?? 'development',
    platform: platform ?? 'desktop',
    paths,
    analyzer,
  });

  return config;
};
