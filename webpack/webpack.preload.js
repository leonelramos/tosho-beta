const path = require('path');
const webpackShared = require('./webpack.shared');

module.exports = {
  entry: {
    appWinPreload: path.resolve(
      __dirname,
      '..',
      'src',
      'preload',
      'app-win-preload'
    )
  },

  output: {
    filename: '[name].js',
    path: webpackShared.output.path
  },

  target: ['electron-preload'],

  resolve: {
    extensions: webpackShared.resolve.extensions,
    plugins: webpackShared.resolve.plugins
  },

  module: {
    rules: webpackShared.module.rules
  },

  devtool: 'source-map'
};
