const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.tsx',
    output: {
        path: path.resolve(__dirname, 'builds/app/'),
        filename: 'app.[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            strictMath: true,
                            noIeCompat: true
                        }
                    }
                ],
            },
            {
                test: /\.(ts|tsx)$/,
                use: [
                    'ts-loader',
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html',
            inject: true,
        })
    ]
}