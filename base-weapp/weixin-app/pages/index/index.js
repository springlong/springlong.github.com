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
    isActive: true,
    errorClass: 'error-class',
    activeClass: 'active-class',
		welcome: 'Hello World 123',
		obj: {
			name: 'yangtuan',
			age: 27,
			sex: '男',
		},
		arr: ['跑步', '音乐', '电影', '跑步', '徒步'],
		id: '1001',
		type: 3,
		condition: true,
		testTempA: {
			firstName: 'Sun',
			lastName: 'Jerry',
		},
		testTempB: {
			firstName: 'Liu',
			lastName: 'Sancy',
		},
		userInfo: {},
		hasUserInfo: false,
		lazyPlaceholderHeight: wx.getSystemInfoSync().windowHeight*2,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
	},

	/**
	 * 生命周期函数--监听页面加载
	 * 一个页面只会调用一次，可以在onload中获取打开当前页面所调用的query参数
	 * options-其他页面打开当前页面所调用的 query 参数
	 */
	onLoad: function(options) {
		console.log('options:', options)

		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else if (this.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					})
				}
			})
		}
	},

	/**
	 * 生命周期函数--监听页面显示
	 * 每次打开页面都会调用一次
	 */
	onShow: function() {
		console.log('page-onShow')
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 * 一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互
	 */
	onReady: function() {
		console.log('page-onReady')
	},


	/**
	 * 生命周期函数--监听页面隐藏
	 * 当navigateTo或底部tab切换时调用。
	 */
	onHide: function() {
		console.log('page-onHide')
	},

	/**
	 * 生命周期函数--监听页面卸载
	 * 当redirectTo或navigateBack的时候调用。
	 */
	onUnload: function() {
		console.log('page-onUnload')

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉刷新动作
	 * 需要在app.json的window选项中或页面配置中开启 enablePullDownRefresh
	 * 当处理完数据刷新后， wx.stopPullDownRefresh 可以停止当前页面的下拉刷新。
	 */
	onPullDownRefresh: function() {
		console.log('page-onPullDownRefresh')
	},

	/**
	 * 页面相关事件处理函数--监听上拉触底
	 * 可以在app.json的window选项中或页面配置中设置触发距离onReachBottomDistance。
	 * 在触发距离内滑动期间，本事件只会被触发一次。
	 */
	onReachBottom: function() {
		console.log('page-onReachBottom')
	},

	/**
	 * 页面相关事件处理函数--监听页面滚动
	 * data-相关滚屏信息
	 * data.scrollTop, 页面在垂直方向已滚动的距离
	 */
	onPageScroll: function(data) {
		// console.log('page-onPageScroll', data)
	},

	/**
	 * 页面相关事件处理函数--监听用户分享转发
	 * 只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮
	 * 用户点击转发按钮的时候会调用
	 */
	onShareAppMessage: function() {
		// 此事件需要 return 一个 Object，用于自定义转发内容
		return {
			// 当前小程序名称
			title: app.globalData.name,
			// 当前页面 path ，必须是以 / 开头的完整路径
			path: 'pages/index/index'
		}
	},

	/**
	 * 页面相关事件处理函数--监听tab点击
	 * 前是tab页时，点击tab时触发
	 * item-点击tab项的相关信息
	 * item.index, 索引
	 * item.pagePath, 页面路径
	 * item.text tab文本
	 */
	onTabItemTap: function(item) {
		console.log('page-onTabItemTap', item)
	},

	// 图片加载事件
	bingImageLoad: function(event) {
		console.log('bingImageLoad', event.currentTarget.dataset)
	},

	/**
	 * 自定义-事件处理函数
	 */
	bindClickButton: function(ev) {

		// ev-事件对象
		// ev.target，触发事件的目标元素
		// ev.target.dataset，目标元素上通过data-附带的数据声明，data-like-this对应的属性名为'likethis'，data-likeThis对应的属性名为'likethis'.(小写)
		// ev.currentTarget，响应事件处理程序的当前元素
		console.log('page-bindClickButton', ev)

		// 读取当前页面的路径
		console.log('page-this.route', this.route)

		// 通过setData设置数据
		this.setData({
			'welcome': '欢迎来到小程序！'
		})
	},

	/**
	 * 自定义-事件处理函数，ev-事件对象
	 */
	bindViewPage: function(ev) {
		console.log('page-bindViewPage', ev)

		// 保留当前页面，然后跳转到应用内的某个页面
		// 目前页面路径最多只能十层
		wx.navigateTo({
			// 跳转的路径
			url: '/pages/country/country?type=2',
			// 跳转成功执行的回调函数
			success() {
				console.log('navigateTo-sucess')
			},
			// 跳转失败执行的回调函数
			fail() {
				console.log('navigateTo-fail')
			},
			// 不管成功或失败，都会执行的回调函数
			complete() {
				console.log('navigateTo-complete')
			}
		})
	},

	getUserInfo: function(e) {
		console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	}
})
