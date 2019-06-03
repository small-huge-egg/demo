# 第二个
## 导航栏：
    ul{
        list-style-type:none;
    }
    li{
        display:inline;
    }
    a{
        text-decoration:none;
    }
## 表格：
    table{
        border-collapse:collapse;
    }
## 表单：
![baidu](表单.png)

    table{
        float:left;
        width:35%;
        text-align:right;
    }
# 第四个
## 居中
### 字体(内容)居中
![中](字体居中.png)
#### table-cell法：此方法需要设置长度，不然就是元素长度
    .center{
        width:250px;
        height:250px;
        background: red;
        *display:table-cell;//相当于tr
        *vertical-align: middle;//使内容垂直居中
        *text-align:center;//使内容水平居中
    }
    <div class="center">垂直居中</div>
#### table-cell法：此方法需要设置长度，不然就是元素长度(水平居中)
    .center{
        display:table;
        margin:0 auto;
    }    
#### display:flex法:此方法需要知道高才能垂直居中
    .center{
        *display:flex;//不可轻易设置
        *justify-content:center;//使内容水平居中，和flex一块用才居中
        *align-items:Center;//使内容垂直居中，同上
    }
### div块居中
#### 绝对定位和负边距法(前提知道宽高)：
    .center{
        *position:absolute;
        *top:50%;
        *left:50%;
        /*margin-left:-100px;
        *margin-top:-50px;/也可改为transform:translate(-50%,-50%)
        width:200px;
        height:100px;
        background:green;
    }
    <div class="center">垂直居中</div>
#### 绝对定位和0(不用知道宽高):
    .center{
       *position:absolute;
       *top:0;left:0;bottom:0;right:0;
       *margin:auto;//此属性在相对定位中无效
        width:50%;
        height:50%;
        background:green;
        .time-show:nth-child(2)
    }
# 第八个
## 固定盒子大小
    container{
        box-sizing:border-box;
        //设置他以后，相当于以怪异模式解析，border和padding全会在你设置的宽度内部，比如手机端设置两行并且的布局，宽度各为50%,如果不用这个属性，设置border后右边的div会下来错位，设置这个属性，宽度还是50%而不是50%+*px,两行可以并列显示
    }
## 响应式网格（栅格化）布局
### 不设置宽度具体大小，设置百分比。
    css:
    @media (min-width:769px){
        .col-mi-1{
                width: calc(8.333% - 22px);
        }//这里用col前缀，当宽度大于769时显示
        
    @media (max-width:768px){
        .col-mi-1{
                width: calc(15% - 22px);
        }//这里用col前缀，当宽度小于769时显示
        
# 第九个
## justify-content: space-between：使每个子盒子左右均分在大盒子里面，用此主要免于设置小盒子间边距。
## 表格
    border="2"//合并单元格
    colspan="3"//表格合并列
    rowspan="3"//表格合并行
![中](表格.png)
# 第十个
## flexbox布局
##### flexbox包含父元素flex container和子元素flex items属性
### 6个属性设置在容器上，即flex container：
* flex-direction
* flex-wrap
* flex-flow
* justify-content
* align-items
* align-content
#### 1.display
    display: flex | inline-flex;
#### 2.flex-direction
##### 决定项目的*排列方向*
    .box{
        flex-direction:row;//默认值，主轴在从左向右排列
        flex-direction:row-reverse;//主轴从右向左排列
        flex-direction:column;//主轴从上到下排列
        flex-direction:column-reverse;//主轴从下到上排列
    }
![中](flex-direction.png)
#### 2.flex-wrap
##### 决定如果一行排列不下*如何换行*
    .box{
        flex-wrap:nowrap//默认，撑死不换行
        flex-wrap:wrap//换行，第一行在上方
        flex-wrap:wrap-reverse//换行，第一行在下面
    }
![nowrap](nowrap.png)
![wrap](wrap.jpg)
![wrap-reverse](wrap-reverse.jpg)
#### 3.flex-flow
##### 此属性是flex-direction属性和flex-wrap属性的*简写*，默认值为row nowrap
    flex-flow: row nowrap//以此类推其他值
![中](flex-flow.png)
#### 4.justify-content
##### 此属性定义项目在主轴上的*对齐方式* 
    .box{
        justify-content:flex-start//默认，左对齐
        justify-content:flex-end//右对齐
        justify-content:center//居中
        justify-content:space-between//两端对齐，项目之间的间隔都相等。
        justify-content:space-around//每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
    }
![中](justify-content.png)
#### 5.align-content
##### 定义/*多根轴线的对齐方式*/。如果项目只有一根轴线，该属性不起作用
    .box {
        align-content:flex-start//与交叉轴起点对齐
        align-content:flex-end//与交叉轴终点对齐
        align-content:center//与交叉轴中点对齐
        align-content:space-between//与交叉轴两端对齐，轴线之间的间隔平均分布
        align-content:space-around//每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
        align-content:stretch//默认，轴线占满整个交叉轴。
    }
![中](align-content.png)
#### 6.align-items
##### 定义项目*在交叉轴上如何对齐*
    .box {
    align-items:flex-start//与交叉轴的起点对齐
    align-items:flex-end//与交叉轴的终点对齐
    align-items:center//垂直在中间
    align-items:baseline//项目的第一行文字的基线对齐
    align-items:stretch;//默认，若项目未设置高度或auto，将占满整个容器的高度
    }
![中](align-items.png)
### 6个属性设置在项目上，即flex items：
* order
* flex-grow
* flex-shrink
* flex-basis
* flex
* align-self
*flex:1这个属性通常用于导航条，给li设置，使导航内容扩大，以至于点击导航时下划线足够长。不仅省去了设置间距问题，还避免了内容过小使得下划线等不美观*
#### 1.order
##### 定义项目的*排列顺序*。数值越小，排列越靠前，默认为0
    .item{
        order:<integer>;
    }
![中](order.png)
#### 2.flex-grow
##### 定义项目的*放大比例*，默认为0，即如果存在剩余空间，也不放大。
    .item{
        flex-grow:<number>
    }
![中](flex-grow.png)
#### 3.flex-shrink
##### 定义项目的*缩小比例*，默认为1，即如果空间不足，该项目将缩小。（如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。）
    .item{
        flex-grow:<number>
    }
![中](flex-shrink.jpg)![中](flex-shrink.jpg)
#### 4.flex-basis
##### 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
    .item{
        flex-basis: <length> | auto; 
    }
#### 5.flex
##### 属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
    .item{
        flex:none
    }
#### 6.align-self
##### 允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch
    .item{
         align-self: auto | flex-start | flex-end | center | baseline | stretch;
    }
![中](align-self.png)
### 响应式图片设置
#### 方法一：
    img{
        max-width:100%;
    }
*面对hover下的下划线被图片盖住问题，添加margin即可*
![区别](元素隐藏.png)
# 四个自适应宽高
#### [注意]IE浏览器不支持，webkit内核浏览器需添加-webkit-前缀
* fill-available
* max-content
* min-content
* fit-content
### width:-webkit-fill-available
    div{
    background-color: pink;
    display:inline-block;
    width:-webkit-fill-available;
    }
    <div>小火柴的蓝色理想</div>
    ![自适应宽度](img/fill-available.png)
### 更多：https://www.cnblogs.com/xiaohuochai/p/7210540.html
# 控制鼠标事件:
## 实现禁用鼠标单击，也可用于禁止页面跳转
    pointer-events:none
# 滑动条,type="range"
    <input type="range" id="myRange">
> ::-webkit-slider-thumb,type为range的input标签内的一种伪类样式,用于设置range的滑块的具体样式,该伪类只在内核为webkit/blink的浏览器中有效
   
# 进度条
    background:linear-gradient(#999, #999) no-repeat, #eb2525
# 文本超出用...
```css
.progress-section-text {
    text-overflow: ellipsis; // 超出则用...
    overflow: hidden;
    white-space: nowrap; // 不换行
}
```
# 设置块元素显示的文本行数-webkit-line-clamp
.box {
    width: 100px; 
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
>注意：-webkit-line-clamp是webkit的私有属性，是一个 不规范的属性（unsupported WebKit property），它没有出现在 CSS 规范草案中。-webkit-line-clamp用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。常见结合属性：
* display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
* -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式。
# 隐藏被旋转的 div 元素的背面`backface-visibility: hidden`
# transform和annimation和transition区别与联系
> CSS3 有3种和动画相关的属性：transform, transition, animation。其中 transform 描述了元素静态样式。而transition 和 animation 却都能实现动画效果。所以transform 常常配合后两者使用
1. transform  描述的是元素静态样式
* transform属性应用于元素的2D或3D转换。这个属性允许你将元素旋转，缩放，移动，倾斜等。 必须是鼠标移上或者点击执行属性变化，鼠标离开属性回归。说到底就是属性不会变化。配合-webkit-transition: 0.3s才会有动画的效果，否则会很生硬。
* 旋转：rote(30deg)    水平面以元素中心旋转多少度；
* rotateX(angle)   定义沿着 X 轴的 3D 旋转；
* rotateY(angle)   定义沿着 Y 轴的 3D 旋转；
* 位移 ：translate(x,y)   定义 2D 转换;
* translate3d(x,y,z)  定义 3D 转换;
* 缩放：scale(x,y)   定义 2D 缩放转换;
* scale3d(x,y,z)   定义 3D 缩放转换;
2. 实现动画效果的：transition   animation
> transition是一个简写属性，用于设置四个过渡属性 
* transition: property duration timing-function delay;
* 过渡的属性，完成过度效果需要时间 , 速度曲线， 延迟时间
* .one1{transition: width 3s linear 2s;}    .one1:hover{width:300px;}
* transition定义了动画的属性、时间、速度曲线以及延迟时间  ；通常和hover等事件配合使用，由事件触发。
> animation 属性是一个简写属性，用于设置六个动画属性,animation的使用必须结合@keyframes animation-name使用
```
@keyframes  move{
    form{ left:0px;}   to{ left:200px;}
}
```
* 在需要动画的元素上面添加动画  div{animation:move 5s infinite;}

* animation: name duration timing-function delay iteration-count direction;
* 动画名称，动画执行时间，速度曲线，动画延迟时间，播放次数，是否反向播放
* animation可以设定每一帧的样式和时间
> 区别：
* 触发条件不同。transition通常和hover等事件配合使用，由事件触发。animation则立即播放。
* 循环。 animation可以设定循环次数。
* 精确性。 animation可以设定每一帧的样式和时间。tranistion 只能设定头尾。 animation中可以设置每一帧需要单独变化的样式属性， transition中所有样式属性都要一起变化。
* 与javascript的交互。animation与js的交互不是很紧密。tranistion和js的结合更强大。js设定要变化的样式，transition负责动画效果，天作之合，比之前只能用js时爽太多。
# 图片自适应
>背景图片自适应（使完全展示）
```css
.banner-img {
  width: 100%; // 关键
  height: 140px;
  background-repeat: no-repeat; // 关键
  background-size: 100% 100%; // 关键
}
```