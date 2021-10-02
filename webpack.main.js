const path = require('path');

module.exports = {
  entry: {
    main: path.join(__dirname, 'src', 'Electron', 'main.js'),
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },

  target: ['electron-main'],

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
