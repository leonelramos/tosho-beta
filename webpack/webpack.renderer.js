const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackCommon = require('./webpack.common');

module.exports = {
  entry: {
    renderer: path.resolve(__dirname, '..', 'src', 'Electron', 'renderer'),
  },

  output: {
    filename: '[name].js',
    path: path.resolve(webpackCommon.output.path, 'renderer'),
    assetModuleFilename: '[name].[hash][ext]',
  },

  target: 'electron-renderer',

  resolve: {
    extensions: webpackCommon.resolve.extensions,
    alias: webpackCommon.resolve.alias
  },

  module: {
    rules: webpackCommon.module.rules
  },

  devtool: 'source-map',

  devServer: {
    static: {
      directory: path.resolve(webpackCommon.output.path, 'renderer'),
    },
    port: 8080,
    hot: false,
    liveReload: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src', 'index'),
    })
  ],
};
