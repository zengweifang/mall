// pages/adrress/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { id: 1, name: 'USA', value: '美国', phone: '186****8887', userName: 'yolanda', address: '深圳市南山区伟杰大厦' },
      { id: 2, name: 'CHN', value: '中国', checked: 'true', phone: '186****8887', userName: 'yolanda', address: '深圳市南山区伟杰大厦' },
      { id: 3, name: 'BRA', value: '巴西', phone: '186****8887', userName: 'yolanda', address: '深圳市南山区伟杰大厦' },
      { id: 4, name: 'JPN', value: '日本', phone: '186****8887', userName: 'yolanda', address: '深圳市南山区伟杰大厦' },
      { id: 5, name: 'ENG', value: '英国', phone: '186****8887', userName: 'yolanda', address: '深圳市南山区伟杰大厦' },
      { id: 6, name: 'TUR', value: '法国', phone: '186****8887', userName: 'yolanda', address: '深圳市南山区伟杰大厦' },
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
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  addressOperate:function(){
    wx.navigateTo({
      url: '/pages/address_operate/address_operate',
    })
  }
})