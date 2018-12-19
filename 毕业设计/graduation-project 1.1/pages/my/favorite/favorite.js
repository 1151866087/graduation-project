var filmNullTip = {
  tipText: '亲，找不到电影的收藏',
  actionText: '去逛逛'
}
var personNullTip = {
  tipText: '亲，找不到人物的收藏',
  actionText: '去逛逛'
}
// import { FilmModel } from "../../../models/film";
// const filmModel = new FilmModel();
import { bannerList } from "../../../config"
const app = getApp()
Page({
  // onLoad(){
  //   // filmModel.getComingSoon(0).then(res => {
  //   //   this.setData({
  //   //     total: res.total,
  //   //     films: res.subjects
  //   //   })
  //   //   console.log(res.subjects[0])
  //   // })
    
  // }
  data:{
    film_favorite: [],
    person_favorite: [],
    show: 'film_favorite',
    nullTip: filmNullTip
  },
  onLoad:function(options){
    var that = this
    wx.getStorage({
      key: 'film_favorite',
      success: function(res){
        that.setData({
          film_favorite: res.data
        })
      }
    })
    wx.getStorage({
      key: 'person_favorite',
      success: function(res){
        that.setData({
          person_favorite: res.data
        })
      }
    })
    wx.stopPullDownRefresh()
  },
  viewFilmDetail: function(e) {
		var data = e.currentTarget.dataset
		wx.redirectTo({
			url: "../filmDetail/filmDetail?id=" + data.id
		})
  },
  viewPersonDetail: function(e) {
		var data = e.currentTarget.dataset
		wx.redirectTo({
			url: "../personDetail/personDetail?id=" + data.id
		})
  },
  changeViewType: function(e) {
    var data = e.currentTarget.dataset
    this.setData({
      show: data.type,
      nullTip: data.type == 'film_favorite' ? filmNullTip : personNullTip
    })
  }
})