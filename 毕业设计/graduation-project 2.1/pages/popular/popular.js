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
			title: '数据加载中'
		})
		const films = wx.setStorageSync("intheaters")
		if (films != "") {
			filmModel.getInTheaters(0).then(res => {
				this.setData({
					total: res.total,
					films: res.subjects
				})
				wx.setStorageSync("intheaters", res.subjects)
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
			filmModel.getInTheaters(start).then(res => {
				let arr = this.data.films.concat(res.subjects)
				this.setData({
					films: arr
				})
				wx.setStorageSync("intheaters", arr)
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
		var tag = e.detail.value;
		wx.reLaunch({
			url: '/pages/search/search?tag=' + tag
		})
	},
	viewBannerDetail(e){
		var id = e.currentTarget.dataset.id;
		wx.navigateTo({
		  url: '../film-detail/film-detail?id='+id,
		})
	}
})