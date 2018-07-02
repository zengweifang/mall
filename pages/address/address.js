// pages/adrress/address.js
var utils = require('../../utils/util.js')
const service = utils.service
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressList();
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
    this.getAddressList();
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

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.defaultAddress(e.detail.value);

  },
  addressOperate: function () {
    wx.navigateTo({
      url: '/pages/address_operate/address_operate',
    })
  },
  getAddressList: function () {
    var _self = this;
    wx.request({
      url: service+'/deliveries/list',
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        _self.setData({
          addressList: res.data.data
        });
      }
    })
  },
  edit: function (e) {
    wx.navigateTo({
      url: '/pages/address_edit/address_edit?id=' + e.currentTarget.dataset.item.id,
    })
  },
  del: function (e) {
    var _self = this;
    wx.request({
      url: service+'/deliveries/delivery?deliveryId=' + e.currentTarget.dataset.item.id,
      method: 'DELETE',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        _self.getAddressList();
      }
    })
  },
  defaultAddress: function (deliveryId) {
    var _self = this;
    wx.request({
      url: service+'/deliveries/default?deliveryId=' + deliveryId,
      method: 'POST',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.navigateBack();
        }
      }
    })
  }
})