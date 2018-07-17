// pages/admin/admin.js
var utils = require('../../utils/util.js')
const service = utils.service
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    avatarUrl:'',
    user_card:null,
    phone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      nickName : userInfo.nickName,
      avatarUrl: userInfo.avatarUrl
    })
    if (wx.getStorageSync('token')){
      this.getUserInfo();
      this.getPhone()
    }
   
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
    if (wx.getStorageSync('token')) {
      this.getUserInfo();
      this.getPhone()
    }
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
  
  // },
  toAddress:function(){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  order:function(){
    wx.navigateTo({
      url: '/pages/orderList/orderList',
    })
  },
  toCard:function(){
    wx.navigateTo({
      url: '/pages/card/card',
    })
  },
  getUserInfo: function(){
    var _self=  this;
    wx.request({
      url: service+'/user',
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        res.data.data.expiredAt = utils.formatTime(new Date(res.data.data.expiredAt))
        _self.setData({
          user_card:res.data.data
        })
      }
    })
  },
  phone:function(){
    wx.navigateTo({
      url: '/pages/phone/phone',
    })
  },

  getPhone: function () {
    var _self = this;
    wx.request({
      url: service + '/user/phone',
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.data.phone){
          _self.setData({
            phone: res.data.data.phone
          })
        }
       
      }
    })
  }
})