// pages/category/category.js
var _self = this;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    categoryList: [],
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
    var _self = this;
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
    this.getCardInfo();
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
  getList: function () {
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/category/list',
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        res.data.data.unshift({id:'',name:'全部'})
        res.data.data[0].item_hasbgr = 'item_hasbgr';
        
        //初始化
        var page={
          pageNum: 1,
          pageSize:10
        }

        _self.setData({
          list: res.data.data,
          id: res.data.data[0].id,
          pageNum:1,
          pageSize:10
        });
        
        _self.getCategoryListApi(res.data.data[0].id, page.pageNum, page.pageSize);
      }
    })
  },
  getCategoryList: function (e){
    var item = e.currentTarget.dataset.item;
    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.list[i].id == item.id){
        this.data.list[i].item_hasbgr = 'item_hasbgr';
      }else{
        this.data.list[i].item_hasbgr = null;
      }
    }
    this.setData({
      list: this.data.list,
      id: e.currentTarget.dataset.item.id
    })
    this.getCategoryListApi(e.currentTarget.dataset.item.id, 1, 10);
  },
  getCategoryListApi: function (id, pageNum, pageSize) {
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/category/sku?categoryId=' + id,
      method: 'GET',
      data:{
        pageNum: pageNum,
        pageSize: pageSize
      },
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        _self.setData({
          categoryList: res.data.data.list
        })
      }
    })
  },
  toDetail: function (event){
    var id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },

  getCardInfo: function () {
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/user',
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
  onReachBottom:function(){
    var pageNum = this.data.pageNum + 1;
    var pageSize = 10 * pageNum;
    this.setData({
      pageNum: pageNum,
      pageSize: pageSize
    })
    this.getCategoryListApi(this.data.id, pageNum, pageSize);
  }
  
})