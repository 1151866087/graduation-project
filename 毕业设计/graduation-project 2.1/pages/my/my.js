import {skinList} from  "../../config";
var app = getApp();
Page({
  data:{
    gridList: [
      {enName:'favorite', zhName:'收藏'},
      {enName:'history', zhName:'浏览记录'},
      {enName:'shake', zhName:'摇一摇'},
      {enName:'gallery', zhName:'相册'},
      {enName:'setting', zhName:'设置'}
    ],
    skin: ''
  },
  onLoad:(cb)=>{
    console.log(app.globalData.userInfo)
    // 检测是否存在用户信息
    if (app.globalData.userInfo != null) {
      this.setData({
          userInfo: app.globalData.userInfo
      })
    } else {
      app.getUserInfo()
    }
    typeof cb == 'function' && cb()
  },
  onShow:function(){
    var selft = this
    wx.getStorage({
      key: 'skin',
      success: res=>{
        if (res.data == "") {
          selft.setData({
            skin:skinList[11].imgUrl
          })
        } else {
          selft.setData({
            skin: res.data
          })
        }
      }
    })
  },
  // onPullDownRefresh: function() {
  //   this.onLoad(function(){
  //     wx.stopPullDownRefresh()
  //   })
  // },

  // 跳转页面 data.url 是data里定义的,  先全部渲染到页面,再从页面拿到相应的data.url
  viewGridDetail: function(e) {
    var data = e.currentTarget.dataset
		wx.navigateTo({
			url:data.url + '/' + data.url
		})
  },
  viewSkin: function() {
		wx.navigateTo({
			url: "skin/skin"
		})
  }
})