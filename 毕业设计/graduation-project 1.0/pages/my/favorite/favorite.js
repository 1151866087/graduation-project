var filmNullTip = {
  tipText: '亲，找不到电影的收藏',
  actionText: '去逛逛',
  routeUrl: '../../pages/popular/popular'
}
var personNullTip = {
  tipText: '亲，找不到人物的收藏',
  actionText: '去逛逛',
  routeUrl: '../../pages/popular/popular'
}
import { FilmModel } from "../../../models/film";
const filmModel = new FilmModel();
import { bannerList } from "../../../config"
const app = getApp()
Page({
  onLoad(){
    filmModel.getComingSoon(0).then(res => {
      this.setData({
        total: res.total,
        films: res.subjects
      })
    })
  }
})