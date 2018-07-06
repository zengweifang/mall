// pages/search/search.js
var utils = require('../../utils/util.js')
//获取应用实例
const app = getApp()
const service = utils.service;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('token')){
      this.getCardInfo();
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
  bindInputKey:function(e){
    console.log(e)
    this.setData({
      keyWords:e.detail.value
    })
    this.search()
  },

  search:function(){
    var keyWords = this.data.keyWords;
    var _self = this;
    wx.request({
      url: service + '/index/sku', //仅为示例，并非真实的接口地址
      method: 'GET',
      data: {
        pageNum: 1,
        pageSize: 10
      },
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        _self.setData({
          dataList:res.data.data.list
        })
      }
    })
  },
  detail: function (event){
    var id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },
  getCardInfo: function () {
    var _self = this;
    wx.request({
      url: service + '/user',
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          _self.setData({
            cardInfo: res.data.data
          })
        }
      }
    })
  },
})