var http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var musicdata = require('./music/data.js');

app.use('/public/', express.static('./public/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    next()
})
app.get('/music/:id', function (req, res) {
    console.log(req.params.id)
    if (req.params.id < musicdata.length + 1) {
        res.send(musicdata[req.params.id - 1])
    }
    else {
        res.send('没有更多数据')
    }
})


app.listen(3000, function () {
    console.log('http is running');
})

