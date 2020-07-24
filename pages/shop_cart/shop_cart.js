import { request } from "../../request/request.js"
Page({
  data: {
    userAddress: {},
    cartArr:[],
    totalPrice: 0,
    totalGoodsNum: 0,
    allChecked: true
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
    let allChecked = true;
    let totalPrice = 0;
    let totalGoodsNum = 0;
    cartArr.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalGoodsNum += v.num
      } else {
        allChecked = false;
      }
    });
    allChecked = cartArr.length !== 0 ? allChecked : false;
    this.setData({
      cartArr,
      allChecked,
      totalPrice,
      totalGoodsNum
    })  
    wx.setStorageSync('cartArr', cartArr)
  },

  handleCheckedChange (e) {
    let goods_id = e.currentTarget.dataset.id;
    let { cartArr } = this.data;
    let index = cartArr.findIndex(v => v.goods_id === goods_id);
    cartArr[index].checked = !cartArr[index].checked;
    this.setCartData(cartArr);
  },

  handleAllChecked () {
    let { cartArr, allChecked } = this.data;
    allChecked = !allChecked;
    cartArr.forEach(v => {
      v.checked = allChecked;
    });
    this.setCartData(cartArr);
  },

  handleOptionNumber (e) {
    let { id, optionnum } = e.currentTarget.dataset;
    let { cartArr } = this.data;
    let index = cartArr.findIndex(v => v.goods_id === id);
    if (cartArr[index].num === 1 && optionnum === -1) {
      return false;
    } else {
      cartArr[index].num += optionnum;
      this.setCartData(cartArr);
    }
  }

})