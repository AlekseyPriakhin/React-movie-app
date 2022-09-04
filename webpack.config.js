const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const plugins = [
    new HTMLWebpackPlugin({
        template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
    })
]

let target = 'web';
let mode = 'development';

if (process.env.NODE_ENV === 'production') {
    mode = 'production';
    target = 'browsersList'
}

if(process.env.SERVE){
    plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
    mode,
    plugins,
    target,
    module: {
        rules: [{ test: /\.(html)$/, use: ['html-loader'] },
        {
            test: /\.css$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                  modules: true,
                },
              },
            ],
          },
        /* {
            test: /\.(s[ac]|c)ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader',
            ],
        }, */
        {
            test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
            type: mode === 'production' ? 'asset' : 'asset/resource',
        },
        {
            test: /\.(woff2?|eot|ttf|otf)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader',
            options: {
            cacheDirectory: true,
            },
        },
        },
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader',
            options: {
            cacheDirectory: true,
            },
            },
        },
      ],
    },
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
        publicPath: '/'
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
        port: 3421,
        historyApiFallback: true,
    },
}