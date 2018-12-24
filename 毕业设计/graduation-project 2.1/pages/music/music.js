//index.js
//获取应用实例
import { Music } from "../../models/music";
const music = new Music();
// import { LikeModel } from "../../models/like";
// const likeModel = new LikeModel();
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    music: {},

    /* 定义是否为最新的一期 */
    isFirst: false,
    /* 是否为第一期 */
    isLatest: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = 5;
    music.getDetail(id).then(res => {
      this.setData({
        like:res.like_status,
        count:res.fav_nums,
        music: res,
      })
    })
  },
  
  // //获取组件中的传值
  // onLike(e) {
  //   var behavior = e.detail.behavior;
  //   var id = this.data.classic.id;
  //   var type = this.data.classic.type;
  //   likeModel.getLike(behavior, id, type);
  // },
  /* 上一期向👉 */
  onPrev() {
    var id = this.data.music.id;
    if(id>1){
      console.log(id)
      music.getDetail(id-1).then(res => {
        this.setData({
          like:res.like_status,
          count:res.fav_nums,
          music: res,
          isLatest:false
        })
      })
      if(id==2){
        this.setData({
          isFirst:true
        })
      }
    }
    
  },
  /* 下一期👈 */
  onNext() {
    var id = this.data.music.id;
    if(id<5){
      console.log(id)
      music.getDetail(id+1).then(res => {
        this.setData({
          like:res.like_status,
          count:res.fav_nums,
          music: res,
          isFirst:false
        })
      })
      if(id==4){
        this.setData({
          isLatest:true
        })
      }
    }
  },
  /* 获取数据 */
  _updateData(nextOrprevious) {
    /* 调用models里的获取 缓存或发送http */
    music.getDetail(this.data.classic.index, nextOrprevious, res => {
      /* 更新点赞的状态 */
      /* 
      likeModel.getLikeStatus(res.type,res.id,res=>{
        this.setData({
          like:res.like_status,
          count:res.fav_nums
        })
      }) 
      */
      this.setData({
        classic: res,
        //更新是否为第一期的状态
        isFirst: music.isFirst(res.index),
        //更新是否为最新期的状态
        isLatest: music.isLatest(res.index)
      })
      console.log(res.index)
      // wx.setStorageSync('classic' + res.index, res)
    })
  },
  onShareAppMessage(){
    console.log(1)
  }
})