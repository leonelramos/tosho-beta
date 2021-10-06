const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts','.jsx', '.js', '.json', '.html', '.css', '.scss','.wasm'],
    alias: {
      DefaultBooksAlias$: path.resolve(__dirname, '..', 'testing-books'),
      BookRendererAlias$: path.resolve(__dirname, '..', 'src', 'preload', 'scripts', 'book-renderer'),
      BookCreatorAlias$: path.resolve(__dirname, '..', 'src', 'preload', 'scripts', 'book-creator'),
      CommonPropsAlias$: path.resolve(__dirname, '..', 'src', 'renderer', 'scripts', 'common-props')
    }
  },
  module: {
    rules: [
      {
        test: /\.[j|t]sx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: [/\.[epub|png|svg|jpe?g|gif]$/],
        exclude: /node_modules/,
        type: 'asset',
      },
    ],
  },
}