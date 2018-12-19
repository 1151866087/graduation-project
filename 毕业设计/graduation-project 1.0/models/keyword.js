import {HTTP} from "../util/http-p";
class KeyWord extends HTTP{
    getHistory() {
        const words = wx.getStorageSync('history')
        if (words) {
            return words
        } else {
            return [];
        }
    }
    addHistory(value) {
        var words = this.getHistory();
        const has = words.includes(value);
        if (value && !has) {
            if (words.length > 4) {
                words.pop()
            }
            words.unshift(value);
            wx.setStorageSync('history', words)
        }
    }
    getHotSearch() {
        const hotsearch = ['功夫熊猫', '烈日灼心', '摆渡人', '长城', '我不是潘金莲', '这个杀手不太冷', '驴得水', '海贼王之黄金城', '西游伏妖片', '我在故宫修文物', '你的名字'];
        return hotsearch;
    }
    // getKeyword(start,value){
    //     return this.request({
    //         url:`/book/search`,
    //         data:{
    //             start,
    //             q:value
    //         }
    //     })
    // }
}
export { KeyWord }