const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 	// 将引用自动写入html
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 删除文件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');  // 压缩JS插件
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");  // 默认的 webpack 会将import("style.css")文件嵌入js文件中，使用该插件会将css从js中提取出来


// 根据 npm script命令获取mode信息，默认为开发模式
const scriptCode = process.env['npm_lifecycle_script'] || '';
let mode = 'development';
let testMode = /--mode (development|production)/.exec(scriptCode);
if(testMode !== null) {
	mode = testMode[1];
}
console.log('Mode: ' + mode + '\n');


// Webpack配置
const webpackOptions = {
	// 在webpack的配置中，resolve我们常用来配置别名和省略后缀名
    resolve: {
        // 别名
        alias: {
            $: './src/jquery.js'
        },
        // 省略后缀
        extensions: ['.js', '.json', '.css']
    },
	//
	// 指定编译模式
	// development-开发模式，主要优化了增量构建速度和开发体验，process.env.NODE_ENV 的值不需要再定义，默认是 development，开发模式下支持注释和提示，并且支持 eval 下的 source maps。
	// production-生产模式，提供所有可能的优化，如代码压缩/作用域提升等，process.env.NODE_ENV 的值不需要再定义，默认是 production。
	// none-隐藏模式，这种模式下会禁用一切优化
	// 建议直接在NPM Script中通过--mode指定，且--mode的优先级高于这里的mode选项
	mode: mode,
	//
	// // 入口文件-单文件
	// entry: './src/outputManagement.js',
	//
	// // 输出文件-单文件
	// output: {
	// 	filename: 'outputManagement.bundle.js',
	// 	path: path.resolve(__dirname, 'dist'),
	// },
	//
	// 入口文件-多文件
	entry: {
		index: './src/main.js',
	},
	//
	//  输出文件-多文件
	output: {
		//
		//  输出路径
		path: path.resolve(__dirname, 'dist'),
		//
		// 无 chunkFilename 字段时，将引用到所有输入的脚本文件
		// 当存在 chunkFilename 字段时：
		//     如果没有指定 runtimeChunk 则表示入口文件的输出命名，
		//     否则为模块运行时文件的输出命名
		filename: '[name].[hash].js',
		//
		// 非入口模块的文件名称
		chunkFilename: '[name].[chunkhash].js',
	},
	//
	//  优化配置
	optimization: {
		// //
		// // 是否开启脚本压缩，development模式下默认为false，production模式下默认为true
		minimize: false,
		// //
		// // 指定压缩库，默认使用uglifyjs-webpack-plugin 1.0
		// minimizer: [new UglifyJSPlugin({sourceMap: false})],
		//
		// 将模块公共代码提取
		splitChunks: {
			// 确定需要将哪些块打包整合，默认值为async
			// 值-all: 针对所有可复用的模块
			// 值-initial: 针对初始块
			chunks: 'all',
			// 公共代码整合的name标识
			// 该参数还可以使用function(){}返回
			name: 'common',
			// 公共代码整合的文件名称
			filename: 'common.[chunkhash].js',
			// 代码提取必须满足模块被复用的次数，最低为1
			// minChunks: 1,
			// 代码提取后必须满足的最小文件大小，最低为0
			// minSize: 0,
			// 最大允许的异步请求数，最低为1
			// maxAsyncRequests: 1,
			// 最大允许的初始化请求，最低为1
			// maxInitialRequests: 1,
			// 将模块分配给缓存组
			// cacheGroups: {},
		},
		// splitChunks: {
		// 	cacheGroups: {
		// 		// 抽离第三方插件
		// 		vendor: {
		// 			// 指定是node_modules下的第三方包
		// 			test: /node_modules/,
		// 			// 确定需要将哪些块打包整合，默认值为async
		// 			// 值-all: 针对所有可复用的模块
		// 			// 值-initial: 针对初始块
		// 			chunks: 'initial',
		// 			// 打包后的文件名，任意命名
		// 			name: 'vendor',
		// 			// 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
		// 			priority: 10
		// 		},
		// 		// 抽离自己写的公共代码，utils这个名字可以随意起
		// 		utils: {
		// 			chunks: 'initial',
		// 			// 任意命名
		// 			name: 'utils',
		// 			// 只要超出0字节就生成一个新包
		// 			minSize: 0
		// 		}
		// 	}
		// },
		//
		// 将模块加载的运行时单独打包
		runtimeChunk: {
			name: 'runtime',
		},
		//
		// 设置 process.env.NODE_ENV
		nodeEnv: mode,
	},
	//
	//  配置模块
	module: {
		// 模块规则列表
		// webpack 4 中会默认解析 .wasm, .mjs, .js 和 .json 为后缀的文件。
		rules: [
			// {
			// 	// 样式文件
			// 	test: /\.css(\?.*)?$/,
			// 	// 针对文件使用loader，将按照从右向左的顺序进行解析
			// 	use: [
			// 		// 将css文件通过<style>标签添加到<head>中
			// 		// 该loader自带模块热替换，当更新css依赖模块时，该loader在后台使用module.hot.accept来修补<style>标签。
			// 		'style-loader',
			// 		// 解释css文件中的 @import 和 url()
			// 		'css-loader'
			// 	],
			// },
			{
				// 样式文件
				test: /\.css(\?.*)?$/,
				// 使用 ExtractTextWebpackPlugin 插件将样式文件抽离出来保存为单独的样式文件
                use: ExtractTextWebpackPlugin.extract({
                    // 抽离样式文件，不在需要 style-loader
                    use: ['css-loader', 'postcss-loader']
                })
			},
			{
				// 脚本文件
				test: /\.js$/,
				// 使用babel-loader转换ES6为ES5代码
				loader: 'babel-loader',
				// 只转化src目录下的js
                include: /src/,
                // 排除掉node_modules，优化打包速度
                exclude: /node_modules/
			},
			// {
			// 	// 图片文件
			// 	test: /\.(png|svg|jpg|gif)(\?.*)?$/,
			// 	use: [
			// 		// 将样式和脚本中引入的文件发送到输出文件夹，并返回（相对）URL
			// 		// 默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名
			// 		'file-loader'
			// 	]
			// },
			// {
			// 	// 图片文件
			// 	test: /\.(png|svg|jpg|gif)(\?.*)?$/,
			// 	// use中使用对象，方便写一些配置参数
			// 	use: [
			// 		{
			// 			// 像 file loader 一样工作，但如果文件小于限制，可以返回 data URL
			// 			loader: 'url-loader',
			// 			options: {
			// 				limit: 8192,    		// 小于8k的图片自动转成base64格式，并且不会存在实体图片
			// 				outputPath: 'images/'   // 图片打包后存放的目录
			// 			}
			// 		}
			// 	]
			// },
			// {
			// 	// 字体文件
			// 	test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
			// 	use: [
			// 		// 将样式和脚本中引入的文件发送到输出文件夹，并返回（相对）URL
			// 		// 默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名
			// 		'file-loader'
			// 	]
			// },
			{
				// 图片文件
				test: /\.(png|svg|jpg|gif)(\?.*)?$/,
				// 像 file loader 一样工作，但如果文件小于限制，可以返回 data URL
				loader: 'url-loader',
				// 单个loader的配置项可以这样写
				options: {
					limit: 8192,    		// 小于8k的图片自动转成base64格式，并且不会存在实体图片
					outputPath: 'images/'   // 图片打包后存放的目录
				}
			},
			{
				// 视频文件
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'media/[name].[hash:7].[ext]'
				}
			},
			{
				// 字体文件
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				// 像 file loader 一样工作，但如果文件小于限制，可以返回 data URL
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'fonts/[name].[hash:7].[ext]'
				}
			},
			{
				// XML文件
				test: /\.xml$/,
				use: [
					// 通过import导入的xml数据，将包含可直接使用的已解析的JSON
					// 输出文件夹将不再包含xml文件
					'xml-loader'
				]
			},
			{
				// html文件
				test: /\.(htm|html)$/,
				// 处理html代码中引用的img图片
				use: 'html-withimg-loader',
			}
		]
	},
	//
	// 插件配置（需要安装使用到的插件）
    plugins: [
    	//
    	// 使用配置的信息在dist目录创建一个html文件
    	// 该html文件中将自动包含output的脚本文件的引用
		new HtmlWebpackPlugin({
			// 使用哪一个html作为模板
            template: './src/index.html',
            // 指定输出的文件名称
            filename: 'index.html',
			// html标题，默认''
			title: 'Vue Study',
            // 是否将打包好的bundle.js后面添加hash串
            hash: false,
            // 模板对应的JS模块
            chunks: ['runtime', 'common', 'index'],
		}),
	    // 指定样式文件抽离后保存的路径
	    new ExtractTextWebpackPlugin({
			filename: path.resolve(__dirname, './dist/css/[name].[contenthash].css'),
			allChunks: true,
	    }),
	],
};


// 启动webpack-dev-server时不执行目录清理
// 开启模块热替换后不会生成本地文件，而是存在于内存之中，必须确保输出目录存在可访问文件
if(!scriptCode.includes('webpack-dev-server')) {
	// 每次打包之前执行dist目录的清理工作
	// 开启wepack-dev-server模式应当关闭该插件
	webpackOptions.plugins.unshift(new CleanWebpackPlugin(['dist']));
}


// 针对开发模式的配置
if(mode === 'development') {
	Object.assign(webpackOptions, {
		//
		// 使用source-map调试错误，默认为'eval'
		// 'none'-不输出source-map信息
		// 'inline-source-map'-行内source-map，map信息直接保存在输出的脚本文件中
		// 'source-map'-生成单独的source-map文件
		// 'hidden-source-map'-生成单独的source-map文件，但不在bundle文件中添加引用注释
		// 'eval'-每个模块都使用 eval() 执行，并且都有 //@ sourceURL
		devtool: 'inline-source-map',
		//
		// 开发服务器配置（需要安装：webpack-dev-server）
		// webpack-dev-server启动了一个使用express的http服务器，用来伺服资源文件。
		// 此外这个http服务器和client使用了websocket通讯协议，原始文件做出改动后，
		// webpack-dev-server会实时编译，但是最后的编译文件并不会输出到目标文件夹，而是存在于内存之中。
		// 该配置选项仅针对webpack-dev-server命令有效
		devServer: {
			//
			// 指定端口号，默认为8080
			port: 8089,
			//
			// 内容的基础路径
			// 告诉开发服务器（dev server)在哪里查找文件
			contentBase: './dist',
	  		//
	  		// true-(默认)内联脚本模式，控制台输出实时编译reload信息
	  		// false-使用iframe模式，iframe加载页面，预留header容器打印实时编译reload信息
	  		inline: true,
	  		//
	  		// 开启模块热替换
	  		hot: true,
	  		//
	  		// 自动打开浏览器访问
	  		open: true,
		},
		//
		// 插件配置（需要安装使用到的插件）
	    plugins: (webpackOptions.plugins || []).concat([
			//
			// 模块热替换插件（webpack 内置的 HMR 插件）
			// 会在运行时代码中加入热替换的代码，应仅用于开发模式，生产模式应该移除
			new webpack.HotModuleReplacementPlugin(),
		]),
	});
}


// 导出Webpack配置
module.exports = webpackOptions;
