// pages/my/history/history.js
var filmNullTip = {
  tipText: '亲，找不到电影的浏览记录',
  actionText: '去逛逛',
  routeUrl: '../../popular/popular'
}
import { bannerList } from "../../../config";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    film_history: [],
    show: 'film_history',
    nullTip: filmNullTip
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options){
    var that = this
    wx.getStorage({
      key: 'film_history',
      success: function(res){
        that.setData({
          film_history: res.data
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})