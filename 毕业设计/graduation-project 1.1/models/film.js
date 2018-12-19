import { HTTP } from "../util/http-p";
class FilmModel extends HTTP {
    getInTheaters(start) {
        return this.requset({
            url: "in_theaters" + "?start=" + start + "&count=20"
        })
    }
    getTop250(start) {
        return this.requset({
            url: "top250" + "?start=" + start + "&count=20"
        })
    }
    getComingSoon(start) {
        return this.requset({
            url: "coming_soon" + "?start=" + start + "&count=20"
        })
    }
    getFilmDetail(id) {
        return this.requset({
            url: "subject/" + id 
        })
    }
    getFilmTag(tag,start) {
        return this.requset({
            url: "search?tag=" + tag + "&start=" + start + "&count=20"
        })
    }
    /* 获取搜索结果 */
    getFilmSearch(start, value) {
        return this.requset({
            url: "search?q=" + value + "&start=" + start + "&count=20"
        })
    }

}
export {
    FilmModel
}