const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    watch: true,
    watchOptions: {
      ignored: ['files/**/*.js', 'node_modules']
    },
    devServer: {
        contentBase: './dist',
        host: "192.168.1.12",
        hot: true
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'sPRINT',
            meta: {
                // viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
                viewport: "width=device-width, initial-scale=0.6, maximum-scale=0.6, user-scalable=0"
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
}