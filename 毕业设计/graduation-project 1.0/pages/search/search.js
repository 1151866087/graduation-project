// pages/search/search.js
import { FilmModel } from "../../models/film";
const filmModel = new FilmModel();
import { KeyWord } from "../../models/keyword"
const keyword = new KeyWord();
import { SearchModel } from "../../models/search";
const searchModel = new SearchModel();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    films: [],
    words: [],
    isClear: false,
    isSearch: true,
    /* 是否显示空搜索结果*/
    isResult: false,
    /* 给输入框默认值 */
    value: "",
    /* 设置loading的状态 */
    isLoading: false

  },
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载中',
    })
    const tag = options.tag;
    this.setData({
      words: keyword.getHistory(),
      hots: keyword.getHotSearch(),
      films: [],
    })
    if (tag == undefined) {
      filmModel.getTop250(0).then(res => {
        this.setData({
          films: res.subjects,
          total: res.total
        })
        wx.setStorageSync("top250", res)
        wx.hideLoading()
      })
    }
    else {
      this._gettag(tag)
    }
  },
  onConfirm(event) {
    wx.showLoading({
      title: '数据加载中',
    })
    let value = event.detail.value;
    console.log(value)
    searchModel.getFilmSearch(0, value,res => {
      //如果搜索内容存在
      console.log(res)
      if (res.total) {
        keyword.addHistory(value);
        let words = keyword.getHistory();
        this.setData({
          words,
          films: res.subjects,
          isSearch: true,
          value: value,
          isResult: false,
          total: res.total
        })
        wx.hideLoading()
      } 
      else {
        wx.showToast({
          title: '抱歉为空',
          icon: 'none'
        })
        this.setData({
          isSearch: true,
          isResult: true,
          value,
          films:[]
        })
      }

    })
  },
  onInput(event) {
    const value = event.detail.value;
    if (value) {
      this.setData({
        isClear: true
      })
    } else {
      this.setData({
        isClear: false
      })
    }
  },
  onClear() {
    this.setData({
      value: "",
      isResult: false,
      isSearch: false,
      isClear: false,
      films: []
    })
  },
  viewFilmByTag(e) {
    const tag = e.detail.value;
    this._gettag(tag)
  },
  //得到tag的数据
  _gettag(tag) {
    filmModel.getFilmTag(tag, 0).then(res => {
      this.setData({
        films: [],
        films: res.subjects,
        isSearch: true,
        value: tag,
        isClear: true,
        tagtitle: tag
      })
      wx.setStorageSync(tag, res);
      wx.hideLoading()
    })
  },
  //下拉加载更多数据
  onReachBottom() {
    var start = this.data.films.length;
    if (start < this.data.total) {
      wx.showLoading({
        title: '数据加载中',
      })
      if (this.data.tagtitle == this.data.value) {

        filmModel.getFilmTag(this.data.tagtitle, start).then(res => {
          let arr = this.data.films.concat(res.subjects)
          this.setData({
            films: arr
          })
          wx.setStorageSync(tag, arr)
        })
      }
      else {
        filmModel.getTop250(start).then(res => {
          let arr = this.data.films.concat(res.subjects)
          this.setData({
            films: arr
          })
          wx.setStorageSync("top250", arr)
          wx.hideLoading()
        })
      }
    }
    else {
      wx.showToast({
        title: "没有更多数据了",
        icon: 'none'
      });
    }
  },
})