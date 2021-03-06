// pages/login/login.js
var utils = require('../../utils/util.js')
const service = utils.service
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:String,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    agentId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      agentId: wx.getStorageSync('agentId'),
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
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

  onGotUserInfo: function(e){
    console.log(e)
    if (!e.detail.userInfo) {
      return;
    }
    wx.setStorageSync('userInfo', e.detail.userInfo)
    this.login();
  },

  login:function(){
    var _self = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: service+'/user/login',
            data: {
              jsCode:res.code,
              agentId: wx.getStorageSync('agentId') ? wx.getStorageSync('agentId'):null,
              nickname: wx.getStorageSync('userInfo').nickName
            },
            method: 'POST',
            success: function (res) {
              if(res.data.code == 200){
                wx.setStorageSync('token', res.data.data);
                wx.navigateBack();
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  }
})