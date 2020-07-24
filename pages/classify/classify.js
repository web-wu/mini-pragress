import {request} from "../../request/request.js"
Page({
  data: {
    leftMune: [],
    rightContent: [],
    currentIndex:0,
    scrollTop: 0
  },
  classifyData: [],
  onLoad: function (options) {
    const DataList = wx.getStorageSync('classifyData');
    if (!DataList) {
      this.getClassifyData()
    } else {
      if (Date.now() - DataList.time > 1000 * 60 * 10) {
        this.getClassifyData()
      } else {
        this.classifyData = DataList.data;
        let leftMune = this.classifyData.map(v => v.cat_name);
        let rightContent = this.classifyData[0].children;
        this.setData({
          leftMune,
          rightContent
        })
      }
    }
  },
  getClassifyData () {
    request({url: '/categories'})
    .then(val => {
      this.classifyData = val.data.message;
      wx.setStorageSync('classifyData', {time: Date.now(), data: this.classifyData})
      let leftMune = this.classifyData.map(v => v.cat_name);
      let rightContent = this.classifyData[0].children;
      this.setData({
        leftMune,
        rightContent
      })
    });
  },
  handleItemTap (e) {
    const {index} = e.currentTarget.dataset;
    let rightContent = this.classifyData[index].children;
    this.setData({
      currentIndex: index,
      rightContent
    })
  }
})