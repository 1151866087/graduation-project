import { apifilm } from "../config";
class HTTP {
    requset({ url, method = "GET", data = {} }) {
        return  new Promise((resolve, reject) => {
            wx.request({
                url: apifilm.base_url_api + url,
                data,
                method,
                header: {
                    'Content-Type': 'json'
                },
                success: res => {
                    //状态码 toString() 转成字符串
                    const statusCode = res.statusCode.toString();

                    if (statusCode.startsWith("2")) {
                        resolve(res.data)
                    } else {
                        this._show_error();
                    }
                },
                fail: res => {
                    reject(err);
                    this._show_error();
                }
            })
        })
    }
    _show_error() {
        wx.showToast({
            title: '网络错误',
            icon: 'none'
        })
    }
}
export { HTTP }