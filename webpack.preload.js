const path = require('path');

module.exports = {
  entry: {
    preload: path.join(__dirname, 'src', 'Electron', 'preload.js'),
    renderPreload: path.join(__dirname, 'src', 'Electron', 'render-preload.js'),
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },

  target: ['electron-preload'],

  resolve: {
    alias: {
      EpubAlias$: path.resolve(__dirname, 'externals', 'builds', 'epub.js'),
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  devtool: 'source-map',
};
