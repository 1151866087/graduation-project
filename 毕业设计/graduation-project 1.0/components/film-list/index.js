// components/film-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    filmItem:Object
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
    //通过id跳转
    onJump() {
      wx.navigateTo({
        url: '/pages/film-detail/film-detail?id=' + this.properties.filmItem.id
      })
    },
    viewFilmByTag(e) {
		  var tag = e.detail.value;
      this.triggerEvent('tag', {
        value : tag
      })
    },
  }
})
