// pages/category/category.js
var utils = require('../../utils/util.js')
const service = utils.service
var _self = this;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    categoryList: [],
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('token')) {
      this.getCategory(options.parentId, options.categoryId);
      this.getSkus(options.categoryId, 1)
      this.getCardInfo();

    }

    var scene = decodeURIComponent(options.scene)
    if (scene && scene != 'undefined') {
      var agentId = scene.split('=')[1];
      wx.setStorageSync('agentId', agentId)
    } else {
      wx.setStorageSync('agentId', options.agentId)
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
    var pageNum = this.data.pageNum + 1;
    this.setData({
      pageNum: pageNum
    })
    this.getSkus(this.data.id, pageNum, 'refresh');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var _self = this;
    var agentId = _self.data.cardInfo.userType == 'AGENT' ? _self.data.cardInfo.agentId : '';
    return {
      title: '尊享viplus',
      path: '/pages/category/category?agentId=' + agentId
    }
  },

  toDetail: function (event) {
    var id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
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
  search: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  clickCategoryTab: function (e) {
    var item = e.currentTarget.dataset.item;
    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.list[i].id == item.id) {
        this.data.list[i].item_hasbgr = 'item_hasbgr';
      } else {
        this.data.list[i].item_hasbgr = null;
      }
    }
    this.setData({
      list: this.data.list,
      id: e.currentTarget.dataset.item.id
    })
    this.getSkus(e.currentTarget.dataset.item.id,1,null);
  },
  getCategory: function (parentId, categoryId) {//获取分类
    var _self = this;
    wx.request({
      url: service + '/category/child?parentId=' + parentId,
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 200) {
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].id == categoryId) {
              res.data.data[i].item_hasbgr = 'item_hasbgr';
            } else {
              res.data.data[i].item_hasbgr = null;
            }
          }
          _self.setData({
            list: res.data.data
          })
        }
      }
    })
  },
  getSkus: function (categoryId, pageNum, refresh) {//获取商品
    var _self = this;
    wx.request({
      url: service + '/category/skus?categoryId=' + categoryId + '&pageSize=10&pageNum=' + pageNum,
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 200) {
          if (refresh == 'refresh') {
            for (var i = 0; i < res.data.data.list.length; i++) {
              _self.data.categoryList.push(res.data.data.list[i])
            }

            _self.setData({
              categoryList: _self.data.categoryList,
              id: categoryId
            })
          } else {
            _self.setData({
              categoryList: res.data.data.list,
              pageNum: pageNum,
              id: categoryId
            })
          }
        }
      }
    })
  }

})