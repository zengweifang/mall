// pages/search/search.js
var utils = require('../../utils/util.js')
//获取应用实例
const app = getApp()
const service = utils.service;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardInfo:null,
    dataList:[],
    list: [{ id: 1, name: '综合', orderBy: 'common', item_hasbgr: 'item_hasbgr' }, { id: 2, name: '价格', orderBy:'price'}],
    sort: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('token')){
      this.getCardInfo();
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
    this.searchApi(pageNum,'reachBottom');
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  
  // },
  bindInputKey:function(e){
    this.setData({
      keyWords:e.detail.value
    })
  },

  search:function(){
    this.searchApi(1,'sousuo');
  },

  searchApi: function (pageNum, flag, orderBy, sort){
    var keyWords = this.data.keyWords;
    var _self = this;
    // wx.showLoading();
    wx.request({
      url: service + '/sku/search?pageNum=' + pageNum+'&pageSize=10',
      method: 'POST',
      data: {
        key: keyWords,
        orderBy: orderBy,
        sort: sort
      },
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        if(res.data.code == 200){
          if(res.data.data.list.length !== 0){
            if (flag == 'reachBottom'){
              for (var i = 0; i < res.data.data.list.length; i++) {
                _self.data.dataList.push(res.data.data.list[i])
              }
              _self.setData({
                dataList: _self.data.dataList,
                pageNum: pageNum
              })
            }else{
              _self.data.dataList = res.data.data.list;
              _self.setData({
                dataList: _self.data.dataList,
                pageNum: pageNum
              })
            }
            
          }else{
            if (flag == 'reachBottom') {
              wx.showToast({
                title: '没有更多商品了',
                duration: 2000,
                icon: 'none'
              })
            } else {
              _self.setData({
                dataList: []
              })
              wx.showToast({
                title: '换个条件试试',
                duration: 2000,
                icon: 'none'
              })
            }
          }
          
        }
        // setTimeout(function () {
        //   wx.hideLoading()
        // }, 2000)
      }
    })
  },
  detail: function (event){
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
        console.log(res)
        if (res.data.code == 200) {
          _self.setData({
            cardInfo: res.data.data
          })
        }
      }
    })
  },
  sort: function (e) {
    var item = e.currentTarget.dataset.item;
    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.list[i].id == item.id) {
        this.data.list[i].item_hasbgr = 'item_hasbgr';
      } else {
        this.data.list[i].item_hasbgr = null;
      }
    }
    this.setData({
      list: this.data.list
    })

    if (this.data.sort == 'asc'){
      this.data.sort = 'desc'
    }else{
      this.data.sort = 'asc'
    }
    this.searchApi(1, 'sousuo', e.currentTarget.dataset.item.orderBy, this.data.sort);
  },
})