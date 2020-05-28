const path = require('path')

module.exports = {
    entry: './src/server.ts',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'builds'),
        publicPath: "/",
        filename: 'server.js',
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    'ts-loader',
                ]
            }
        ]
    }
}