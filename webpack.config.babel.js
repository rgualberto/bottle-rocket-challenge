/*global __dirname */
import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import htmlWebpackTemplate from 'html-webpack-template';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import CompressionPlugin from 'compression-webpack-plugin';
// import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

import WebpackPwaManifest from 'webpack-pwa-manifest';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';

// app requires key. let it fail if no config file found
import {googleMapsApiKey} from './mapsConfig.js';

module.exports = (env = {}) => {
  const isProd = env.production;
  const NODE_ENV = isProd ? JSON.stringify("production") : JSON.stringify("development");

  console.log(`Building NODE_ENV=${NODE_ENV}`);

  return {
    entry: './index.js',
    context: path.join(__dirname, 'src'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },

    optimization: {
      ...isProd && {
        minimizer: [
            new TerserPlugin({
              cache: true,
              parallel: true
            }),
            new OptimizeCSSAssetsPlugin({
              assetNameRegExp: /\.styles\.css$/g,
              cssProcessor: require('cssnano'),
              cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
              },
              canPrint: true
            })
        ]
      }
    },

    resolve: {
      alias: {
        assets: path.resolve(__dirname, 'src/assets/'),
        components: path.resolve(__dirname, 'src/components/'),
        helpers: path.resolve(__dirname, 'src/helpers/'),
        pages: path.resolve(__dirname, 'src/pages/')
      }
    },

    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV,
          prod: isProd
        }
      }),
      ...isProd ? [
        new MiniCssExtractPlugin({
          filename: `styles.css?v=[hash]`,
          chunkFilename: "[name].css?v=[hash]"
        }),
        new CompressionPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.(js|css)(\?.*)?$/
        })
      ]:[],
      new HtmlWebpackPlugin({
        // inject: false, // webpack 5 wants this to be true
        template: require('html-webpack-template'),
        filename: 'index.html',
        title: 'Lunch Tyme',
        appMountIds: ['app'],
        mobile: true,
        scripts: [
          {
            src: `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}`,
            async: true,
            defer: true
          }
        ]
      }),
      new CopyWebpackPlugin([
        {
          from: 'assets/**/*.*',
          to: '.'
        },
      ]),
      new WebpackPwaManifest({
        name: 'Lunch Tyme',
        short_name: 'LunchTyme',
        start_url: "/",
        description: 'One stop shop for lunch!',
        background_color: '#ffffff',
        theme_color: '#43E895',
        orientation: "portrait-primary",
        publicPath: '/',
        // crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('src/assets/images/icon_map@2x.png'),
            size: "60x60"
          }
        ]
      }),
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: "./helpers/service-workers/service-worker.js",
        swDest: "service-worker.js"
      })
      // new WorkboxWebpackPlugin.GenerateSW()
    ],

    mode: isProd ? 'production' : 'development',

    devServer: {
      hot: true,
      historyApiFallback: true,
      disableHostCheck: true
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.s?css$/,
          use: !isProd
            ? [
                "style-loader",
                { loader: 'css-loader', options: { sourceMap: true } },
                { loader: 'sass-loader', options: { sourceMap: true } }
              ]
            : [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {}
                },
                "css-loader", 'sass-loader'
              ]
        },
        {
           test: /\.(png|svg|jpe?g|gif)$/,
           use: [
             'file-loader',
           ],
         },
      ],
    }
  };
}
