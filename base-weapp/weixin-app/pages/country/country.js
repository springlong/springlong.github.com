// pages/country/country.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		current: new Date(),
  },

  /**
   * 生命周期函数--监听页面加载
   * query参数- query参数所组成的JSON对象
   */
  onLoad: function (query) {
		console.log('country-onLoad', new Date() , this.data.current)
    console.log('country-onload', query);
  },

  /**
   * 自定义-事件处理函数
   */
  bindViewPage: function (ev) {
    console.log('country-bindViewPage', ev)

    // 保留当前页面，然后跳转到应用内的某个页面
    wx.navigateTo({
      url: '/pages/shop/shop?type=3'
    })
  },

  /**
   * 自定义-事件处理函数
   */
  bindRedirectPage: function (ev) {
    console.log('country-bindRedirectPage', ev)

    // 覆盖当前页面，重定向到指定的页面
    wx.redirectTo({
      url: '/pages/shop/shop?type=3'
    })
  },

  /**
   * 自定义-时间处理函数
   * 返回上一页
   */
  bindBack: function (ev) {
    console.log('country-bindBack', ev)

    // getCurrentPages()，用于获取当前页面栈的实例
    // 以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
    console.log('country-当前页面层级：', getCurrentPages())

    // 关闭当前页面，返回上一级或多级页面
    wx.navigateBack({
      // 决定返回的页面数
      // 如果delta大于现有页面数，则返回到首页
      delta: 1
    })
  }

})