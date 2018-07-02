// pages/cards/card.js
var utils = require('../../utils/util.js')
const service = utils.service
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cards: [],
    selectCard: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCard();
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
  getCard: function () {
    var _self = this;
    wx.request({
      url: service+'/cards',
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200 && res.data.data.length>0) {
          _self.setData({
            cards: res.data.data
          })
        }
      }
    })
  },
  select: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.item.id;
    for (var i = 0; i < this.data.cards.length; i++) {
      if (id == this.data.cards[i].id) {
        this.data.cards[i].card_item_class = 'card_item_selected'
      } else {
        this.data.cards[i].card_item_class = null
      }
    }

    this.setData({
      cards: this.data.cards,
      selectCard: e.currentTarget.dataset.item
    })

    console.log(this.data.cards)
  },
  buy: function () {
    var _self =  this;
    var id = this.data.selectCard.id;
    if(!this.data.selectCard.id){
      wx.showToast({
        title: '亲，您还没选卡哦',
        icon: 'none',
        duration: 2000
      })

      return;
    }
    wx.request({
      url: service+'/cards/buy',
      method: 'POST',
      data:id,
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 200) {
          _self.payApi(res.data.data)
        }
      }
    })
  },
  payApi:function(data){
    wx.requestPayment(
      {
        'timeStamp': data.timeStamp,
        'nonceStr': data.nonceStr,
        'package': data.package,
        'signType': data.signType,
        'paySign': data.paySign,
        'success': function (res) {
          wx.switchTab({
            url: '/pages/admin/admin',
          })
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