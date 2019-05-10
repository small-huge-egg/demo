/**
 * router.js 路由模块
 * 职责：
 *   处理路由
 *   根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，不要乱写
 * 我们划分模块的目的就是为了增强项目代码的可维护性
 * 提升开发效率
 */

var express = require('express')
var fs = require('fs')
var Student = require('./student')

var router = express.Router()

/*
 * 渲染学生列表页面
*/
router.get('/students',function (req,res) {
  Student.find(function (err, students) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('index.html', {
      fruits: [
        '苹果',
        '香蕉',
        '橘子'
      ],
      students: students
    })
  }) 
})

/*
 * 渲染学生列表页面
*/
router.get('/students/new', (req, res) => {
  res.render('new.html')
})

/*
 * 处理添加学生
 */
router.post('/students/new',(req, res) => {
  // 1. 获取表单数据
  // 2. 处理
  //    将数据保存到 db.json 文件中用以持久化
  // 3. 发送响应
  Student.save(req.body, function (err, students) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
})

/*
 * 渲染编辑学生页面
*/
router.get('/students/edit', (req, res) => {
  // 1. 在客户端的列表页中处理链接问题（需要有 id 参数）
  // 2. 获取要编辑的学生 id
  // 
  // 3. 渲染编辑页面
  //    根据 id 把学生信息查出来
  //    使用模板引擎渲染页面
  Student.findById(parseInt(req.query.id), function (err, student){
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('edit.html',{
      student: student
    })
  })
})

/*
 * 处理编辑学生
 */
router.post('/students/edit', function (req, res) {
  // 1. 获取表单数据
  //    req.body
  // 2. 更新
  //    Student.updateById()
  // 3. 发送响应
  Student.updateById(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
})


/*
 * 处理删除学生
 */
router.get('/students/delete',function (req,res) {
  Student.deleteById(req.query.id,function (err, students) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  }) 
})



module.exports = router