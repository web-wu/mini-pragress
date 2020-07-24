// components/Bars/Bars.js
Component({
  properties: {
    bars:{
      type: Array,
      value: []
    }
  },

  data: {

  },

  methods: {
    handleTapItem (e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('transmitIndex', { index });
    }
  }
})
