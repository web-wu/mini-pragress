
Page({
  data: {
    arrCollect: []
  },

  onLoad: function (options) {
    const arrCollect = wx.getStorageSync('collect') || [];
    this.setData({
      arrCollect
    })
  }
})