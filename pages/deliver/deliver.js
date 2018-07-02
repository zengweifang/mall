// pages/deliver/deliver.js
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
    console.log(options)
    if (options.deliver){
      var deliver = JSON.parse(options.deliver);
      var deliverInfo = deliver.deliverInfo;
      var orderId = deliver.orderId;
      deliverInfo = deliverInfo.reverse();
      for (var i = 0; i < deliverInfo.length; i++) {
        deliverInfo[i].msgTime = utils.formatTime(new Date(deliverInfo[i].msgTime))
        if (i == 0) {
          deliverInfo[i].deliverColor = 'deliver_color';
        }
      }

      this.setData({
        deliver: deliverInfo,
        orderId:orderId
      })
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
  
  }
})