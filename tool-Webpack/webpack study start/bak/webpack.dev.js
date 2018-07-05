const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	//
	//  使用source-map调试错误，仅限开发环境
	//  'none'-不输出source-map信息
	//  'inline-source-map'-行内source-map，map信息直接保存在输出的脚本文件中
	//  'source-map'-生成单独的source-map文件
	//  'hidden-source-map'-生成单独的source-map文件，但不在bundle文件中添加引用注释
	devtool: 'inline-source-map',
	// 
	// 开发服务器配置（需要安装：webpack-dev-server）
	// webpack-dev-server启动了一个使用express的http服务器，用来伺服资源文件。
	// 此外这个http服务器和client使用了websocket通讯协议，原始文件做出改动后，
	// webpack-dev-server会实时编译，但是最后的编译文件并不会输出到目标文件夹，而是存在于内存之中。
	// 该配置选项仅针对webpack-dev-server命令有效
	devServer: {
		// 内容的基础路径
		// 告诉开发服务器（dev server)在哪里查找文件
		contentBase: './dist',
  		// true-(默认)内联脚本模式，控制台输出实时编译reload信息
  		// false-使用iframe模式，iframe加载页面，预留header容器打印实时编译reload信息
  		inline: true,
  		// 开启模块热替换
  		hot: true
	},
	// 
	// 插件配置（需要安装使用到的插件）
    plugins: [
		// 
		// 模块热替换插件（webpack 内置的 HMR 插件）
		// 会在运行时代码中加入热替换的代码，应仅用于开发模式，生产模式应该移除
		new webpack.HotModuleReplacementPlugin(),
		// 
		// 以便更容易查看要修补(patch)的依赖
		// 通常与模块热替换插件配合使用
		// 更新组件时在控制台输出组件的路径而不是数字ID，用在开发模式
		// new webpack.NamedModulesPlugin(),
	],
});