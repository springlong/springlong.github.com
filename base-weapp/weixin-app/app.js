
const MockData = require('./utils/mockData.js')

// APP()函数用来注册一个小程序
// 当用户点击左上角关闭，或者按了设备 Home 键离开微信，小程序并没有直接销毁，而是进入了后台；
// 当再次进入微信或再次打开小程序，又会从后台进入前台。
// 需要注意的是：只有当小程序进入后台一定时间，或者系统资源占用过高，才会被真正的销毁。
App({

	// 全局数据
	globalData: {
		env: 'dev',    // 定义当前环境模式(dev/pro)
		useMock: false, // 是否使用mock数据
		mockDelay: 0,  // mock回调的延迟时间
		name: '微信小程序测试',
		userInfo: null
	},

	// 当小程序初始化完成时，触发onLaunch（全局只触发一次）
	onLaunch: function (options) {
		console.log('app-onLaunch')

		// 使用mock测试数据
		this.ajax({
			url: 'demo',
			data: {type: 'demo', useMock: 'true', page: 3}
		})
		// 接口请求成功
		.then(res => {
			console.log('接口请求成功！', res)
		})
		// 接口请求失败
		.catch(err => {
			console.log('接口请求失败！', err)
		})

		// 使用mock测试数据-模拟分页
		this.ajax({
			url: 'demo/page',
			data: {type: 'demo', useMock: 'true', page: 3}
		})

		// 展示本地存储能力
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)

		// 登录
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
			}
		})

		// 获取用户信息
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
							// 可以将 res 发送给后台解码出 unionId
							this.globalData.userInfo = res.userInfo

							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res)
							}
						}
					})
				}
			}
		})
	},

	// 当小程序启动，或从后台进入前台显示，会触发onSHow
	// options-相关信息
	// options.path, string, 打开小程序的路径
	// options-scene, Number, 打开小程序的场景值
	// options-query, Object, 打开小程序的query
	// options-referrerInfo, Object, 当场景为由从另一个小程序或公众号或App打开时，返回此字段
	onShow: function (options) {
		console.log('app-onShow', options)
	},

	// 当小程序从前台进入后台，会触发onHide
	onHide: function () {
		console.log('app-onHide')
	},

	// 当小程序发生脚本错误，或者api调用失败时，会触发onError并带上错误信息
	// msg-错误信息
	onError: function (msg) {
		console.log('app-onError', msg)
	},

	/**
	 * 发送网络请求
	 * @param  {Object} opt 参数
	 * @return {undefined}
	 */
	ajax: function (opt) {
		const that = this
		const globalData = that.globalData

		let needlogin = opt.uselogin === undefined ? true : opt.uselogin
		let ajaxUrl = globalData.dataRemote + opt.url
		let sendData = Object.assign({
			sessionKey: wx.getStorageSync('sessionKey')
		}, opt.data)

		// 请求的默认配置
		opt = Object.assign({
			url: '',
			data: {},
			method: 'GET',
			dataType: 'json',
			header: {
				'Content-Type': 'application/json'
			}
		}, opt)

		// 返回promise对象
		return new Promise((resolve, reject) => {

			// 读取mock的相关配置
			let useMock = opt.useMock || (globalData.useMock  === undefined ? false : globalData.useMock)
			let mockDelay = opt.mockDelay || (globalData.mockDelay === undefined ? 0 : globalData.mockDelay)

			// 使用mock数据
			if(useMock) {
				let _mockd = MockData[opt.url]
				if(_mockd === undefined) {
					_mockd = MockData['base'] || {}
				}
				if(typeof _mockd === 'function') {
					_mockd = _mockd(sendData) || {}
				}

				setTimeout(() => {
					try{
						console.group('-'.repeat(44) + '\r\n' + opt.url + ':\r\n' + '-'.repeat(44));
						console.log(sendData);
						console.log(_mockd);
						console.groupEnd();
					}catch(err) {}
					doOnSuccess(_mockd)
				}, mockDelay)
			}
			// 发起wx请求
			else {
				wx.request({
					url: ajaxUrl,
					data: sendData,
					method: opt.method,
					dataType: opt.dataType,
					header: opt.header,
					success: function(res) {
						let resData = res.data || {}
						if (res.statusCode == 200) {
							doOnSuccess(resData)
						} else {
							reject(res)
						}
					},
					fail: function(res) {
						reject(res)
					}
				})
			}

			// ajax请求成功时执行的回调
			function doOnSuccess(resData) {
				if (resData.code == -504 && needlogin) {
					// 需要登录
					that.login(opt);
				} else {
					resolve(resData)
				}
			}
		})
	},
})
