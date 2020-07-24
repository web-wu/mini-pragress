import { request } from "../../request/request.js"
Page({
  data: {
    userAddress: {},
    cartArr:[],
    totalPrice: 0,
    totalGoodsNum: 0
  },
  
  onShow () {
    let userAddress = wx.getStorageSync('userAddress');
    let cartArr = wx.getStorageSync('cartArr');
    this.setData({
      userAddress
    })
    this.setCartData(cartArr);
  },

  handleAddress () {
    let flag;
    wx.getSetting({
      success: (result) => {
        flag = result.authSetting['scope.address'];
      }
    })
    if (flag === false) {
      wx.openSetting({
        success: (result) => {
          console.log(result);
        }
      })
    }
    wx.chooseAddress({
      success: (result) => {
        let addressInfo = result;
        addressInfo.all = result.provinceName + result.cityName + result.countyName + result.detailInfo;
        wx.setStorageSync('userAddress', addressInfo);
      }
    });
  },

  setCartData (cartArr) {
    let totalPrice = 0;
    let totalGoodsNum = 0;
    cartArr = cartArr.filter(v => v.checked === true)
    cartArr.forEach(v => {
        totalPrice += v.num * v.goods_price;
        totalGoodsNum += v.num
    });
    this.setData({
      cartArr,
      totalPrice,
      totalGoodsNum
    })  
  }

})