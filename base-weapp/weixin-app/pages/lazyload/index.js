// 引入模块
// require 暂时不支持绝对路径
const utils = require('../../utils/util.js')

// 全局的 getApp() 函数可以用来获取到小程序实例
const app = getApp()
console.log('app-data', app)

// 注册页面
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		lazyPlaceholderHeight: wx.getSystemInfoSync().windowHeight*2,
	},

	// 图片加载事件
	bingImageLoad: function(event) {
		console.log('bingImageLoad', event.currentTarget.dataset)
	},
})
