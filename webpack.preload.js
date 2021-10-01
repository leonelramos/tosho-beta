const path = require('path')

module.exports = {
    entry: {
        preload: path.join(__dirname, 'src', 'Electron', 'preload.js')
    },

    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },

    target: ['electron-preload'],

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