// components/my/nullTip/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    nullTip:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onJump(){
      console.log(1)
      wx.switchTab({
        url: '/pages/popular/popular',
      }) 
    }
  }
})
