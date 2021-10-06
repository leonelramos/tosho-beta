const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts','.jsx', '.js', '.json', '.html', '.css', '.scss','.wasm', '.jpg'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.[j|t]sx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: [/\.(png|svg|jpe?g|gif)$/],
        exclude: /node_modules/,
        type: 'asset/resource',
      },
    ],
  },
}