// 引入模块
const http = require('http')
// const fs = require('fs')
// const path = require('path')
// const urlModel = require('url')
const querystring = require('querystring')
// const template = require('art-template')
let bind = require('./bind')
let router = require('./router.js')
//创建服务器对象
let app = http.createServer();



//监听端口
app.listen(3008, () => {
    console.log('server is running at http://127.0.0.1:3008');
})

//注册事件，监听请求
app.on('request', (req, res) => {
    bind(req, res);
    router(req, res)
    // function bind(req, res) {
    //     res.rander = function name(name, obj) {
    //         let str = template(path.join(__dirname, './views/' + name + ".html"), obj);
    //         res.end(str);
    //     }
    // }
})