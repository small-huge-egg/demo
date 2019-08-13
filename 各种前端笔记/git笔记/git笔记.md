
git客户端工具
* 1.安装git工具
* 2.任意目录下右键 点击git bash here，在黑窗口中输入
	* ` git config --global user.name "veb"`
	* `git config --global user.email "944538864@qq.com"`
   

如何让git控制本地文件(创建本地仓库)
*  1.创建目录 右键git bash here 
*  2.输入 git init 创建本地仓库
*  3.添加完新文件之后（修改文件之后）
* 4.git bash here     输入 ` git add .  `  然后输入` git commit -m "我添加了新内容"`

跟github账号建立关联
*  1.打开git命令行窗口输入ssh-keygen -t rsa -C "214834605@qq.com"
*  2.打开administrator目录，下面有一个.ssh目录，打开此目录下id_rsa.pub文件，复制内容
*  3.进入github账号，设置，添加ssh key
*  至此，本台电脑才有资格跟github进行数据传输

本地库跟远程库建立关联
-  1.在本地库目录下打开git命令行窗口 输入 `git remote add origin git@github.com:Veblen007/Veblen007.github.io.git`
+  2.传数据:先执行 `git pull origin master `然后执行` git push origin master` 数据就能成功到达远程

检查秘钥连接成功:ssh -T git@github.com
解决秘钥失效:ssh-keyscan -H github.com>>~/.ssh/known_hosts

忽略某些文件:在目录下创建一个不带文件名的后缀为.gitignore的文件
在里面添加需要忽略的文件名
命令为type nul>.gitignore

回退到之前的版本(commit之后的操作)
* git log 查看每个版本号(reflog)
* git reset -hard 版本号 
* git reset --hard (hard^^回退两个版本或者 hard~2)回退到上一个版本

查看区别
* git diff
* git checkout -- index.txt 回到没有修改的状态(在工作区的修改全部撤销)回到最近一次 git commit 或者 git add 的状态

删除版本库中的
* git rm index.txt 
* 之后再 git commit -m "删除了**"

![](./img/报错.JPG)
![](./img/添加远程库.JPG)

# 命令行总汇总
先拉再推可以解决很多不必要的问题

* git init 初始化目录
* git add . 添加所有文件
* git commit -m ""  添加说明
* git status 查看没有被记录的文件
* 
* type nul> .gitignore 创建想要被忽略文件配置空* 名文件
* git log 得到版本历史记录
* git reflog 得到操作历史记录
* git reset --hard HEAD^ 回退上一个版本
* git reset --hard 后跟id编号  回退对应版本
* git diff HEAD -- 文件名  查看当前文件与版本库* 存的文件有什么区别
* git checkout -- 文件名 把当前文件添加的修改全* 部撤销 （让当前文件回到
* 最近一次git commit 或git add 时的状态） 
* git rm 文件名   删除文件  删除之后需要执行一* 下 git commit  
* ssh-keygen -t rsa -C "214834605@qq.com"  生* 成秘钥跟github账号建立关联 
* git remote add origin 
* git@github.com:Veblen007/* Veblen007.github.io.git 本地库与远程库建立关联 
* git pull origin（远程库名）master（主分支）:  远程库拉到本地库
* git push origin（远程库名）master（主分支） : 向远程库推文件
* git clone 仓库地址(在clone or download那可以* 拿到)
* git branch: 查看分支 
* git branch 分支名: 创建分支 
* git checkout 支名: 跳转到某个枝头
*  git checkout -b 支名: 创建并跳转到某分支
* git merge dev : 将dev分支合并到当前分支+
* git merge 枝名: 与当前的合并
* git branch -d 枝名: -删除某个枝头