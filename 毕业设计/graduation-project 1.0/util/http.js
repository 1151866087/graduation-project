
class HTTP {
  request(params) {
    if (!params.method) {
      params.method = "GET"
    }
    wx.request({
      url: 'https://api.douban.com/v2/movie/'+ params.url,
      data: params.data,
      method: params.method,
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        let statusCode = res.statusCode.toString();
        if (statusCode.startsWith("2")) {
          params.success(res.data);
        } else {
          wx.showToast({
            title: "网络错误",
            icon: "none"
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: "错误",
          icon: "none"
        })
      }
    })
  }
}
export {
  HTTP
}