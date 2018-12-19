import { FilmModel } from "../../models/film";
const filmModel = new FilmModel();
import { KeyWord } from "../../models/keyword"
const keyword = new KeyWord();
const app = getApp();
// components/book/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    topMore: {
      type: Number,
      observer: "onPull"
    },
    bottomMore: {
      type: Number,
      observer: "onBottom"
    },
    // tag:{
    //   type:Object,
    // }
  },
  data: {
    films: [],
    isClear: false,
    isSearch: false,
    /* 是否显示空搜索结果*/
    isResult: false,
    /* 给输入框默认值 */
    value: "",
    /* 设置loading的状态 */
    isLoading: false
  },

  /**
   * 组件的初始数据
   */


  /**
   * 组件的方法列表
   */
  methods: {
    onConfirm(event) {
      console.log(1)
      wx.showLoading({
        title: '数据加载中',
      })
      let value = event.detail.value;
      console.log(value)
      filmModel.getFilmSearch(0, value).then(res => {
        //如果搜索内容存在
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
        } else {
          wx.showToast({
            title: '抱歉为空',
            icon: 'none'
          })
          this.setData({
            isSearch: true,
            isResult: true,
            value
          })
        }

      })
      wx.hideLoading()
    },
    onInput(event) {
      const value = event.detail.value;
      console.log(value)
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
    onShow(){
      const tag = wx.getStorageSync('tag')
      console.log(tag)
      this.setData({
        films:tag,
      })
    }
  },
  /* //这个问题想通了，是因为组件attached和ready的时候 properties的属性还没有被赋值吗？ 如果是 我的需求想要对properties的两个属性进行运算得到一个新的值显示在页面上 */
    
  attached() {
    
    this.setData({
      words: keyword.getHistory()
    })
    this.setData({
      hots: keyword.getHotSearch()
    })
  }
})
