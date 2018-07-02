// pages/orderDetail/orderDetail.js
var utils = require('../../utils/util.js')
const service = utils.service
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderDetail(options.orderId);
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
    this.getOrderDetail(options.orderId);
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
  getOrderDetail: function (orderId){
    console.log(orderId)
    var _self = this;
    wx.request({
      url: service+'/orders/' + orderId,
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          res.data.data.order.createTime = utils.formatTime(new Date(res.data.data.order.createTime))
          _self.setData({
            orderDetail: res.data.data
          })
        }
      }
    })
  },
  deliver:function(){
    console.log(this.data.orderDetail)
    
    var deliver = {
      deliverInfo: this.data.orderDetail.trackDetailList,
      orderId:this.data.orderDetail.order.id
    }
    var deliver = JSON.stringify(deliver)
    wx.navigateTo({
      url: '/pages/deliver/deliver?deliver=' + deliver,
    })
  },
  toDetail: function (event){
    var skuId = event.currentTarget.dataset.item.skuId
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + skuId
    })
  }
})