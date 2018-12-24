// components/classic/date/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type:Number,

    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year:2018,
    month:3,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  attached(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    this.setData({
      year,
      month
    })
  }
})
