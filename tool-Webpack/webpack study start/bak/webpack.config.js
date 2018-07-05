const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	// 入口文件
	entry: {
		outputManagement: './src/outputManagement.js',
		print: './src/print.js',
	},
	// 输出文件
	output: {
		filename: '[name].bundle-2.js',
		path: path.resolve(__dirname, 'dist'),
	},
	// 配置模块
	module: {
		// 模块规则列表
		rules: [
		]
	},
	// 配置开发服务器
	devServer: {
		// 告诉开发服务器（dev server)在哪里查找文件
		contentBase: './'
	},
	// 插件配置
    plugins: [
    	// 每次打包之前执行dist目录的清理工作
    	// new CleanWebpackPlugin(['dist']),
    	// 使用配置的信息在dist目录创建一个html文件
    	// 该html文件中将自动包含output的脚本文件的引用
		new HtmlWebpackPlugin({
			// html标题，默认''
			title: 'Output Management',
			// 文件名，默认'index.html'
			filename: 'outputManagement-create.html',
		})
	],
};