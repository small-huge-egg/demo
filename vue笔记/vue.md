# v-cloak
![](./img/cloak.png)
# v-text
![](./img/v-text.png)
# v-html
![](./img/v-text,v-html.png)
### v-text和v-html都会覆盖掉原来的内容
# v-bind属性绑定指令
### v-bind 简写为":要绑定的变量名"。只能单向绑定，不能双向
### v-bind:属性，如
    <input type="button" v-bind:title="变量名">
#### v-bind对于class的设置
![](./img/v-bindclass.png)
# v-model实现数据双向绑定
![](./img/v-model.png)
### 可运用在计算器
# v-on事件绑定机制
### bind绑定的变量写在data中，on绑定的是事件，写在methods中，缩写“@”
![](./img/v-onclick.png)
## v-on的事件缩写
![](./img/v-on缩写.png)
# v-for循环
![](./img/v-for.png)
### 使用v-for时如果有问题注意规定 key值，且必须是in后面的东西的内容之一，且必须为字符串/数字
![](./img/v-forkey.png)
# 过滤器
### 语法：[内容|过滤器名称（可加参数，可有多个过滤器）]
> 全局过滤器

![](./img/fliter.png)
![](./img/filter2.png)

> 私有过滤器

![](./img/私有过滤器.png)
# 按键修饰符
### 系统自带的有@keyup.enter/tab/delete/.esc/space/up/down/left/right
### 自定义全局按键修饰符方法：
    Vue.config.keyCodes.f2=113;
# 自定义全局指令，钩子函数
> 自定义全局指令：

![自定义全局指令](./img/自定义全局指令.png)
> 自定义私有指令：

![自定义私有指令](./img/定义私有指令.png)

> 指令简写：

![指令简写](./img/指令简写.png)
# 生命周期
![指令简写](./img/lifecycle.png)
# 动画
### 钩子函数自定义动画，此时可分别设置进入动画与离开动画
![](./img/动画1.png)

![](./img/动画2.png)

![](./img/动画done.png)
### 局部动画与全局动画，此时进入动画与离开动画只能是一样的
![](./img/动画3.png)
![](./img/动画4.png)
### 当用v-for循环渲染元素时，要想新增的元素也有动画，方法transition-group：
![](./img/循环设置动画.png)
### v-move和v-leave-active
#### 他们跟v-enter一样，只用在style中设置就行，不用添加到标签里
![](./img/v-move和v-leave-active.png)
### appear和tag.png
![](./img/appear和tag.png)
# 组件
## 创建组件的麻烦方法
![](./img/组件1.png)
## 创建组件的不太麻烦方法
![](./img/组件2.png)
## 创建组件的日常简单方法

![](./img/组件3.png)
## 创建组件的日常简单且有提示的方法
![](./img/组件4.png)
## 定义内部私有组件
### 天下方法一大家，私有组件，私有过滤器，私有指令，都是统一和methods使用一样的，且内部第一个总是名字。
![](./img/定义私有组件.png)
## 注意：
### 不论是以哪种方式创建的组件，组建的template属性指向的模版内容必须有一个根标签
![](./img/组件data.png)
## 解析组件里的data
### 组件里的data必须是一个function,且必须返回一个对象，这是为什么呢？因为当页面有多个相同组件时，为了避免他们的数据因为其中一个组件变化而变化，在每次调用组建时，通过data这个function，使每个组件都要运行一下，从而刷新组件定义的属性，质疑为什么要返回一个对象，也是为了避免数据同步变更
## 组件切换
> 只能切换两个组件

![](./img/组件切换1.png)

> 能切换多个组建（:is="组建名字"）

![](./img/组件切换2.png)

> 组建切换的动画效果

![](./img/组件切换-动画.png)
## 子组件引用父组件的属性
### 需要在父组件com1上写
    <com1 v-bind:属性="要引用的变量"></com1>
    <com1 v-bind:parentmsg="msg"></com1>
![](./img/prop.png)
## 父组件把方法传递给子组件
### @fun=""
# ref获取dom对象,也可用于父组件调用子组件
![](./img/ref.png)
# 总结：
    vue提供的标签：component(专门用来实现组件切换),template,transition,transition-group
# router路由
![](./img/路由1.png)
![](./img/路由2.png)
## 设置默认路由（redirect重定向）
![](./img/路由3.png)


