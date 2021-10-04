const path = require('path');
const webpackCommon = require('./webpack.common')

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src', 'Electron', 'main.ts'),
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  target: ['electron-main'],

  resolve: {
    extensions: webpackCommon.resolve.extensions
  },

  module: {
    rules: webpackCommon.module.rules
  },

  devtool: 'source-map',
};
