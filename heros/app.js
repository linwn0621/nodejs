// 引入模块
const http = require('http')
const fs = require('fs')
const path = require('path')
const urlModel = require('url')
const querystring = require('querystring')
const template = require('art-template')


//创建服务器对象
let app = http.createServer();



//监听端口
app.listen(3008, () => {
    console.log('server is running at http://127.0.0.1:3008');
})

//注册事件，监听请求
app.on('request', (req, res) => {
    let method = req.method;
    let urlObj = urlModel.parse(req.url, true)
    let pathname = urlObj.pathname

    if (method == 'GET' && (pathname == '/' || pathname == "/index" || pathname == "/index.html")) {
        fs.readFile(path.join(__dirname, './views/index.html'), 'utf-8', (err, data) => {
            fs.readFile(path.join(__dirname, './hero.json'), 'utf8', (err, data) => {
                if (err) return console.log(err.message);
                let herosArr = JSON.parse(data)
                let obj = {
                    data: herosArr
                }
                let str = template(path.join(__dirname, './views/index.html'), obj)
                res.end(str);
            })
        })
    } else if (method == 'GET' && pathname == '/add.html') {
        // fs.readFile(path.join(__dirname, './views/add.html'), 'utf8', (err, data) => {
        //     if (err) return console.log(err.message);
        //     res.end(data);
        // })
        // 使用模板渲染页面
        let str = template(path.join(__dirname, './views/add.html'),{});
        res.end(str);

    } else if (method == 'GET' && pathname == '/info.html') {
        fs.readFile(path.join(__dirname, './views/info.html'), 'utf8', (err, data) => {
            if (err) return console.log(err.message);
            res.end(data);
        })
    } else if (method == 'GET' && pathname == '/edit.html') {
        fs.readFile(path.join(__dirname, './views/edit.html'), 'utf8', (err, data) => {
            if (err) return console.log(err.message);
            res.end(data);
        })
    } else if (method == 'GET' && pathname == '/node_modules/bootstrap/dist/css/bootstrap.css') {
        fs.readFile(path.join(__dirname, './node_modules/bootstrap/dist/css/bootstrap.css'), 'utf8', (err, data) => {
            if (err) return console.log(err.message);
            res.end(data);
        })
    } else if (method == 'GET' && pathname == '/node_modules/jquery/dist/jquery.js') {
        fs.readFile(path.join(__dirname, '/node_modules/jquery/dist/jquery.js'), 'utf-8', (err, data) => {
            if (err) return console.log(err.message);
            res.end(data);
        })
    } else {
        let obj = {
            code: 404,
            msg: '页面不存在，拜拜'
        }
        res.end(JSON.stringify(obj))
    }
})