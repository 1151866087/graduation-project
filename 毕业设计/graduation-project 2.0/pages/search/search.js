// pages/search/search.js
import { FilmModel } from "../../models/film";
const filmModel = new FilmModel();
import { KeyWord } from "../../models/keyword"
const keyword = new KeyWord();
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
      hotKeyword: keyword.getHotKeyword(),
      hotTag:keyword.getHotTag(),
      films: [],
    })

    //当进入页面不是通过 tag 进入时  页面就展示top250的数据
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
      //发送tag的请求
      this._gettag(tag)
    }
  },
  
  //向输入框输入值时出发事件
  onConfirm(event) {
    wx.showLoading({
      title: '数据加载中',
    })
    let value = event.detail.value;
    console.log(value)
    //发送搜索请求
    filmModel.getFilmSearch(0, value).then(res => {
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
          // value,
          films:[]
        })
      }

    })
  },
  //触发 X 判断清除按钮是否出现
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
  //取消按钮  清除top250状态,转到搜索标签状态
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