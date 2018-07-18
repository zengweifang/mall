// pages/detail/detail.js
var utils = require('../../utils/util.js')
const service = utils.service
var WxParse = require('../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    interval: 5000,
    duration: 1000,
    indicatorDots: true,
    autoplay: true,
    shopCarInfo: {},
    shopNum: 0,
    detail: {},
    list: [
      { id: 0, name: '商品介绍' },
      { id: 1, name: '规格参数' },
      // { id: 2, name: '售后保障' }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getCurrentPages())
    if (wx.getStorageSync('token')){
      this.getDetail(options);
      this.getCarsNum();
      this.getCardInfo()
    }

    var scene = decodeURIComponent(options.scene)
    if (scene && scene != 'undefined') {
      var agentId = scene.split('=')[1];
      wx.setStorageSync('agentId', agentId)
    }else{
      wx.setStorageSync('agentId', options.agentId)
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
  onShow: function (options) {
    // var pages = getCurrentPages()    //获取加载的页面

    // var currentPage = pages[pages.length - 1]    //获取当前页面的对象

    // var url = currentPage.route    //当前页面url

    // var options = currentPage.options    //如果要获取url中所带的参数可以查看options
    // if(wx.getStorageSync('token')){
    //   this.getCardInfo()
    //   this.getCarsNum();
    //   this.getDetail(options);
    // }
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
      path: '/pages/detail/detail?id=' + _self.data.detail.sku.id+'&agentId=' + agentId
    }
  },

  getDetail: function (options) {
    var _self = this;
    wx.request({
      url: service+'/sku/' + options.id,
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        if(res.data.code == 200){
          _self.data.list[0].item_hasbgr = 'item_hasbgr';
          _self.setData({
            detail: res.data.data,
            list: _self.data.list,
            step: 0
          })
        }
        if(res.data.code == 3400){
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000,
            success:function(){
              setTimeout(function(){
                wx.navigateBack()
              },2000);
            }
          })
        }
       
      }
    })
  },

  addShopCar: function () {
    var _self = this;
    wx.request({
      url: service+'/cart/sku',
      method: 'POST',
      data: {
        skuId: this.data.detail.sku.id,
        num: 1
      },
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '加入购物车成功！',
            icon: 'success',
            duration: 2000
          })
          _self.getCarsNum();
        }
      }
    })
  },

  goShopCar: function () {
    wx.switchTab({
      url: '/pages/shop-car/shop-car',
    })
  },
  tobuy: function () {
    wx.setStorageSync('checkedItems', JSON.stringify([this.data.detail.sku]))
    wx.navigateTo({
      url: '/pages/order/order'
    })
  },

  toQuestions: function () {
    wx.navigateTo({
      url: '/pages/questions/questions',
    })
  },
  toAnswer: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/answers/answers?id=' + id,
    })
  },
  getCarsNum: function () {
    var _self = this;
    wx.request({
      url: service+'/cart/sku',
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 200 && res.data.data.length > 0) {
          var shopNum = 0;
          for (var i = 0; i < res.data.data.length; i++) {
            shopNum += res.data.data[i].num;
          }
          _self.setData({
            shopNum: shopNum
          })
        }
      }
    })
  },
  getCardInfo: function () {
    var _self = this;
    wx.request({
      url: service+'/user',
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
  toCard: function () {
    wx.navigateTo({
      url: '/pages/card/card',
    })
  },
  changeDetail: function (e) {
    var _self = this;
    var id = e.currentTarget.dataset.item.id;
    switch (id) {
      case 0:
        _self.setItem(0);
        break;
      case 1:
        _self.setItem(1);
        WxParse.wxParse('skuinfo', 'html', _self.data.detail.skuInfo.param, _self, 15);
        break;
      case 2:
        _self.setItem(2);
        break;
    }
  },
  setItem: function (flag) {
    var _self = this;
    for (var i = 0; i < _self.data.list.length > 0; i++) {
      if (_self.data.list[i].id == flag) {
        _self.data.list[i].item_hasbgr = 'item_hasbgr';
      } else {
        _self.data.list[i].item_hasbgr = null;
      }
    }
    _self.setData({
      list: _self.data.list,
      step: flag
    })
  }

})