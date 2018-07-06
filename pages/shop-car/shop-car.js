// pages/shop-car/shop-car.js
var utils = require('../../utils/util.js')
const service = utils.service
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carsList: [],
    totalPrice: '',
    show:false,
    editIndex: 0,
    delBtnWidth: 75//删除按钮宽度单位（rpx）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCardInfo();
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
    this.getCardInfo();
    this.getList()
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
  getList: function () {
    var _self = this;
    wx.request({
      url: service+'/cart/sku',
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        var price = 0;
        var num = 0;
        for (var i = 0; i < res.data.data.length; i++) {
          var goodsPrice = 0;
          if (_self.data.cardInfo.vip) {
            goodsPrice = res.data.data[i].vipPrice
          } else {
            goodsPrice = res.data.data[i].sellPrice
          }
          res.data.data[i].checked = true;
          price += goodsPrice * res.data.data[i].num;
          num += res.data.data[i].num*1;
        }
        _self.setData({
          totalPrice: price,
          carsList: res.data.data,
          num : num
        })
      }
    })
  },

  tobuy: function () {
    var items = [];
    for (var i = 0; i < this.data.carsList.length; i++) {
      if (this.data.carsList[i].checked) {
        items.push(this.data.carsList[i])
      }
    }
    wx.setStorageSync('checkedItems', JSON.stringify(items))
    wx.navigateTo({
      url: '/pages/order/order?fromCart='+true
    })
  },
  checkFun: function (e) {
    for (var i = 0; i < this.data.carsList.length; i++) {
      if (this.data.carsList[i].id == e.currentTarget.dataset.item.id) {
        this.data.carsList[i].checked = !this.data.carsList[i].checked;
      }
    }

    var price = 0
    for (var i = 0; i < this.data.carsList.length; i++) {
      if (this.data.carsList[i].checked) {
        var goodsPrice = 0;
        if (this.data.cardInfo.vip) {
          goodsPrice = this.data.carsList[i].vipPrice
        } else {
          goodsPrice = this.data.carsList[i].sellPrice
        }
        price += goodsPrice * this.data.carsList[i].num;
      }
    }
    this.setData({
      totalPrice: price,
      carsList: this.data.carsList
    })
  },

  del: function (e) {
    var _self = this;
    var skuId = e.currentTarget.dataset.id;
    wx.request({
      url: service+'/cart/sku',
      method: 'DELETE',
      data: skuId,
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        _self.getList()
      }
    })
  },

  jiaBtnTap: function (e) {
    var item = e.currentTarget.dataset.item;
    this.updateCars(item.id, item.num + 1)
  },
  jianBtnTap: function (e) {
    var item = e.currentTarget.dataset.item;
    this.updateCars(item.id, item.num - 1)
  },

  updateCars: function (skuId, num) {
    var _self = this;
    wx.request({
      url: service+'/cart/sku',
      method: 'PUT',
      data: {
        skuId: skuId,
        num: num
      },
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        _self.getList()
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
            cardInfo: res.data.data
          })
        }
      }
    })
  },

  toDetail: function (event){
    var id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },
  //手指刚放到屏幕触发
  touchS: function (e) {
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },
  
  //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function (e) {
    var that = this
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index;
      var list = that.data.carsList;
      //将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        carsList: list
      });
    }
  },
  touchE: function (e) {
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = that.data.carsList;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        carsList: list
      });
    }
  }
})