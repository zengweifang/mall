// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    primarySize: 'default',
    loading: false,
    plain: false,
    detail: {},
    region: null,
    skuItemList: [],
    fromCart: false,
    remark: ''
  },

  setRemark: function (e) {
    console.log(e)
    this.setData({
      remark: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCardInfo();
    var checkedItems = JSON.parse(wx.getStorageSync('checkedItems'));
    this.orderReady(checkedItems, options.fromCart);
    wx.setStorageSync('fromCart', options.fromCart)
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
    this.getCardInfo();
    this.getAddress();

    var checkedItems = JSON.parse(wx.getStorageSync('checkedItems'));
    this.orderReady(checkedItems, wx.getStorageSync('fromCart'));

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
  tobuy: function () {
    wx.showToast({
      title: '提交订单成功！',
      icon: 'success',
      image: '',
      duration: 2000
    })
  },
  toAddress: function () {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  getAddress: function () {
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/deliveries/list',
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.data.length != 0) {
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].isDefault) {
              _self.setData({
                region: res.data.data[i]
              })
            }
          }
        }
      }
    })
  },
  orderReady: function (checkedItems, fromCart) {
    var _self = this;
    var skuItemList = [];
    for (var i = 0; i < checkedItems.length; i++) {
      var price = 0
      if (_self.data.cardInfo) {
        price = checkedItems[i].vipPrice
      } else {
        price = checkedItems[i].sellPrice
      }
      skuItemList.push({
        id: checkedItems[i].id,
        num: checkedItems[i].num || 1,
        price: price
      })
    }
    this.setData({
      skuItemList: skuItemList
    })
    wx.request({
      url: 'https://zunxiangviplus.com/orders/ready',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      method: 'POST',
      data: {
        fromCart: fromCart,
        skuItemList: skuItemList
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          _self.detail = res.data.data;
          _self.setData({
            detail: res.data.data
          })
        }
      }
    })
  },
  order: function () {
    if (!this.data.region){
      wx.showToast({
        title:'请先选择收货地址哦',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var _self = this;
    var data = {
      deliveryId: this.data.region.id,
      fromCart: wx.getStorageSync('fromCart'),
      hasInvoice: false,
      remark: this.data.remark,
      skuItemList: this.data.skuItemList
    }
    console.log(data)
    wx.request({
      url: 'https://zunxiangviplus.com/orders/order',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      data: data,
      method: 'POST',
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          _self.pay(res.data.data)
        }
      }
    })
  },
  pay: function (orderId) {
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/orders/pay',
      method: 'POST',
      data: orderId,
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          _self.payApi(res.data.data);
        }
      }
    })
  },
  payApi: function (data) {
    wx.requestPayment(
      {
        'timeStamp': data.timeStamp,
        'nonceStr': data.nonceStr,
        'package': data.package,
        'signType': data.signType,
        'paySign': data.paySign,
        'success': function (res) {
          console.log(res)
          if (res.data.code == 200) {
            wx.navigateTo({
              url: '/pages/orderList/orderList',
            })
          }
        },
        'fail': function (res) {
          console.log(res)
        },
        'complete': function (res) {
          console.log(res)
        }
      })
  },
  getCardInfo: function () {
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/user',
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
  }
})