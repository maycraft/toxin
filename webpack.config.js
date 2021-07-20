const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
console.log(isDev);
module.exports = {
    entry: {
        index: './src/app.js',
        'ui-kit': './src/pages/ui-kit/ui-kit.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        open: true,
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                // type: 'asset/resource',
                type: 'asset/inline',
            },
            {
                test: /\.pug$/i,
                use: ['pug-loader'],
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                    { loader: 'eslint-loader' },
                ],
            },
            {
                test: /\.(scss|css)$/i,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            favicon: './src/favicon.png',
            template: 'src/index.pug',
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            favicon: './src/favicon.png',
            template: 'src/pages/ui-kit/ui-kit.pug',
            filename: 'ui-kit.html',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
    ],
    stats: {
        children: true,
        colors: true,
        errorDetails: true,
        logging: 'error',
    },
    target: isDev ? 'web' : 'browserslist',
    devtool: isDev ? 'eval-cheap-module-source-map' : false,
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
    },
};
