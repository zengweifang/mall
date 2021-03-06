// pages/shop-car/shop-car.js
var utils = require('../../utils/util.js')
const service = utils.service
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carsList: [],
    totalPrice: '',
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCardInfo();
    this.getList();
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
    this.getList()
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
  getList: function () {
    var _self = this;
    wx.request({
      url: service+'/cart/sku',
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        var price = 0;
        var num = 0;
        console.log(num)
        for (var i = 0; i < res.data.data.length; i++) {
          var goodsPrice = 0;
          if (_self.data.cardInfo.vip) {
            goodsPrice = res.data.data[i].vipPrice
          } else {
            goodsPrice = res.data.data[i].sellPrice
          }
          res.data.data[i].checked = true;
          price += goodsPrice * res.data.data[i].num;
          num += res.data.data[i].num*1;
        }
        _self.setData({
          totalPrice: price,
          carsList: res.data.data,
          num : num
        })
      }
    })
  },

  tobuy: function () {
    var items = [];
    for (var i = 0; i < this.data.carsList.length; i++) {
      if (this.data.carsList[i].checked) {
        items.push(this.data.carsList[i])
      }
    }
    wx.setStorageSync('checkedItems', JSON.stringify(items))
    wx.navigateTo({
      url: '/pages/order/order?fromCart='+true
    })
  },
  checkFun: function (e) {
    for (var i = 0; i < this.data.carsList.length; i++) {
      if (this.data.carsList[i].id == e.currentTarget.dataset.item.id) {
        this.data.carsList[i].checked = !this.data.carsList[i].checked;
      }
    }

    var price = 0
    for (var i = 0; i < this.data.carsList.length; i++) {
      if (this.data.carsList[i].checked) {
        var goodsPrice = 0;
        if (this.data.cardInfo.vip) {
          goodsPrice = this.data.carsList[i].vipPrice
        } else {
          goodsPrice = this.data.carsList[i].sellPrice
        }
        price += goodsPrice * this.data.carsList[i].num;
      }
    }
    this.setData({
      totalPrice: price,
      carsList: this.data.carsList
    })
  },

  del: function (e) {
    var _self = this;
    var skuId = e.currentTarget.dataset.id;
    wx.request({
      url: service+'/cart/sku',
      method: 'DELETE',
      data: skuId,
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        _self.getList()
      }
    })
  },

  jiaBtnTap: function (e) {
    console.log(e)
    var item = e.currentTarget.dataset.item;
    this.updateCars(item.id, item.num + 1)
  },
  jianBtnTap: function (e) {
    console.log(e)
    var item = e.currentTarget.dataset.item;
    this.updateCars(item.id, item.num - 1)
  },

  updateCars: function (skuId, num) {
    var _self = this;
    wx.request({
      url: service+'/cart/sku',
      method: 'PUT',
      data: {
        skuId: skuId,
        num: num
      },
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        _self.getList()
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

  toDetail: function (event){
    var id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  }
})