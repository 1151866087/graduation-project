// components/my/favorite-movie/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    filmFavoriteItem:Object
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
    viewFilmDetail(e){
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/film-detail/film-detail?id='+id,
      })
    }
  }
})
