import { request } from "../../request/request.js"
Page({
  data: {
    bars:[
      {
        id: 1,
        name: "综合",
        isActive: true
      },
      {
        id: 2,
        name: "销量",
        isActive: false
      },
      {
        id: 3,
        name: "价格",
        isActive: false
      }
    ],
    goodList: []
  },
  queryParams: {
    pagenum: 1,
    pagesize: 10,
    query: '',
    cid: ''
  },
  pageTotal: 1,

  onLoad: function (options) {
    this.queryParams.cid = options.cid || ''; 
    this.queryParams.query = options.query || '';
    this.getGoodsData ()
  },

  handleEvent (e) {
    const { index } = e.detail;
    let { bars } = this.data;
    bars.forEach((v, i) => { i === index ? v.isActive = true : v.isActive = false });
    this.setData({
      bars
    })
  },
  getGoodsData () {
    request({url: '/goods/search', data: this.queryParams})
    .then(val => {
      this.setData({
        goodList: [...this.data.goodList, ...val.data.message.goods]
      })
      const total = val.data.message.total;
      this.pageTotal = Math.ceil(total / this.queryParams.pagesize);
    })
    wx.stopPullDownRefresh();
  },

  onReachBottom: function () {
    if (this.queryParams.pagenum >= this.pageTotal) {
      wx.showToast({title: '没有数据了', icon: 'loading'})
    } else{
      this.queryParams.pagenum++;
      this.getGoodsData();
    }
  },

  onPullDownRefresh () {
    this.setData({
      goodList: []
    })
    this.queryParams.pagenum = 1;
    this.getGoodsData();
  }
})