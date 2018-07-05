const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	// 入口文件-单文件
	entry: './src/outputManagement.js',
	// 输出文件-单文件
	output: {
		filename: 'outputManagement.bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	// 配置模块
	module: {
		// 模块规则列表
		rules: [
			{
				// 样式文件
				test: /\.css$/,
				use: [
					// 将css文件通过<style>标签添加到<head>中
					// 该loader自带模块热替换，当更新css依赖模块时，该loader在后台使用module.hot.accept来修补<style>标签。
					'style-loader',
					// 解释css文件中的 @import 和 url()
					'css-loader'
				]
			},
		]
	},
	// 插件配置
    plugins: [
    	// new ExtractTextPlugin("styles.css"),
    	// 使用配置的信息在dist目录创建一个html文件
    	// 该html文件中将自动包含output的脚本文件的引用
		new HtmlWebpackPlugin({
			// html标题，默认''
			title: 'Output Management',
			// 文件名，默认'index.html'
			filename: 'outputManagement-create.html',
		}),
	],
};