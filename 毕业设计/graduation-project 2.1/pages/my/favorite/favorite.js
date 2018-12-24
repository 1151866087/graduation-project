var filmNullTip = {
  tipText: '亲，找不到电影的收藏',
  actionText: '去逛逛'
}
var musicNullTip = {
  tipText: '亲，找不到音乐的收藏',
  actionText: '去逛逛'
}
import { bannerList } from "../../../config"
const app = getApp()
Page({
  data:{
    film_favorite: [],
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
    wx.stopPullDownRefresh()
  },
  viewFilmDetail: function(e) {
		var data = e.currentTarget.dataset
		wx.redirectTo({
			url: "../filmDetail/filmDetail?id=" + data.id
		})
  },
  // viewMusicDetail: function(e) {
	// 	var data = e.currentTarget.dataset
	// 	wx.redirectTo({
	// 		url: "../musicDetail/musicDetail?id=" + data.id
	// 	})
  // },
  // changeViewType: function(e) {
  //   var data = e.currentTarget.dataset
  //   this.setData({
  //     show: data.type,
  //     nullTip: data.type == 'film_favorite' ? filmNullTip : musicNullTip
  //   })
  // }
})