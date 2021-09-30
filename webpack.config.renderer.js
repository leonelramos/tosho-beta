const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: {
        renderer: './electron/renderer.js'
    },
        
    output: {
        filename: '[name].js',
        path: path.join(__dirname, './dist/renderer/')
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
        static: {
            directory: path.join(__dirname, './dist/renderer/')
        },
        port: 8080,
        hot: false,
        liveReload: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
}
