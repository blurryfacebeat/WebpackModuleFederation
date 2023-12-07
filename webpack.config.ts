import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { type Configuration as DevServerConfiguration } from 'webpack-dev-server';

type Mode = 'production' | 'development';

type Env = {
  mode: Mode;
  port: number;
};

export default (env: Env) => {
  const isDev = env.mode === 'development';

  const devServer: DevServerConfiguration = {
    port: env.port || 3000,
    open: true,
  };

  const config: webpack.Configuration = {
    mode: env.mode ?? 'development',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.tsx', '.ts', '.js'],
    },
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
      path: path.resolve(__dirname, 'build'),
      // contentshash берет контент из файла и делает хеш. Нужно для того, чтобы названия файлов обновлялись и сбрасывался кеш
      filename: '[name].[contenthash].js',
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      // Показывает прогресс сборки в процентах
      isDev && new webpack.ProgressPlugin(),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    devtool: isDev && 'inline-source-map',
    devServer: isDev ? devServer : undefined,
  };

  return config;
};
