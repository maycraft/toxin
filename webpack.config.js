const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminOptipng = require('imagemin-optipng');

const isDev = process.env.NODE_ENV === 'development';
const pages = ['index', 'colors', 'elements', 'cards', 'headers', 'landing', 'search'];
console.log(isDev);
module.exports = {
    entry: {
        index: '@/app.js',
        colors: '@pages/colors/colors.js',
        elements: '@pages/elements/elements.js',
        cards: '@pages/cards/cards.js',
        headers: '@pages/headers/headers.js',
        landing: '@pages/landing/landing.js',
        search: '@pages/search/search.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].bundle.js',
        publicPath: '/toxin/',
    },
    devServer: {
        historyApiFallback: true,
        // inline: true,
        hot: true,
        open: true,
        openPage: 'toxin/',
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
                type: 'asset/resource',
                // type: 'asset/inline',
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
                    // isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/img'),
                    to: path.resolve(__dirname, 'dist/assets/img'),
                },
            ],
        }),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            jpegtran: null,
            plugins: [
                imageminMozjpeg({
                    quality: 70,
                    progressive: true,
                }),
                imageminOptipng(),
            ],
        }),
        ...pages.map(
            page =>
                new HtmlWebpackPlugin({
                    favicon: 'src/favicon.png',
                    template: `src/pages/${page}/${page}.pug`,
                    inject: 'body',
                    filename: page === 'index' ? 'index.html' : `${page}.html`,
                    chunks: [page],
                }),
        ),
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
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@fonts': path.resolve(__dirname, 'src/fonts'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@scss': path.resolve(__dirname, 'src/scss'),
        },
    },
};
