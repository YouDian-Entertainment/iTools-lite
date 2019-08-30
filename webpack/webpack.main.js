const path = require('path');
const webpack = require('webpack');

const mainConfig = {
    target: 'electron-main',
    entry: {
        main: path.join(__dirname, '../src/main.js'),
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, '../dist/electron'),
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                enforce: 'pre', // 强制先进行 ESLint 检查
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // 启用自动修复
                    fix: true,
                    // 启用警告信息
                    emitWarning: true,
                }
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.node$/,
                exclude: /node_modules/,
                use: 'node-loader'
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.json', '.node'],
    },
    node: {
        __dirname: process.env.ENV !== 'prod',
        __filename: process.env.ENV !== 'prod'
    },
};

module.exports = mainConfig;
