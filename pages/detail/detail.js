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
    shopNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // wx.getStorage({
    //   key: 'shopCarInfo',
    //   success: function(res) {
    //     console.log(res)
    //   },
    // })
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

  addShopCar:function(){
    var shopCarInfo = this.data.shopCarInfo
    if (!shopCarInfo.shopCarList){
      shopCarInfo.shopCarList = [];
    }

    if (!shopCarInfo.shopNum){
      shopCarInfo.shopNum = 0;
    }
    
    shopCarInfo.shopNum++;
    console.log(shopCarInfo)
    this.setData({
      shopCarInfo: shopCarInfo,
      shopNum: shopCarInfo.shopNum
    })
    wx.setStorage({
      key: 'shopCarInfo',
      data: this.shopCarInfo,
    })
    wx.showToast({
      title: '加入购物车成功！',
      icon: 'success',
      image: '',
      duration: 2000
    })
  },

  goShopCar:function(){
    wx.navigateTo({
      url: '/pages/shop-car/shop-car',
    })
  },
  tobuy: function(){
    wx.navigateTo({
      url: '/pages/order/order',
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
  }

})