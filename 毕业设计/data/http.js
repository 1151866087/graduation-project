var http = require('http');
var fs = require('fs');
var localData = require('./movie/top250/top250.js')
http
    .createServer(function (req, res) {
        if (req.url === '/movie/top250') {            
            // res.setHeader('Access-Control-Allow-Origin', '*')  //跨域代码
            // res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            fs.readFile( req.url, function (err, data) {
                res.end(JSON.stringify(localData))
                /* http://127.0.0.1:3000/movie/top250 */
            })
            
        } else if (req.url === '/') {
            res.setHeader('Access-Control-Allow-Origin', '*')  //跨域代码
            res.end('111')
        }
        else if (req.url.indexOf('/images/') === 0) {
            fs.readFile('.' + req.url, function (err, data) {
                res.end(data)
            })
        }
    })
    .listen(3000, function () {
        console.log("http is runing")
    })