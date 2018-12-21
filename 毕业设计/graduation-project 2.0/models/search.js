import { HTTP } from "../util/http";
class SearchModel extends HTTP {
    /* 获取搜索结果 */
    getFilmSearch(start, value) {
        this.request({
            url:"search?q=" + value + "&start=" + start + "&count=20"
        })
        success:res =>{
            callback(res)
        }
    }


}
export {
    SearchModel
}