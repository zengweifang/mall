// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    interval:5000,
    duration:1000,
    indicatorDots:true,
    autoplay:true,
    imageUrl:[
      { id: 1, url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai08.jpeg' },
      { id: 2, url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai08.jpeg' },
      { id: 3, url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai08.jpeg' }
    ],
    shopCarInfo:{},
    shopNum:0,
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getDetail(options);
    this.getCarsNum();
    
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
  
  },

  getDetail: function(options){
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/sku/' + options.id,
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        _self.setData({
          detail: res.data.data
        })
      }
    })
  },

  addShopCar:function(){
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/cart/sku',
      method: 'POST',
      data:{
        skuId: this.data.detail.sku.id,
        num:1
      },
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        if(res.data.code == 200){
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

  goShopCar:function(){
    wx.switchTab({
      url: '/pages/shop-car/shop-car',
    })
  },
  tobuy: function(){
    wx.setStorageSync('checkedItems', JSON.stringify([this.data.detail.sku]))
    wx.navigateTo({
      url: '/pages/order/order'
    })
  },

  toQuestions:function(){
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
  getCarsNum: function(){
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/cart/sku',
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 200 && res.data.data.length>0) {
          var shopNum = 0;
          for(var i=0; i<res.data.data.length;i++){
            shopNum += res.data.data[i].num;
          }
          _self.setData({
            shopNum: shopNum
          })
        }
      }
    })
  }

})