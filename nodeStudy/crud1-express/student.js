/**
 * student.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 *
 * 这里才是我们学习 Node 的精华部分：奥义之所在
 * 封装异步 API
 */

var fs = require('fs')

var dbPath = './db.json'

/**
 * 获取学生列表
 * @param  {Function} callback 回调函数
 */
exports.find = function (callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).students)
  })
}


/**
 * 根据 id 获取学生信息对象
 * @param  {Number}   id       学生 id
 * @param  {Function} callback 回调函数
 */
exports.findById = function (id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    let ret = students.find(function (item) {
      return item.id===parseInt(id)
    })
    callback(null, ret)
  })
}



/**
 * 添加保存学生
 * @param  {Object}   student  学生对象
 * @param  {Function} callback 回调函数
 */
exports.save = function (student,callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students

    // 自定义id作为唯一标识
    student.id = students[students.length-1].id + 1
    
    // 把用户传递的对象保存到数组中
    students.push(student)

    // 把对象数据转换为字符串
    var fileData = JSON.stringify({
      students: students
    })

    // 把字符串保存到文件中
    fs.writeFile(dbPath, fileData, (err) => {
      if (err){
        return callback(err)
      }
      callback(null)
    })
  })
}

/**
 * 更新学生
 */
exports.updateById = function (student,callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students

    
    // 注意：这里记得把 id 统一转换为数字类型
    student.id = parseInt(student.id)

    // 你要修改谁，就需要把谁找出来
    // EcmaScript 6 中的一个数组方法：find
    // 需要接收一个函数作为参数
    // 当某个遍历项符合 item.id === student.id 条件的时候，find 会终止遍历，同时返回遍历项
    let stu = students.find(function(item){
      return item.id === student.id
    })

    // 遍历拷贝对象
    for(let key in stu){
       stu[key]=student[key]
    }

    // 把对象数据转换为字符串
    let fileData = JSON.stringify({
      students: students
    })

    // 把字符串保存到文件中
    fs.writeFile(dbPath, fileData, (err) => {
      if (err){
        return callback(err)
      }
      callback(null)
    })
  })
}

/**
 * 删除学生
 */
exports.deleteById = function (id,callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students

    // findIndex 方法专门用来根据条件查找元素的下标
    let deleteId = students.findIndex(function(item){
      return item.id ===  parseInt(id)
    })

    students.splice(deleteId,1)

    // 把对象数据转换为字符串
    let fileData = JSON.stringify({
      students: students
    })

    // 把字符串保存到文件中
    fs.writeFile(dbPath, fileData, (err) => {
      if (err){
        return callback(err)
      }
      callback(null)
    })
  })
}
