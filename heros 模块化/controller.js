// 1.引入依赖模块
const fs = require('fs')
const path = require('path')

let bind = require('./bind.js')
// 2.业务处理方法
// let constroller = {

// }
module.exports = {
    // 1.显示index页面
    showIndexPage(req, res) {
        fs.readFile(path.join(__dirname, './views/index.html'), 'utf-8', (err, data) => {
            fs.readFile(path.join(__dirname, './hero.json'), 'utf8', (err, data) => {
                if (err) return console.log(err.message);
                let herosArr = JSON.parse(data)
                let obj = {
                    data: herosArr
                }

                res.rander("index", obj)
            })
        })
    },
    // 2.显示编辑页面
    showEditPage(req, res) {
        res.render('edit', {})
    },
    // 3.显示info页面
    showInfoPage(req, res) {
        res.render('info', {})
    },
    // 4.显示add页面
    showAddPage(req, res) {
        res.render('add', {})
    },
    loadStaticSource(req, res) {
        //第一：我们要确定加载的是静态资源
        fs.readFile(path.join(__dirname, res.pathname), 'utf8', (err, data) => {
            if (err) return console.log(err.message);
            if (res.pathname.endsWith('.css')) {
                //设置响应头
                res.writeHeader(200, {
                    'Content-Type': 'text/css;charset=utf-8'
                })
            }
            res.end(data);
        })
    }
}

// 3.暴露方法

// module.exports = constroller;