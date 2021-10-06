const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackShared = require('./webpack.shared');

module.exports = {
  entry: {
    index: path.resolve(__dirname, '..', 'src', 'renderer', 'index'),
  },

  output: {
    filename: '[name].js',
    path: path.resolve(webpackShared.output.path, 'renderer'),
    assetModuleFilename: '[name].[hash][ext]',
  },

  target: 'electron-renderer',

  resolve: {
    extensions: webpackShared.resolve.extensions,
    plugins: webpackShared.resolve.plugins
  },

  module: {
    rules: webpackShared.module.rules
  },

  devtool: 'source-map',

  devServer: {
    static: {
      directory: path.resolve(webpackShared.output.path, 'renderer'),
    },
    port: 8080,
    hot: false,
    liveReload: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src', 'renderer', 'templates', 'index'),
    })
  ],
};
