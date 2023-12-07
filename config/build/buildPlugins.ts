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

export const buildPlugins = (
  options: BuildOptions,
): Configuration['plugins'] => {
  const { mode, paths, analyzer, platform } = options;

  const isDev = mode === 'development';
  const isProd = !isDev;

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: paths.html,
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
    plugins.push(new ProgressPlugin());
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    );
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};
