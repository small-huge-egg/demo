# node概述
- Node.js 是什么
  + JavaScript 运行时
  + 既不是语言，也不是框架，它是一个平台
- Node.js 中的 JavaScript
  + 没有 BOM、DOM
  + EcmaScript 基本的 JavaScript 语言部分
  + 在 Node 中为 JavaScript 提供了一些服务器级别的 API
    * 文件操作的能力
    * http 服务的能力
+ 核心模块
    * 核心模块是由 Node 提供的一个个的具名的模块，它们都有自己特殊的名称标识，例如
      - fs 文件操作模块
      - http 网络服务构建模块
      - os 操作系统信息模块
      - path 路径处理模块
      - 。。。。
    * 所有核心模块在使用的时候都必须手动的先使用 `require` 方法来加载，然后才可以使用，例如：
      - `let fs = require('fs')`
    * 也可以有用户自己编名的模块，例如：`require(./b.js)`。则在该js文件引入其他js文件，可以省略b后的'js'
    * 导出模块： exports,该模块导出一个对象，通过‘对象.方法’可以在其他地方调用该模块的方法
# CommonJS模块规范
## 使用 `require` 方法来加载模块
```
语法：let 自定义变量名称 = require(模块)
```
- 两个作用:
  * 执行被加载模块中的代码
  * 得到被加载模块中的exports导出接口对象
## 使用 `exports` 接口对象用来导出模块中的成员
* node中是模块作用域，默认文件中的所有成员只在当前文件模块起作用
* 对于希望让其他模块也用到的东西用exports导出
```
语法：
`b.js`
exports.add = function (x,y) { console.log(x+y) }
使用： var a = require('./b')
      a.add(2,4) // 6
```
## 使用 `module.exports` 接口对象用来导出模块中的成员
* exports是module.exports的一个引用
  * `module.exports===exports // true`
## exports 和 module.exports
* 导出多个成员：
```
module.exports = {}
或： exports.xxx = xxx
```
* 导出单个成员：
module.exports = xxx
# 作用域
* node没有全局作用域，只有模块作用域
# ip地址和端口号
* ip 地址用来定位计算机
* 端口号用来定位具体的应用程序，所有需要联网通信的应用程序都会占用一个端口号
# node文件
## 读文件
* 两个参数:
  - url
  - error:成功时为null
  - data:失败时为undefined

```javaScript
let fs = require('fs') // 加载文件模块

fs.readFile('1.txt',(error,data) => { // 读取文件
  console.log(data.toString()) // 成功则返回data，toString将二进制转为正常语言
})
```
## 写文件
* 第一个参数：文件路径
* 第二个参数：文件内容
* 第三个参数：回调函数(只有error这个形参)
```javaScript
let fs = require('fs')

fs.writeFile('1.txt','我时sha',(error) => {
  if(error) {
    console.log("文件写入失败")
  }else{
    console.log("文件写入成功")
  }
})
```
# http
* 监听 request 请求事件,两个参数：
  + request: 接收浏览器发送的请求
  + responce: 响应请求
    - response 对象有一个方法：write 可以用来给客户端发送响应数据，write 可以使用多次，但是最后一定要使用 end 来结束响应，否则客户端会一直等待
```javaScript
// 1. 加载 http 核心模块
var http = require('http')

// 2. 使用 http.createServer() 方法创建一个 Web 服务器
//    返回一个 Server 实例
var server = http.createServer()

// 3.监听 request 请求事件，设置请求处理函数
server.on('request', (request, response) => {
  console.log('收到客户端的请求了，请求路径是：' + request.url)

  response.write('hello')
  response.write(' nodejs')

  // 告诉客户端，我的话说完了，你可以呈递给用户了
  response.end()
})

// 3的另一种写法
server.on('request', function (req, res) {
  console.log('收到请求了，请求路径是：' + req.url)
  console.log('请求我的客户端的地址是：', req.socket.remoteAddress, req.socket.remotePort)

  // 根据不同的请求路径发送不同的响应结果
  // 1. 获取请求路径
  //    req.url 获取到的是端口号之后的那一部分路径
  //    也就是说所有的 url 都是以 / 开头的
  // 2. 判断路径处理响应

  var url = req.url

  if (url === '/') {
    res.end('index page')
  } else if (url === '/login') {
    res.end('login page')
  } else if (url === '/products') {
    var products = [{
        name: '苹果 X',
        price: 8888
      },
      {
        name: '菠萝 X',
        price: 5000
      },
      {
        name: '小辣椒 X',
        price: 1999
      }
    ]

    // 响应内容只能是二进制数据或者字符串
    // JSON.parse:转为数组  JSON.stringify：转为字符串
    res.end(JSON.stringify(products))
  } else {
    res.end('404 Not Found.')
  }
})

// 4. 绑定端口号，启动服务器
server.listen(3000, function () {
  console.log('服务器启动成功了，可以通过 http://127.0.0.1:3000/ 来进行访问')
})
```
* 在服务端默认发送的数据，其实是 utf8 编码的内容，但是浏览器不知道你是 utf8 编码的内容
  - 解决方法就是在 http 协议中，Content-Type 就是用来告知对方我给你发送的数据内容是什么类型
    - Content-Type对照表：(http://tool.oschina.net/commons) 
```
server.on('request', function (req, res) {
  let url = req.url
  if (url === '/plain') {
    // text/plain 就是普通文本 ,charset表示编码格式
    res.setHeader('Content-Type', 'text/plain', charset=utf-8')
    res.end('hello 世界')
  } else if (url === '/html') {
    // 如果你发送的是 html 格式的字符串，则也要告诉浏览器我给你发送是 text/html 格式的内容
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<p>hello html <a href="">点我</a></p>')
  }
})
```
# 模板引擎
* 目的：服务端也具有模版渲染的能力 
* 模版引擎不关心内容，只关心标记{{}}，模板引起最早就是诞生于服务器领域，后来才发展到了前端。

* 步骤： 
1. 安装 npm install art-template 
2. 在需要使用的文档模块中加载art-template，只需要使用require方法加载就可以了 `require(‘art-template’)`
3. 如下代码`template.render(data.toString(), {渲染的内容})`
```javaScript
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
]
http
  .createServer(function (req, res) { // 简写方式，该函数会直接被注册为 server 的 request 请求事件处理函数
  // 使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
  var parseObj = url.parse(req.url, true)

  // 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
  var pathname = parseObj.pathname
  if (pathname === '/') {
    fs.readFile('./views/index.html', function (err, data) {
      if (err) {
        return res.end('404 Not Found.')
      }
      var htmlStr = template.render(data.toString(), {
        comments: comments
      })
      res.end(htmlStr)
    })
  }
```
4. 
```
<ul class="list-group">
  {{each comments}}  // each是art-template模版语法
  <li class="list-group-item">{{ $value.name }}说：{{ $value.message }} <span class="pull-right">{{ $value.dateTime }}</span></li>
  {{/each}}
</ul>
```
- 服务端渲染和客户端渲染的区别
  + 客户端渲染不利于 SEO 搜索引擎优化
  + 服务端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的
  + 所以你会发现真正的网站既不是纯异步也不是纯服务端渲染出来的
  + 而是两者结合来做的
  + 例如京东的商品列表就采用的是服务端渲染，目的了为了 SEO 搜索引擎优化
  + 而它的商品评论列表为了用户体验，而且也不需要 SEO 优化，所以采用是客户端渲染
# url解析路径
* 步骤一：`var url = require('url')`
* 步骤二：`var parseObj = url.parse(req.url, true)`
  - 使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
* url.parse方法一：`var pathname = parseObj.pathname`
  * 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
* url.parse方法二：`var comment = parseObj.query`
  * 获取路径?后的内容
# 通过服务器让客户端重定向
* 1. 状态码statusCode设置为 302 临时重定向
* 2. 在响应头setHeader中通过 Location 告诉客户端往哪儿重定向
  * 如果客户端发现收到服务器的响应的状态码是 302 就会自动去响应头中找 Location ，然后对该地址发起新的请求，就能看到客户端自动跳转了
```
res.statusCode = 302 // 临时重定向
res.setHeader('Location', '/')
res.end()
```
# 如何加载模块
![](img/加载第三方模块.png)
# 修改完代码自启动
安装：`npm install --global nodemon`
使用：`nodemon 文件`
# express
* 安装：`npm install express --save`
* 使用：
```javaScript
var express = require('express')

var app = express()

app.get('/', function (req, res) {
  res.send('hd33djs')
})

app.listen(3000,function () {
  console.log("running.....")
})
```
## express 引入文件
* app.js: `app.use('/public/',express.static('public'))`
* 浏览器：`http://127.0.0.1:3000/public/css/main.css` 
## 在express中使用art-template模版引擎
* 官方文档：(https://aui.github.io/art-template/)
* 安装：`npm install --save art-template express-art-template`
* 配置模版引擎：
  `app.engine('art(默认文件后缀，通常改为html)', require('express-art-template'));`
* 使用：
```javaScript
app.get('/', function (req, res) {
  // express会默认从views文件目录去找index.html,
  // 如果想修改默认的views文件目录，app.set('vies',目录路径)
  res.render('index.html',{
    title: '哈哈'
  })
})
```
## 在express中获取表单get请求参数：
* `req.query`
## 在express中获取表单post请求参数：
* express没有提供post的api，但是有一个body-parser中间件,然后用req.body获取参数
* 安装： `npm install --save body-parser`
* 使用：
```javaScript
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.username)
})

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  // create user in req.body

// 我的写法：
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })) 
app.post('/post', function (req, res) {
  var comment = req.body
  comment.dateTime = '2019-05-01 06:11:22'
  comments.unshift(comment)
  res.redirect('/')
})
```
## 在express中使用路由
* var router = express('./router')
* `app.use(router)`
* 使用：
```java
// 1.app.js
var router = require('./router')
// 把路由容器挂载到 app 服务中
app.use(router)
// 2. router.js 创建一个路由容器
var express = require('express')
var router = express.Router()
router.get('/students', function (req, res) {})
module.exports = router
```