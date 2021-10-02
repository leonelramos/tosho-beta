const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    renderer: path.join(__dirname, 'src', 'Electron', 'renderer.js'),
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist', 'renderer'),
    assetModuleFilename: '[name].[hash][ext]',
  },

  target: 'electron-renderer',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: [/\.(epub|png|svg|jpe?g|gif)$/],
        exclude: /node_modules/,
        type: 'asset',
      },
    ],
  },

  devtool: 'source-map',

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist', 'renderer'),
    },
    port: 8080,
    hot: false,
    liveReload: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
  ],
};
