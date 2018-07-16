//index.js
var utils = require('../../utils/util.js')
//获取应用实例
const app = getApp()
const service = utils.service;
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
    inputVal: "",
    show:false
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
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    if (wx.getStorageSync('token')) {
      this.getHomePageData();
      this.getNewGoodsData(1);
      this.getCardInfo();
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
    
    wx.hideNavigationBarLoading();
    this.setData({
      show: true
    })

    var scene = decodeURIComponent(options.scene)
    if (scene && scene != 'undefined'){
      var agentId = scene.split('=')[1];
      wx.setStorageSync('agentId', agentId)
    }else{
      wx.setStorageSync('agentId', options.agentId)
    }
  },
  onShow: function () {
    // if (wx.getStorageSync('token')) {
    //   this.getHomePageData();
    //   this.getNewGoodsData(1);
    //   this.getCardInfo();
    // }
    var pages = getCurrentPages()    //获取加载的页面

    var currentPage = pages[pages.length - 1]    //获取当前页面的对象

    var url = currentPage.route    //当前页面url

    var options = currentPage.options    //如果要获取url中所带的参数可以查看options

    var agentId = decodeURIComponent(options.agentId)
    if (agentId && agentId != 'undefined') {
      wx.setStorageSync('agentId', agentId)
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
      url: service+'/index/operation',
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
  getNewGoodsData: function (pageNum,refresh) {//获取新品推荐商品
    var _self = this;
    wx.request({
      url: service+'/index/sku', //仅为示例，并非真实的接口地址
      method: 'GET',
      data:{
        pageNum: pageNum,
        pageSize:10
      },
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        if (refresh == 'refresh') {
          for (var i = 0; i < res.data.data.list.length; i++) {
            _self.data.newGoodsData.push(res.data.data.list[i])
          }
          _self.setData({
            pageNum: pageNum,
            newGoodsData: _self.data.newGoodsData
          })
        } else {
          _self.setData({
            pageNum:1,
            newGoodsData: res.data.data.list
          });
        } 
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
            cardInfo : res.data.data
          })
        }
      }
    })
  },
  onReachBottom:function(){
    var pageNum = this.data.pageNum + 1;
    this.setData({
      pageNum: pageNum
    })
    this.getNewGoodsData(pageNum, 'refresh');
  },

  onShareAppMessage: function (res) {
    var _self = this;
    var agentId = _self.data.cardInfo.userType == 'AGENT' ? _self.data.cardInfo.agentId : '';
    return {
      title: '尊享viplus',
      path: '/pages/index/index?agentId=' + agentId
    }
  },
  toNewPage:function(e){
    var url = e.currentTarget.dataset.item.url
    wx.navigateTo({
      url:  url,
    })
  },
  search: function(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  }
})
