// components/film-tag/index.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    filmTagItem: String,
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
    //提供搜素关键字
    viewFilmByTag() {
      this.triggerEvent('tag', {
        value : this.properties.filmTagItem
      })
    }
  }
})
