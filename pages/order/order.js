// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    primarySize:'default',
    loading: false,
    plain:false,
    detail:[],
    goodsPrice:0,
    deliverPrice:0,
    region:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var checkedItems = JSON.parse(wx.getStorageSync('checkedItems'));
    var goodsPrice = 0
    for (var i = 0; i < checkedItems.length;i++){
      goodsPrice += checkedItems[i].thirdPrice * (checkedItems[i].num || 1);
    }

    this.getAddress();

    this.setData({
      detail: checkedItems,
      goodsPrice: goodsPrice
    })

    console.log(this.data.detail)

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
  tobuy: function(){
    wx.showToast({
      title: '提交订单成功！',
      icon: 'success',
      image: '',
      duration: 2000
    })
  },
  toAddress: function(){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  getAddress:function(){
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/deliveries/list',
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        for(var i=0 ; i< res.data.data.length;i++){
          if(res.data.data[i].isDefault){
            _self.setData({
              region:res.data.data[i]
            })
          }
        }
      }
    })
  },
  order:function(){
    var _self = this;
    var skuItemList = [];
    for(var i = 0; i< this.data.detail.length;i++){
      skuItemList.push({
        id:this.data.detail[i].id,
        num: this.data.detail[i].num || 1,
        price: this.data.detail[i].thirdPrice
      })
    }
    wx.request({
      url: 'https://zunxiangviplus.com/orders/ready',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      method: 'POST',
      data:{
        deliveryId: this.data.region.id,
        fromCart:false,
        skuItemList: skuItemList
      },
      success: function (res) {
        console.log(res)
        if(res.data.code == 200){
          _self.pay(res.data.data.orderId);
        }
      }
    })
  },
  pay: function(orderId){
    wx.request({
      url: 'https://zunxiangviplus.com/pay/unified_order/order',
      header:{
        'X-TOKEN': wx.getStorageSync('token')
      },
      data: orderId,
      method:'POST',
      success:function(res){
        var data = res.data.data;
        var time = (new Date()).getTime();
        wx.requestPayment(
          {
            'timeStamp': data.timeStamp,
            'nonceStr': data.nonceStr,
            'package':  data.package,
            'signType': data.signType,
            'paySign': data.paySign,
            'success': function (res) {
              console.log(res)
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

    
  }
})