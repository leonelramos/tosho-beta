const path = require('path');

module.exports = {
  resolve: {
    extensions: [".tsx", ".ts",".jsx", ".js", ".json", ".wasm"],
    alias: {
      EpubAlias$: path.resolve(__dirname, 'externals', 'builds', 'epub.js'),
      DefaultBooksAlias$: path.resolve(__dirname, 'testing-books'),
      BookRendererAlias$: path.resolve(__dirname, 'src', 'Utils', 'book-renderer.ts'),
      BookCreatorAlias$: path.resolve(__dirname, 'src', 'Utils', 'book-creator.ts'),
      CommonPropsAlias$: path.resolve(__dirname, 'src', 'Shared', 'common-props')
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