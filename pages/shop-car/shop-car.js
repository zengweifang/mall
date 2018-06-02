// pages/shop-car/shop-car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cars:[
      { id: 1, url: 'http://p95v2ft9v.bkt.clouddn.com/mall/%E7%BB%84-11@2x.png', goodsName: '蓝月亮 深层洁净洗衣', attr: '1/瓶', price: '39.99', nums: 1 },
      { id: 2, url: 'http://p95v2ft9v.bkt.clouddn.com/mall/%E7%BB%84-11@2x.png', goodsName: '蓝月亮 深层洁净洗衣2', attr: '2/瓶', price: '89.99', nums: 2 },
      { id: 3, url: 'http://p95v2ft9v.bkt.clouddn.com/mall/%E7%BB%84-11@2x.png', goodsName: '蓝月亮 深层洁净洗衣3', attr: '3/瓶', price: '159.99', nums: 3 }
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
    wx.navigateTo({
      url: '/pages/order/order',
    })
  }
})