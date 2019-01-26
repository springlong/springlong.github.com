// pages/refund/refund/refund.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('参数：', options);
  },

  /**
   * 自定义事件绑定程序
   */
  bindReLaunch: function(ev) {
    wx.reLaunch({
      url: '/pages/detail/detail',
    })
  }

})