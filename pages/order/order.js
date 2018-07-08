// pages/order/order.js
var utils = require('../../utils/util.js')
const service = utils.service
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
      url: service + '/deliveries/list',
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
      url: service + '/orders/ready',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      method: 'POST',
      data: {
        fromCart: fromCart,
        skuItemList: skuItemList
      },
      success: function (res) {
        console.log(res.data.data)
        if (res.data.code == 200) {
          _self.detail = res.data.data;
          var flag = false;
          for (var i = 0; i < res.data.data.skuList.length; i++) {
            console.log(res.data.data.skuList[i])
            if (res.data.data.skuList[i].areaLimit || !res.data.data.skuList[i].hasStock) {
              flag = true;
              res.data.data.skuList[i].disable_background = 'disable_background'
            }else{
              res.data.data.skuList[i].disable_background=null
            }
          }
          console.log(res.data.data.skuList)
          if (flag) {
            wx.showToast({
              icon: 'none',
              title: '库存不足/在此区域无法购买',
              duration: 2000
            })

            _self.setData({
              detail: res.data.data,
              disabled: true
            })
          } else {
            _self.setData({
              detail: res.data.data
            })
          }

        }
      }
    })
  },
  order: function () {
    if (!this.data.region) {
      wx.showToast({
        title: '请先选择收货地址哦',
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
      url: service + '/orders/order',
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
      url: service + '/orders/pay',
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
            wx.showToast({
              title: '支付成功',
              duration:2000
            })
            setTimeout(function(){
              wx.navigateTo({
                url: '/pages/orderList/orderList',
              })
            }, 2000)
           
          }
        },
        'fail': function (res) {
          wx.navigateTo({
            url: '/pages/orderList/orderList',
          })
        },
        'complete': function (res) {
          console.log(res)
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
  toCard: function () {
    wx.navigateTo({
      url: '/pages/card/card',
    })
  }
})