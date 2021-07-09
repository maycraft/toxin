const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        // publicPath: 'dist/',
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        // contentBase: path.resolve(__dirname, 'dist'),
        // watchContentBase: true,
        open: true,
        // overlay: true,
        // lazy: false,
        // // compress: true,
        // hot: true,
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/source',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.pug$/i,
                use: ['pug-loader']
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(scss|css)$/i,
                use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'resolve-url-loader', 'sass-loader' ]
                // use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader' ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new miniCssExtractPlugin({
            filename: 'style.css'
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.pug',
            filename: 'index.html'
        })
    ],
    stats: {
        children: true,
        colors: true,
        errorDetails: true,
        logging: 'error',
    }
}

module.exports = (env, options) => {
	//получаем булевую переменну запущен ли сейчас продакш режим
	const isProd = options.mode === 'production';
	//В зависимости от значения сейчас продакш или нет, мы либо добавляем карту либо нет
	config.devtool = isProd ? 'eval-cheap-source-map' : 'eval-cheap-module-source-map';
    config.target = isProd ? 'browserslist' : 'web';
	return config;
}
