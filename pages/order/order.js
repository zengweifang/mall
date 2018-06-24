// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    primarySize: 'default',
    loading: false,
    plain: false,
    detail: {},
    region: {},
    skuItemList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var checkedItems = JSON.parse(wx.getStorageSync('checkedItems'));
    this.orderReady(checkedItems);
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
    this.getAddress();
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
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].isDefault) {
            _self.setData({
              region: res.data.data[i]
            })
          }
        }
      }
    })
  },
  orderReady: function (checkedItems) {
    var _self = this;
    var skuItemList = [];
    for (var i = 0; i < checkedItems.length; i++) {
      skuItemList.push({
        id: checkedItems[i].id,
        num: checkedItems[i].num || 1,
        price: checkedItems[i].sellPrice
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
        // deliveryId: this.data.region.id,
        fromCart: false,//待改
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
    var _self = this;
    var data = {
      deliveryId: this.data.region.id,
      fromCart: false,
      hasInvoice: false,
      remark: "",
      skuItemList: this.data.skuItemList
    }
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
  pay:function(orderId){
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
          if(res.data.code == 200){
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
  }
})