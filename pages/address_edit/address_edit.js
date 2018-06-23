// pages/address_edit/address_edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo:{},
    genders: [{ id: 'men', label: '男' }, { id: 'lady', label: '女' }],
    showPicker:[true,true,true,false],
    provinces:[],
  },

  bindKeyInputName: function (e) {
    var name = 'addressInfo.name';
    this.setData({
      [name]: e.detail.value
    })
  },
  bindKeyInputPhone: function (e) {
    var mobile = 'addressInfo.mobile';
    this.setData({
      [mobile]: e.detail.value
    })
  },
  bindKeyInputAddress: function (e) {
    var address = 'addressInfo.address';
    this.setData({
      [address]: e.detail.value
    })
  },
  bindKeyInputZip: function (e) {
    var zip = 'addressInfo.zip';
    this.setData({
      [zip]: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id);
    this.getProvince();
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
  bindProvinceChange: function (e) {
    var province = 'addressInfo.province';
    var provinceName = 'addressInfo.provinceName';
    this.setData({
      index0: e.detail.value,
      index1: null,
      showPicker: [true, true, false, false],
      [province]: this.data.provinces[e.detail.value].id,
      [provinceName]: this.data.provinces[e.detail.value].name
    })
    this.getCity(this.data.provinces[e.detail.value].id);
  },
  bindCityChange: function (e) {
    var city = 'addressInfo.city';
    var cityName = 'addressInfo.cityName';
    this.setData({
      index1: e.detail.value,
      index2: null,
      showPicker: [true, true, true, false],
      [city]: this.data.citys[e.detail.value].id,
      [cityName]: this.data.citys[e.detail.value].name
    })
    this.getCountry(this.data.citys[e.detail.value].id);
  },
  bindCountyChange: function (e) {
    var county = 'addressInfo.county';
    var countyName = 'addressInfo.countyName';
    this.setData({
      index2: e.detail.value,
      index3: null,
      showPicker: [true, true, true, true],
      [county]: this.data.countrys[e.detail.value].id,
      [countyName]: this.data.countrys[e.detail.value].name
    })
    this.getTown(this.data.countrys[e.detail.value].id);
  },

  bindTownChange: function () {
    var town = 'addressInfo.town';
    var townName = 'addressInfo.townName';
    this.setData({
      [town]: this.data.towns[e.detail.value].id,
      [townName]: this.data.towns[e.detail.value].name
    })
  },
  radioChange: function (e) {
    var gender = 'addressInfo.gender'
    this.setData({
      [gender]: e.detail.value
    })
  },
  editAddress: function () {
    console.log(this.data.addressInfo)
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/deliveries/delivery',
      method: 'PUT',
      data: this.data.addressInfo,
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.navigateBack();
        }
      }
    })
  },
  getProvince: function () {
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/division/province',
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        if(res.data.code ==200 && res.data.data.length>0){
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].id == _self.data.addressInfo.province) {
              _self.setData({
                index0: i
              })
            }
          }
          _self.setData({
            provinces: res.data.data
          });
        }
      }
    })
  },
  getCity: function (provinceId) {
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/division/city?provinceId=' + provinceId,
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        if(res.data.code == 200 && res.data.data.length>0){
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].id == _self.data.addressInfo.city) {
              _self.setData({
                index1: i
              })
            }
          }
          _self.setData({
            citys: res.data.data
          });
        }
      }
    })
  },
  getCountry: function (cityId) {
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/division/county?cityId=' + cityId,
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        if(res.data.code == 200 && res.data.data.length>0){
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].id == _self.data.addressInfo.county) {
              _self.setData({
                index2: i
              })
            }
          }

          _self.setData({
            countrys: res.data.data
          });
        }
      }
    })
  },
  getTown: function (countryId) {
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/division/town?countryId=' + countryId,
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        if(res.data.code == 200 && res.data.data.length>0){
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].id == _self.data.addressInfo.town) {
              _self.setData({
                index3: i
              })
            }
          }
          _self.setData({
            towns: res.data.data
          });
        }
      }
    })
  },
  getDetail:function(id){
    var _self = this;
    wx.request({
      url: 'https://zunxiangviplus.com/deliveries/detail?deliveryId='+id,
      method: 'GET',
      header: {
        'X-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 200) {
          for (var i = 0; i < _self.data.genders.length;i++){
            if(res.data.data.gender == _self.data.genders[i].id){
              _self.data.genders[i].checked = true;
            }
          }

          if (res.data.data.town){
            _self.data.showPicker[3] = true
          }

          _self.getCity(res.data.data.province);
          _self.getCountry(res.data.data.city);
          _self.getTown(res.data.data.county);
          
          _self.setData({
            addressInfo:res.data.data,
            genders:_self.data.genders,
            showPicker:_self.data.showPicker
          })
        }
      }
    })
  }
})