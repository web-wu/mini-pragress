import { request } from "../../request/request.js"
Page({
  data: {
    goodsInfo: {},
    isCollect: false
  },

  goodsObj: {},

  onLoad (options) {
    const { goods_id } = options;
    this.getGoodsinfo(goods_id);
  },

  onShow: function () {
    let arrCollect = wx.getStorageSync('collect') || [];
    let isCollect = arrCollect.some(v => v.goods_id === this.goodsObj.goods_id);
    this.setData({
      isCollect
    })
  },

  getGoodsinfo (id) {
    request({url: '/goods/detail', data: { goods_id: id }})
    .then(val => {
      this.goodsObj = val.data.message;
      this.setData({
        goodsInfo: {
          goods_name: this.goodsObj.goods_name,
          goods_price: this.goodsObj.goods_price,
          goods_introduce: this.goodsObj.goods_introduce,
          pics: this.goodsObj.pics
        }
      })
    })
  },

  handdlePreviewImg (e) {
    let img_url = this.goodsObj.pics.map(v => v.pics_mid);
    let current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls: img_url
    });
  },

  handleAddGoods () {
    let cartGoods = wx.getStorageSync('cartArr') || [];
    let index = cartGoods.findIndex(v => v.goods_id === this.goodsObj.goods_id);
    if (index === -1) {
       this.goodsObj.num = 1;
       this.goodsObj.checked = true;
       cartGoods.push(this.goodsObj);
    } else {
      cartGoods[index].num++;
    }
    wx.setStorageSync('cartArr', cartGoods);
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true,
    });
      
  },

  handleCollect () {
    let isCollect = false;
    let arrCollect = wx.getStorageSync('collect') || [];
    let index = arrCollect.findIndex(v => v.goods_id === this.goodsObj.goods_id);
    if (index === -1) {
      isCollect = true;
      arrCollect.push(this.goodsObj);
      wx.showToast({
        title: '收藏成功'
      })
    } else {
      isCollect = false;
      arrCollect.splice(index, 1)
      wx.showToast({
        title: '取消收藏'
      })
    }
    wx.setStorageSync('collect', arrCollect);
  }

})