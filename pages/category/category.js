// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        id: 1,
        label: '男装',
        item_hasbgr: 'item_hasbgr',
        recomm_infos: [
          {
            id: 1,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai07.jpeg',
            title: '男装商品',
            price: '29.99'
          },
          {
            id: 2,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai09.jpeg',
            title: '男装商品',
            price: '29.99'
          },
          {
            id: 3,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai10.jpeg',
            title: '男装商品',
            price: '29.99'
          },
          {
            id: 4,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai02.jpeg',
            title: '男装商品',
            price: '29.99'
          },
          {
            id: 5,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai04.jpeg',
            title: '男装商品',
            price: '29.99'
          },
          {
            id: 6,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai03.jpeg',
            title: '男装商品',
            price: '29.99'
          }
        ]
      },
      {
        id: 2,
        label: '女装',
        recomm_infos: [
          {
            id: 1,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai07.jpeg',
            title: '女装商品',
            price: '29.99'
          },
          {
            id: 2,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai09.jpeg',
            title: '女装荐商品',
            price: '29.99'
          },
          {
            id: 3,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai10.jpeg',
            title: '女装商品',
            price: '29.99'
          },
          {
            id: 4,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai02.jpeg',
            title: '女装商品',
            price: '29.99'
          },
          {
            id: 5,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai04.jpeg',
            title: '女装商品',
            price: '29.99'
          },
          {
            id: 6,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai03.jpeg',
            title: '女装商品',
            price: '29.99'
          }
        ]
      },
      {
        id: 3,
        label: '家居',
        recomm_infos: [
          {
            id: 1,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai07.jpeg',
            title: '家居商品',
            price: '29.99'
          },
          {
            id: 2,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai09.jpeg',
            title: '家居商品',
            price: '29.99'
          },
          {
            id: 3,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai10.jpeg',
            title: '家居商品',
            price: '29.99'
          },
          {
            id: 4,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai02.jpeg',
            title: '家居商品',
            price: '29.99'
          },
          {
            id: 5,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai04.jpeg',
            title: '家居商品',
            price: '29.99'
          },
          {
            id: 6,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai03.jpeg',
            title: '家居商品',
            price: '29.99'
          }
        ]
      },
      {
        id: 4,
        label: '电器',
        recomm_infos: [
          {
            id: 1,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai07.jpeg',
            title: '电器商品',
            price: '29.99'
          },
          {
            id: 2,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai09.jpeg',
            title: '电器商品',
            price: '29.99'
          },
          {
            id: 3,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai10.jpeg',
            title: '电器商品',
            price: '29.99'
          },
          {
            id: 4,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai02.jpeg',
            title: '电器商品',
            price: '29.99'
          },
          {
            id: 5,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai04.jpeg',
            title: '电器商品',
            price: '29.99'
          },
          {
            id: 6,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai03.jpeg',
            title: '电器商品',
            price: '29.99'
          }
        ]
      },
      {
        id: 5,
        label: '母婴',
        recomm_infos: [
          {
            id: 1,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai07.jpeg',
            title: '母婴商品',
            price: '29.99'
          },
          {
            id: 2,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai09.jpeg',
            title: '母婴商品',
            price: '29.99'
          },
          {
            id: 3,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai10.jpeg',
            title: '母婴商品',
            price: '29.99'
          },
          {
            id: 4,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai02.jpeg',
            title: '母婴商品',
            price: '29.99'
          },
          {
            id: 5,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai04.jpeg',
            title: '母婴商品',
            price: '29.99'
          },
          {
            id: 6,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai03.jpeg',
            title: '母婴商品',
            price: '29.99'
          }
        ]
      },
      {
        id: 6,
        label: '运动',
        recomm_infos: [
          {
            id: 1,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai07.jpeg',
            title: '运动商品',
            price: '29.99'
          },
          {
            id: 2,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai09.jpeg',
            title: '运动商品',
            price: '29.99'
          },
          {
            id: 3,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai10.jpeg',
            title: '运动商品',
            price: '29.99'
          },
          {
            id: 4,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai02.jpeg',
            title: '运动商品',
            price: '29.99'
          },
          {
            id: 5,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai04.jpeg',
            title: '运动商品',
            price: '29.99'
          },
          {
            id: 6,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai03.jpeg',
            title: '运动商品',
            price: '29.99'
          }
        ]
      }, {
        id: 7,
        label: '户外',
        recomm_infos: [
          {
            id: 1,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai07.jpeg',
            title: '户外商品',
            price: '29.99'
          },
          {
            id: 2,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai09.jpeg',
            title: '户外商品',
            price: '29.99'
          },
          {
            id: 3,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai10.jpeg',
            title: '户外商品',
            price: '29.99'
          },
          {
            id: 4,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai02.jpeg',
            title: '户外商品',
            price: '29.99'
          },
          {
            id: 5,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai04.jpeg',
            title: '户外商品',
            price: '29.99'
          },
          {
            id: 6,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai03.jpeg',
            title: '户外商品',
            price: '29.99'
          }
        ]
      },
      {
        id: 8,
        label: '美妆',
        recomm_infos: [
          {
            id: 1,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai07.jpeg',
            title: '美妆商品',
            price: '29.99'
          },
          {
            id: 2,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai09.jpeg',
            title: '美妆商品',
            price: '29.99'
          },
          {
            id: 3,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai10.jpeg',
            title: '美妆商品',
            price: '29.99'
          },
          {
            id: 4,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai02.jpeg',
            title: '美妆商品',
            price: '29.99'
          },
          {
            id: 5,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai04.jpeg',
            title: '美妆商品',
            price: '29.99'
          },
          {
            id: 6,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai03.jpeg',
            title: '美妆商品',
            price: '29.99'
          }
        ]
      },
      {
        id: 9,
        label: '个人护理',
        recomm_infos: [
          {
            id: 1,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai07.jpeg',
            title: '个人护理商品',
            price: '29.99'
          },
          {
            id: 2,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai09.jpeg',
            title: '个人护理商品',
            price: '29.99'
          },
          {
            id: 3,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai10.jpeg',
            title: '个人护理商品',
            price: '29.99'
          },
          {
            id: 4,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai02.jpeg',
            title: '个人护理商品',
            price: '29.99'
          },
          {
            id: 5,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai04.jpeg',
            title: '个人护理商品',
            price: '29.99'
          },
          {
            id: 6,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai03.jpeg',
            title: '个人护理商品',
            price: '29.99'
          }
        ]
      },
      {
        id: 10,
        label: '美食',
        recomm_infos: [
          {
            id: 1,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai07.jpeg',
            title: '美食商品',
            price: '29.99'
          },
          {
            id: 2,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai09.jpeg',
            title: '美食商品',
            price: '29.99'
          },
          {
            id: 3,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai10.jpeg',
            title: '美食商品',
            price: '29.99'
          },
          {
            id: 4,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai02.jpeg',
            title: '美食商品',
            price: '29.99'
          },
          {
            id: 5,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai04.jpeg',
            title: '美食商品',
            price: '29.99'
          },
          {
            id: 6,
            url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai03.jpeg',
            title: '美食商品',
            price: '29.99'
          }
        ]
      }
    ],
    result: {
      recomm_infos: [
        {
          id: 1,
          url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai07.jpeg',
          title: '男装商品',
          price: '29.99'
        },
        {
          id: 2,
          url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai09.jpeg',
          title: '男装商品',
          price: '29.99'
        },
        {
          id: 3,
          url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai10.jpeg',
          title: '男装商品',
          price: '29.99'
        },
        {
          id: 4,
          url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai02.jpeg',
          title: '男装商品',
          price: '29.99'
        },
        {
          id: 5,
          url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai04.jpeg',
          title: '男装商品',
          price: '29.99'
        },
        {
          id: 6,
          url: 'http://p95v2ft9v.bkt.clouddn.com/xf/images/sucai03.jpeg',
          title: '男装商品',
          price: '29.99'
        }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  showResult: function (event) {
    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.list[i].id == event.currentTarget.dataset.id) {
        this.data.list[i].item_hasbgr = 'item_hasbgr';
        this.setData({
          result: {
            recomm_infos: this.data.list[i].recomm_infos
          }
        })
      } else {
        this.data.list[i].item_hasbgr = '';
      }
    }
    this.setData({
      list: this.data.list
    })
  }
})