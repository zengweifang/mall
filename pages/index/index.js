//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    interval: 8000,
    duration: 1000,
    indicatorDots: false,
    autoplay: true,
    homePageData: {},
    newGoodsData: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputShowed: false,
    inputVal: ""
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (wx.getStorageSync('token')) {
      this.getHomePageData();
      this.getNewGoodsData();
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function () {
    if (wx.getStorageSync('token')) {
      this.getHomePageData();
      this.getNewGoodsData();
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toDetail: function (event) {
    var id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },
  getHomePageData: function () {//获取首页banner图、九宫格、人气推荐
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/index/operation',
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        _self.setData({
          homePageData: res.data.data
        })
      }
    })
  },
  getNewGoodsData: function () {//获取新品推荐商品
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/index/sku', //仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        _self.setData({
          newGoodsData: res.data.data
        });
      }
    })
  }
})
