// pages/orderList/orderList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{ id: null, name: '全部' },{ id: 'created', name: '待付款' },  { id: 'paid', name: '已付款' }, { id: 'sent', name: '已发货' }, { id: 'signed', name: '已签收' }],
    orderList: []
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
    this.data.list[0].item_hasbgr = 'item_hasbgr'
    this.setData({
      list: this.data.list,
      id: this.data.list[0].id
    });

    this.getOrderListApi(this.data.list[0].id,1,10);
    
  },
  getOrderList: function (e) {
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
    this.getOrderListApi(e.currentTarget.dataset.item.id,1);
  },
  getOrderListApi: function (status, pageNum, refresh) {
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/orders/list?pageSize=10&pageNum=' + pageNum,
      method: 'POST',
      data:{
        status: status
      },
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (refresh == 'refresh'){
          for (var i = 0; i < res.data.data.list.length; i++) {
            _self.data.orderList.push(res.data.data.list[i])
          }
          _self.setData({
            orderList: _self.data.orderList,
            pageNum: pageNum
          })
        }else{
          _self.setData({
            orderList: res.data.data.list,
            pageNum: pageNum
          })
        } 
      }
    })
  },
  toDetail: function (event) {
    var id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },
  pay:function(e){
    var orderId = e.currentTarget.dataset.item.id;
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/orders/pay',
      method: 'POST',
      data: orderId,
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if(res.data.code == 200){
          _self.payApi(res.data.data);
        }
      }
    })
  },
  payApi:function(data){
    var _self = this;
    wx.requestPayment(
      {
        'timeStamp': data.timeStamp,
        'nonceStr': data.nonceStr,
        'package': data.package,
        'signType': data.signType,
        'paySign': data.paySign,
        'success': function (res) {
          console.log(res)
          _self.getList();
        },
        'fail': function (res) {
          console.log(res)
        },
        'complete': function (res) {
          console.log(res)
        }
      })
  },
  onReachBottom: function () {
    var pageNum = this.data.pageNum + 1;
    this.setData({
      pageNum: pageNum
    })
    this.getOrderListApi(this.data.id, pageNum,'refresh');
  }
})