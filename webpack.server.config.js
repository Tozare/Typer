const path = require('path')

module.exports = {
    entry: './src/server.ts',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'builds'),
        filename: 'server.js',
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