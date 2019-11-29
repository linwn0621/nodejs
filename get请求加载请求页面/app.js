// 引入模块
var fs = require("fs");
var http = require("http");
var path = require("path");
var urlMode = require("url");
// 创建服务
var server = http.createServer();
// 服务端口监听
server.listen(5006, () => {
    console.log("http://127.0.0.1:5006");

});
// 服务请求
server.on("request", (req, res) => {
    // 请求方式
    var method = req.method;
    // 请求地址
    var url = req.url;
    let userurl = urlMode.parse(url, true)
    var pathname = userurl.pathname
    // query里面存储着get方式传递过来的数据或参数
    var query = userurl.query
    // 判断读取文件

    if (method == "GET" && url == "/") {
        fs.readFile(path.join(__dirname, "./view/user.html"), "utf8", (err, data) => {
            if (err) {
                return console.log(err.message);
            }
            res.end(data);
        })
    } else if (method == 'GET' && pathname == '/submit') {

        fs.readFile(path.join(__dirname, "./user.json"), "utf8", (err, data) => {
            if (err) {
                return console.log(err.message);
            }
            // console.log(query);
            // res.end(data);
            var arr = JSON.parse(data);
            arr.push(query);
            console.log(arr);
            // var str = JSON.stringify(arr)
            // 写入
            fs.writeFile(path.join(__dirname, "./user.json"), JSON.stringify(arr), (err, data) => {
                if (err) {
                    return console.log(err.message);
                }
                res.writeHeader(200, {
                    // 告诉浏览器以什么样的方式来解析服务器端响应回去的数据
                    'Content-type': 'text/plain;charset=utf-8',
                    // 告诉浏览器,在2秒后进行一个跳转,路径就是url的路径
                    'refresh': '2;url=/register'
                })
                res.end(JSON.stringify({
                    "code": 0,
                    "msg": "提交成功"
                }))
            })
        })
    } else if (method == 'GET' && pathname == '/jquery-1.12.4.js') {
        fs.readFile(path.join(__dirname, '/jquery-1.12.4.js'), 'utf-8', (err, data) => {
            if (err) return console.log(err.message);
            res.end(data);
        })
    } else if (method == 'GET' && pathname == '/login') {
        fs.readFile(path.join(__dirname, "user.json"), "utf8", (err, data) => {
            if (err) return console.log(err.message);

            var arr1 = JSON.parse(data);
            console.log(query);
            arr1.push(query);
            fs.writeFile(path.join(__dirname, "user.json"), JSON.stringify(arr1), (err, data) => {
                if (err) return console.log(err.message);
                res.writeHeader(200, {
                    'Content-Type': 'text/plain;charset=utf-8'
                });
                let obj = {
                    code: 200,
                    msg: "注册成功"
                };

                res.end(JSON.stringify(obj));
            })
        })

    } else {
        res.writeHeader(200, {
            'Content-Type': 'text/plain;charset=utf-8'
        });
        let obj = {
            code: 404,
            msg: "找不到"
        };

        res.end(JSON.stringify(obj));
    }

})