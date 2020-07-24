import {request} from "../../request/request.js"
Page({
  data: {
    bannerList: [],
    navBarList: [],
    infoBarData: []
  },
  onLoad: function () {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: function (res) {
    //     console.log(res);
    //   }
    // })

    this.getBannerList();
    this.getnavBarList();
    this.getinfoBarData();
    
  },
  getBannerList () {
    request({url: '/home/swiperdata'})
    .then(val => {
      this.setData({
        bannerList: val.data.message
      })
    })
  },
  getnavBarList () {
    request({url: '/home/catitems'})
    .then(val => {
      this.setData({
        navBarList: val.data.message
      })
    })
  },
  getinfoBarData () {
    request({url: '/home/floordata'})
    .then(val => {
      this.setData({
        infoBarData: val.data.message
      })
    })
  }
})
