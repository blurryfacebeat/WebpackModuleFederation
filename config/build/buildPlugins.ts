import {
  ProvidePlugin,
  ProgressPlugin,
  DefinePlugin,
  type Configuration,
} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { type BuildOptions } from './types/types';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

export const buildPlugins = (
  options: BuildOptions,
): Configuration['plugins'] => {
  const { mode, paths, analyzer, platform } = options;

  const isDev = mode === 'development';
  const isProd = !isDev;

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.ico'),
    }),
    new ProvidePlugin({
      React: 'react',
    }),
    new DefinePlugin({
      ENV_PLATFORM: JSON.stringify(platform),
    }),
    new ForkTsCheckerWebpackPlugin(),
  ];

  if (isDev) {
    plugins.push(new ProgressPlugin(), new ReactRefreshPlugin());
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(paths.public, 'locales'),
            to: path.resolve(paths.output, 'locales'),
          },
        ],
      }),
    );
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};
