// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    primarySize:'default',
    loading: false,
    plain:false,
    goods: [
      { id: 1, url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai01.jpeg', goodsName: '人气推荐商品', attr: '1/套', price: '29.99', nums:1}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  tobuy: function(){
    wx.showToast({
      title: '提交订单成功！',
      icon: 'success',
      image: '',
      duration: 2000
    })
  },
  toAddress: function(){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  }
})