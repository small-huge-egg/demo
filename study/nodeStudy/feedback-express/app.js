var express = require('express')
var bodyParser = require('body-parser')


var app = express()

var comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]

// 读文件
app.use('/public/',express.static('public'))
// 配置post表但提交
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 配置模版引擎
app.engine('html', require('express-art-template'))


app.get('/', function (req, res) {
  // express会默认从views文件目录去找index.html,
  // 如果想修改默认的views文件目录，app.set('views',目录路径)
  res.render('index.html',{
    comments: comments
  })
})
app.get('/post', function (req, res) {
  res.render('post.html')
})
app.post('/post', function (req, res) {
  var comment = req.body
  comment.dateTime = '2019-05-01 06:11:22'
  comments.unshift(comment)
  res.redirect('/')
})

app.listen(3000,function () {
  console.log("running.....")
})