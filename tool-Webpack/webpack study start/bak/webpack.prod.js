const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
	// 
    // 使用source-map调试错误，仅限开发环境
    // 'none'-不输出source-map信息
    // 'inline-source-map'-行内source-map，map信息直接保存在输出的脚本文件中
    // 'source-map'-生成单独的source-map文件
    // 'hidden-source-map'-生成单独的source-map文件，但不在bundle文件中添加引用注释
	devtool: 'none',
	// 
	// 插件配置（需要安装使用到的插件）
    plugins: [
        // 
        // 每次打包之前执行dist目录的清理工作
        // 开启wepack-dev-server模式应当关闭该插件
    	new CleanWebpackPlugin(['dist']),
    	//
    	// 能够删除JS模块中未引用代码的压缩工具，同时压缩JS代码
    	// Webpack 4.0+，通过webpack --mode production指定生产模式，将自动删除无用代码并执行JS代码的压缩
    	// new UglifyJSPlugin({
    	// 	sourceMap: false,  // 是否保留sourceMap，默认为false
    	// }),
    	// 
    	// 定义插件环境变量为生产环境
        // Webpack 4.0+，process.env.NODE_ENV 的值通过optimization.nodeEnv来指定
    	// new webpack.DefinePlugin({
    	// 	'process.env.NODE_ENV': JSON.stringify('production')
    	// })
	],
});