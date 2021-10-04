const path = require('path');
const webpackCommon = require('./webpack.common');

module.exports = {
  entry: {
    preload: path.resolve(__dirname, '..', 'src', 'Electron', 'preload'),
    bookRenderPreload: path.resolve(__dirname, '..', 'src', 'Electron', 'book-render-preload'),
  },

  output: {
    filename: '[name].js',
    path: webpackCommon.output.path,
  },

  target: ['electron-preload'],

  resolve: {
    extensions: webpackCommon.resolve.extensions,
    alias: webpackCommon.resolve.alias
  },

  module: {
    rules: webpackCommon.module.rules
  },

  devtool: 'source-map',
};
