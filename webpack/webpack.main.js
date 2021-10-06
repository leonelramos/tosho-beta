const path = require('path');
const webpackShared = require('./webpack.shared')

module.exports = {
  entry: {
    main: path.resolve(__dirname, '..', 'src', 'main', 'main'),
  },

  output: {
    filename: '[name].js',
    path: webpackShared.output.path,
  },

  target: ['electron-main'],

  resolve: {
    extensions: webpackShared.resolve.extensions
  },

  module: {
    rules: webpackShared.module.rules
  },

  devtool: 'source-map',
};
