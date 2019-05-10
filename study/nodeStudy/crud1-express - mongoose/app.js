var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')


var app = express()


// 读文件
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/',express.static('public'))

// 配置post表但提交
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// 配置模版引擎
app.engine('html', require('express-art-template'))


app.get('/',function(req,res){
  res.render('index.html')
})

// 把路由容器挂载到 app 服务中
app.use(router)

app.listen(3000, function () {
  console.log('running 3000...')
})

module.exports = app
