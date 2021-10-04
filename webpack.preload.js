const path = require('path');
const webpackCommon = require('./webpack.common');

module.exports = {
  entry: {
    preload: path.resolve(__dirname, 'src', 'Electron', 'preload.ts'),
    renderPreload: path.resolve(__dirname, 'src', 'Electron', 'render-preload.ts'),
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
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
