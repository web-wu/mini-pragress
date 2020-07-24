
Page({
  data: {
    userInfo: {},
    collectNumber: 0
  },

  onShow: function () {
    const userInfo = wx.getStorageSync("userInfo");
    const arrCollect = wx.getStorageSync('collect') || [];
    let collectNumber = arrCollect.length;
    this.setData({
      userInfo,
      collectNumber
    })
  }
})