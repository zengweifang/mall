// pages/category_home/category_home.js
var utils = require('../../utils/util.js')
const service = utils.service
var _self = this;
// const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [],
    detail: [],
    curIndex: 0,
    isScroll: false,
    toView: 'guowei'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _self = this;
    this.getCategory(0);
    this.getCardInfo()
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
    var _self = this;
    var agentId = _self.data.cardInfo.userType == 'AGENT' ? _self.data.cardInfo.agentId : '';
    return {
      title: '尊享viplus',
      path: '/pages/category_home/category_home?agentId=' + agentId
    }
  },
  switchTab(e) {
    const self = this;
    this.setData({
      isScroll: true
    })
    setTimeout(function () {
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
    }, 0)
    setTimeout(function () {
      self.setData({
        isScroll: false
      })
    }, 1)
    this.getCategory(e.target.dataset.id);
  },
  getCategory: function (parentId){
    var _self = this;
    wx.request({
      url: service + '/category/child?parentId=' + parentId,
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 200) {
          if (parentId!=0){
            _self.setData({
              detail: res.data.data
            })
          }else{
            _self.getCategory(res.data.data[0].id);
            _self.setData({
              category: res.data.data
            })
          }
        }
      }
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
        if (res.data.code == 200) {
          _self.setData({
            cardInfo: res.data.data
          })
        }
      }
    })
  },
})