const path = require('path');
const webpackShared = require('./webpack.shared');

module.exports = {
  entry: {
    appWinPreload: path.resolve(__dirname, '..', 'src', 'preload', 'app-win-preload'),
    readerWinPreload: path.resolve(__dirname, '..', 'src', 'preload', 'reader-win-preload'),
  },

  output: {
    filename: '[name].js',
    path: webpackShared.output.path,
  },

  target: ['electron-preload'],

  resolve: {
    extensions: webpackShared.resolve.extensions,
    alias: webpackShared.resolve.alias
  },

  module: {
    rules: webpackShared.module.rules
  },

  devtool: 'source-map',
};
