import { FilmModel } from "../../models/film";
const filmModel = new FilmModel();
import { bannerList } from "../../config"
const util = require('../../util/util')
const app = getApp()
Page({
	data: {
		filmDetail: {},
		showLoading: true,
		showContent: false,
		isFilmFavorite: false
	},
	onLoad: function (options) {
		const id = options.id;
		filmModel.getFilmDetail(id).then(films => {
			this.setData({
				filmDetail: films,
				showLoading: false,
				showContent: true
			})
		})
		//判断是否收藏
		wx.getStorage({
			key: 'film_favorite',
			success:(res) =>{
				for (var i = 0; i < res.data.length; i++) {
					if (res.data[i].id == id) {
						this.setData({
							isFilmFavorite: true
						})
					}
				}
			}
		})
	},
	/* 人物详情页 */
	// viewPersonDetail: function (e) {
	// 	var data = e.currentTarget.dataset;
	// 	wx.redirectTo({
	// 		url: '../personDetail/personDetail?id=' + data.id
	// 	})
	// },
	
	/* 标签跳转 */
	viewFilmByTag(e) {
		var tag = e.detail.value;
		wx.reLaunch({
			url: '/pages/search/search?tag=' + tag
		})
	},
	onPullDownRefresh: function () {
		var data = {
			id: this.data.filmDetail.id
		}
		this.onLoad(data)
	},
	favoriteFilm: function () {
		var self = this
		// 判断原来是否收藏，是则删除，否则添加
		wx.getStorage({
			key: 'film_favorite',
			success: function (res) {
				var film_favorite = res.data
				if (self.data.isFilmFavorite) {
					// 删除
					for (var i = 0; i < film_favorite.length; i++) {
						if (film_favorite[i].id == self.data.filmDetail.id) {
							film_favorite.splice(i, 1)
							self.setData({
								isFilmFavorite: false
							})
						}
					}
					wx.setStorage({
						key: 'film_favorite',
						data: film_favorite,
						success: function (res) {
							console.log(res)
							console.log('----设置成功----')
						}
					})
				} else {
					// 添加
					film_favorite.push(self.data.filmDetail)
					wx.setStorage({
						key: 'film_favorite',
						data: film_favorite,
						success: function (res) {
							self.setData({
								isFilmFavorite: true
							})
						}
					})
				}
			}
		})
	}

})