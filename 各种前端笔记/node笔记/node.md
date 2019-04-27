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

```
let fs = require('fs') // 加载文件模块

fs.readFile('1.txt',(error,data) => { // 读取文件
  console.log(data.toString()) // 成功则返回data，toString将二进制转为正常语言
})
```
## 写文件
* 第一个参数：文件路径
* 第二个参数：文件内容
* 第三个参数：回调函数(只有error这个形参)
```
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
```
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