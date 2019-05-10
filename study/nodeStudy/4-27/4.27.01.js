let fs = require('fs')

fs.writeFile('1.txt','我时sha45',(error) => {
  if(error) {
    console.log("文件写入失败")
  }else{
    console.log("文件写入成功")
  }
})