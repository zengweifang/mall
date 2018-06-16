//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    interval: 8000,
    duration: 1000,
    indicatorDots: false,
    autoplay: true,
    bannerUrls: [],//banner定义
    bannerUrlsTemp : [//测试数据
      { id: 1, url: 'http://p95v2ft9v.bkt.clouddn.com/xf/imags/banner01.jpeg' },
      { id: 2, url: 'http://p95v2ft9v.bkt.clouddn.com/xf/imags/banner02.jpeg' },
      { id: 3, url: 'http://p95v2ft9v.bkt.clouddn.com/xf/imags/banner03.jpeg' }
    ],
    grids: [],//九宫格定义
    gridsTemp:[//测试数据
      {
        id: 1,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/jiugongge02_06.jpg'
      },
      {
        id: 2,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/jiugongge02_08.jpg'
      },
      {
        id: 3,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/jiugongge02_03.gif'
      },
      {
        id: 4,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/jiugongge02_15.jpg'
      },
      {
        id: 5,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/jiugongge02_13.gif'
      },
      {
        id: 6,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/jiugongge02_17.gif'
      },
      {
        id: 7,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/jiugongge02_29.gif'
      },
      {
        id: 8,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/jiugongge02_23.gif'
      },
      {
        id: 9,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/jiugongge02_26.jpg'
      }
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputShowed: false,
    inputVal: "",
    recomm_infos:[],//人气推荐定义
    recomm_infosTemp:[//测试数据
      {
        id: 1,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai07.jpeg',
        title: '人气推荐商品',
        price: '29.99'
      },
      {
        id: 2,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai09.jpeg',
        title: '人气推荐商品',
        price: '29.99'
      },
      {
        id: 3,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai10.jpeg',
        title: '人气推荐商品',
        price: '29.99'
      },
      {
        id: 4,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai02.jpeg',
        title: '人气推荐商品',
        price: '29.99'
      },
      {
        id: 5,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai04.jpeg',
        title: '人气推荐商品',
        price: '29.99'
      },
      {
        id: 6,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai03.jpeg',
        title: '人气推荐商品',
        price: '29.99'
      }
    ],
    newp_infos: [],//新品推荐定义
    newp_infosTemp:[//测试数据
      {
        id: 1,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai07.jpeg',
        title: '新品推荐商品',
        price: '29.99'
      },
      {
        id: 2,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai09.jpeg',
        title: '新品推荐商品',
        price: '29.99'
      },
      {
        id: 3,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai10.jpeg',
        title: '新品推荐商品',
        price: '29.99'
      },
      {
        id: 4,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai02.jpeg',
        title: '新品推荐商品',
        price: '29.99'
      },
      {
        id: 5,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai04.jpeg',
        title: '新品推荐商品',
        price: '29.99'
      },
      {
        id: 6,
        url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai03.jpeg',
        title: '新品推荐商品',
        price: '29.99'
      }
    ]
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
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getBanner();
    this.getGrids();
    this.getRecommInfos();
    this.getNewp_infos();
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toDetail:function(){
    wx.navigateTo({
      url: '/pages/detail/detail',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toList: function(){
    wx.navigateTo({
      url: '/pages/list/list'
    })
  },
  getBanner:function(){
    var _self = this;
    wx.request({
      url: 'https://test-app.wang-guanjia.com/background-manage/apartment/editor', //仅为示例，并非真实的接口地址
      data: {
        id: '9cd16a8b-d3b7-4cc6-a8d7-68d8e19d38eb'
      },
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _self.setData({
          bannerUrls: _self.data.bannerUrlsTemp
        });
      }
    })
  },
  getGrids: function () {
    var _self = this;
    wx.request({
      url: 'https://test-app.wang-guanjia.com/background-manage/apartment/editor', //仅为示例，并非真实的接口地址
      data: {
        id: '9cd16a8b-d3b7-4cc6-a8d7-68d8e19d38eb'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data);
        _self.setData({
          grids: _self.data.gridsTemp
        });
      }
    })
  },
  getRecommInfos: function () {
    var _self = this;
    wx.request({
      url: 'https://test-app.wang-guanjia.com/background-manage/apartment/editor', //仅为示例，并非真实的接口地址
      data: {
        id: '9cd16a8b-d3b7-4cc6-a8d7-68d8e19d38eb'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _self.setData({
          recomm_infos: _self.data.recomm_infosTemp
        });
      }
    })
  },
  getNewp_infos: function () {
    var _self = this;
    // wx.request({
    //   url: 'https://test-app.wang-guanjia.com/background-manage/apartment/editor', //仅为示例，并非真实的接口地址
    //   data: {
    //     id: '9cd16a8b-d3b7-4cc6-a8d7-68d8e19d38eb'
    //   },
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res.data);
    //     _self.setData({
    //       newp_infos: _self.data.newp_infosTemp
    //     });
    //   }
    // })
  }
})
