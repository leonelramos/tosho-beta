const path = require('path');
const webpackCommon = require('./webpack.common')

module.exports = {
  entry: {
    main: path.resolve(__dirname, '..', 'src', 'Electron', 'main'),
  },

  output: {
    filename: '[name].js',
    path: webpackCommon.output.path,
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
