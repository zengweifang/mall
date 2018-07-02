// pages/phone/phone.js
var utils = require('../../utils/util.js')
const service = utils.service
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:''
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
  // onShareAppMessage: function () {
  
  // }
  bindKeyInputName: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  confirm: function(){
    var _self = this;
    wx.request({
      url: service + '/user/phone',
      method: 'POST',
      data: _self.data.phone,
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          wx.showToast({
            title: '绑定成功',
            icon:'none',
            duration: 2000
          })
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/admin/admin',
            })
          },2000)
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
})