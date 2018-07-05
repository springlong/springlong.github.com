const path = require('path');

module.exports = {
	// 入口文件
	entry: './src/assetManagement.js',
	// 输出文件
	output: {
		filename: 'assetManagement.bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	// 配置模块
	module: {
		// 模块规则列表
		// webpack 4 中会默认解析 .wasm, .mjs, .js 和 .json 为后缀的文件。
		rules: [
			{
				// 样式文件
				test: /\.css$/,
				use: [
					// 将css文件通过<style>标签添加到<head>中
					// // 该loader自带模块热替换，当更新css依赖模块时，该loader在后台使用module.hot.accept来修补<style>标签。
					'style-loader',
					// 解释css文件中的 @import 和 url()
					'css-loader'
				]
			},
			{
				// 图片文件
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					// 将样式和脚本中引入的文件发送到输出文件夹，并返回（相对）URL
					// 默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名
					'file-loader'
				]
			},
			{
				// 字体文件
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					// 将样式和脚本中引入的文件发送到输出文件夹，并返回（相对）URL
					// 默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名
					'file-loader'
				]
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
		]
	}
};