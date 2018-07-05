const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');   // 将引用自动写入html

module.exports = {
    mode: 'development',
    entry: {
        polyfills: './src/shimming/polyfills.js',
        index: './src/shimming/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                // 使用imports-loader用于将指定变量指向另一个对象
                test: require.resolve('./src/shimming/index.js'),
                use: 'imports-loader?dodododo=>window',
            }, 
            // {
            //     // 这里将传统的全局变量导出为模块变量
            //     // 但是测试报错，不知道是不是版本问题
            //     test: require.resolve('./src/shimming/globals.js'),
            //     use: 'imports-loader?file,parse=helpers.parse',
            // }
        ]
    },
    plugins: [
        // 如果你遇到了至少一处用到 lodash 变量的模块实例，
        // 那请你将 lodash package 包引入进来，
        // 并将其提供给需要用到它的模块。
        new webpack.ProvidePlugin({
            // _: 'lodash'
            join: ['lodash', 'join']
        }),
        //
        // 使用配置的信息在dist目录创建一个html文件
        // 该html文件中将自动包含output的脚本文件的引用
        new HtmlWebpackPlugin({
            // html标题，默认''
            title: 'shimming',
            // 文件名，默认'index.html'
            filename: 'shimming-create.html',
        }),
    ],
    devtool: 'inline-source-map',
};
