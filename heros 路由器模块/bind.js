// 1.引入依赖模块
const template = require('art-template')
const path = require('path')

// 2.定义模块中方法
function bind(req, res) {
    res.rander = function (filename, obj) {
        let str = template(path.join(__dirname, './views/' + filename + '.html'), obj)
        res.end(str)
    }
}


// 3.将这个模块中的方法暴露出去
module.exports = bind;