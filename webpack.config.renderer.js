const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { output } = require('./webpack.config.main')

module.exports = {
    entry: 'renderer.js',
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist/')
    },
    target: 'electron-renderer',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        static: path.join(__dirname, './dist/renderer')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
}
