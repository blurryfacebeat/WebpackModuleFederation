import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { type Configuration as DevServerConfiguration } from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';

type Mode = 'production' | 'development';

type Env = {
  mode: Mode;
  port: number;
};

export default (env: Env) => {
  const isDev = env.mode === 'development';
  const isProd = !isDev;

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
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
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
      new webpack.ProvidePlugin({
        React: 'react',
      }),
      isProd &&
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css',
        }),
      // Показывает прогресс сборки в процентах
      isDev && new webpack.ProgressPlugin(),
    ].filter(Boolean),
    module: {
      rules: [
        {
          // ts-loader из коробки работает с JSX. Иначе пришлось бы настраивать babel-loader
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDev,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [autoprefixer()],
                },
                sourceMap: isDev,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDev,
              },
            },
          ],
        },
      ],
    },
    devtool: isDev && 'inline-source-map',
    devServer: isDev ? devServer : undefined,
  };

  return config;
};
