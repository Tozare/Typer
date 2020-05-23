const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/app.tsx',
    output: {
        path: path.resolve(__dirname, 'builds/app/'),
        filename: 'app.[hash].js',
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
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            'components': path.resolve(__dirname, './src/components'),
            'services': path.resolve(__dirname, './src/services'),
            '@domain': path.resolve(__dirname, './domain'),
            '@commons': path.resolve(__dirname, './commons')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html',
            inject: true,
        })
    ]
}