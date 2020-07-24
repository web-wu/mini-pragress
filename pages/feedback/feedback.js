Page({
  data: {
    tab: [{
      id: 1,
      title: '体验问题',
      isActive: true
    },{
      id: 2,
      title: '商品、商家投诉',
      isActive: false
    }]
  },

  handleCahngeItem (e) {
    let {index} = e.currentTarget.dataset;
    let {tab} = this.data;
    tab.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
  }
});
  