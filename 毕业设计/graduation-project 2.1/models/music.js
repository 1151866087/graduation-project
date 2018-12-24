import { HTTP } from "../util/music";
class Music extends HTTP {
    getDetail(id) {
        return this.requset({
            url: id
        })
    }
}
export {
    Music
}