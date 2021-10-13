const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

const isDev = process.env.NODE_ENV === 'development';
const pages = [
    'index',
    'colors',
    'elements',
    'cards',
    'headers',
    'landing',
    'search-room',
    'room-details',
    'registration',
    'login',
];
console.log(isDev);
module.exports = {
    entry: {
        index: '@/app.js',
        colors: '@pages/colors/colors.js',
        elements: '@pages/elements/elements.js',
        cards: '@pages/cards/cards.js',
        headers: '@pages/headers/headers.js',
        landing: '@pages/landing/landing.js',
        'search-room': '@pages/search-room/search-room.js',
        'room-details': '@pages/room-details/room-details.js',
        registration: '@pages/registration/registration.js',
        login: '@pages/login/login.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].bundle.js',
        publicPath: '/toxin/',
    },
    devServer: {
        historyApiFallback: true,
        // inline: true,
        watchContentBase: true,
        hot: true,
        open: true,
        openPage: 'toxin/',
        host: '10.1.2.15',
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
                use: {
                    loader: 'pug-loader',
                    options: {
                        root: path.resolve(__dirname, 'src'),
                    },
                },
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
            disable: isDev,
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: {
                quality: '50-70',
            },
            plugins: [
                imageminMozjpeg({
                    quality: 70,
                    progressive: true,
                }),
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
