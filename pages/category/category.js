// pages/category/category.js
var _self = this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    categoryList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
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
        res.data.data[0].item_hasbgr = 'item_hasbgr';
        _self.setData({
          list: res.data.data
        });
        
        _self.getCategoryListApi(res.data.data[0].id);
      }
    })
  },
  getCategoryList: function(e){
    var item = e.currentTarget.dataset.item;
    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.list[i].id == item.id){
        this.data.list[i].item_hasbgr = 'item_hasbgr';
      }else{
        this.data.list[i].item_hasbgr = null;
      }
    }
    this.setData({
      list: this.data.list
    })
    this.getCategoryListApi(e.currentTarget.dataset.item.id);
  },
  getCategoryListApi: function (id) {
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/category/sku?categoryId=' + id,
      method: 'GET',
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
  }
})