import { type ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';
import { type BuildOptions } from './types/types';
import ReactRefreshTypescript from 'react-refresh-typescript';

export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
  const { mode } = options;

  const isDev = mode === 'development';

  const tsLoader = {
    // ts-loader из коробки работает с JSX. Иначе пришлось бы настраивать babel-loader
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypescript()].filter(Boolean),
          }),
        },
      },
    ],
    exclude: /node_modules/,
  };

  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: isDev,
          modules: {
            localIdentName: isDev ? '[name]__[local]' : '[hash:base64:8]',
          },
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
  };

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const svgrLoader = {
    test: /\.svg$/,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  return [tsLoader, cssLoader, assetsLoader, svgrLoader];
};
