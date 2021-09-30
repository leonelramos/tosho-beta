const path = require('path')

module.exports = {
    entry: {
        main: './electron/main.js'
    },

    output: {
        filename: '[name].js',
        path: path.join(__dirname, './dist/electron/')
    },

    target: ['electron-main'],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },

    devtool: 'source-map'
}