import { FilmModel } from "../../models/film";
const filmModel = new FilmModel();
import { bannerList } from "../../config"
const app = getApp()
Page({
	data: {
		films: [],
		bannerList: bannerList
	},
	onLoad: function (options) {
		wx.showLoading({
			title: '数据加载中',
		})
		const films = wx.setStorageSync("comingsoon")
		if (films != "") {
			filmModel.getComingSoon(0).then(res => {
				this.setData({
					total: res.total,
					films: res.subjects
				})
				wx.setStorageSync("comingsoon", res.subjects)
				wx.hideLoading()
			})
		}
	},
	onReachBottom() {
		var start = this.data.films.length;
		if (start < this.data.total) {
			wx.showLoading({
				title: '数据加载中',
			})
			filmModel.getComingSoon(start).then(res => {
				let arr = this.data.films.concat(res.subjects)
				this.setData({
					films: arr
				})
				wx.setStorageSync("comingsoon", arr)
				wx.hideLoading()
			})			
		}
		else {
			wx.showToast({
				title: "没有更多数据了",
				icon: 'none'
			});
		}
	},
	viewFilmByTag(e) {
		console.log(1)
		var tag = e.detail.value;
		console.log(tag)
		
		wx.reLaunch({
			url: '/pages/search/search?tag=' + tag
		})
	},
})