var http = require('http');
var fs = require('fs');

var localData = require('./music/data.js');
var music = require('./music/data.js')
http
    .createServer(function (req, res) {
        //将 localData 转化为 string 渲染到页面
        /* 服务端解决的问题 */
        //1. 用setHeader解决中文乱码
        //2. 图片路径问题
        //3. 跨域问题
        //url：统一资源定位符

        /* 数据来源一定，直接将数据输出 */
        if (req.url === '/music/') {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end(JSON.stringify(localData.data));
        }
        else if (req.url === '/music/' ) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end(JSON.stringify(music.data));
        } 
        /* 如用id查找用这种 前面不一样通过后面的条件不同获取不同数据*/
        else if (req.url.indexOf('/images/') === 0) {
            fs.readFile('.' + req.url, function (err, data) {
                res.end(data);
            })
        }
    })
    .listen(3000, function () {
        console.log('http is running');
    })