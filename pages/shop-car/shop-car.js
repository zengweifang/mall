// pages/shop-car/shop-car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carsList: [],
    totalPrice: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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
    console.log(11)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getList: function () {
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/cart/sku',
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        var price = 0
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].checked = true;
          price += res.data.data[i].thirdPrice*res.data.data[i].num;
        }
        _self.setData({
          totalPrice: price,
          carsList: res.data.data
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
      url: '/pages/order/order'
    })
  },
  checkFun: function (e) {
    for (var i = 0; i < this.data.carsList.length; i++) {
      if (this.data.carsList[i].id == e.currentTarget.dataset.item.id) {
        this.data.carsList[i].checked = !this.data.carsList[i].checked;
      }
    }
    this.setData({
      carsList: this.data.carsList
    })
  },

  del: function (e) {
    var _self = this;
    var skuId = e.currentTarget.dataset.id;
    wx.request({
      url: 'https://zunxiangviplus.com/cart/sku',
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
    this.updateCars(item.id, item.num+1)
  },
  jianBtnTap: function (e) {
    console.log(e)
    var item = e.currentTarget.dataset.item;
    this.updateCars(item.id, item.num-1)
  },

  updateCars: function (skuId, num) {
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/cart/sku',
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
  }
})