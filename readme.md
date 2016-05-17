### 项目总体规划
基于 JS 的网络五子棋游戏的总体功能是要设计出具有精美界面的、具备人工智能实现
人机对弈的五子棋游戏。本系统最终的目的是建立一个具有规则的五子棋平台，实现单
机的人机对战。为满足以上功能，基于 JS 的网络五子棋游戏需要达到以下目标。

**1.** 制定合法规则，能够判断出非法操作，以使博弈公正地进行并分出胜负。

**2.** 支持人机对弈，能够让计算机按照游戏规则通过人工智能自行选择最优走法。

**3.** 具有精美操作界面，提高用户的娱乐感。

### 系统需求分析
整个系统的核心部分包括绘制棋盘、棋子和封装的人机对弈所需要的人工智能算法，例
如计算机如何判断下一步最优落子位置、判断胜负等。
总的来说，人工智能算法就是让计算机知道该在哪一点落子，这就需要根据棋盘的形式，
为每一种可能落子的点计算其重要程度，也就是当这子落下会形成什么棋型，然后通览
全局选出最重要的一点，这就是最基本的算法思想。当然，仅依靠当前局面进行判断是
远远不够的，这样下棋很容易掉进对方预设下的陷阱，因为它没有考虑到以后的变化，
可以说只是具有防守功能。所以在此基础上可以加入递归调用，即计算机要预测出今后
几步各种走法，然后做出当下最优选择。
### 系统模块划分
根据上面的需求分析，将系统分为以下几个模块。

**1.** 初始化模块：建立棋盘数组 chessBoard[15][15]、赢法数组 wins[][][]、统计数
组 myWin[],computerWin[]、分值标记数组 myScore[]和 computerScore[]。

**2.** 主循环控制模块：负责控制下棋顺序，当轮到人下棋时，负责将程序流程转到相应
模块中，采用变量 me 进行判断，当为 true 时我方下棋，为 false 时计算机下棋。

**3.** 我方落子模块：当轮到我方落子时，通过鼠标在棋盘上[i][j]落子，程序会根据该
点的位置，赋值 chessBoard[i][j]=1，以表明是我方落子，该位置不允许再次落子。

**4.** 分析棋盘上某点 myScore[]和 computerScore[]的值：本模块是核心，人工智能算
法的根本依据。

**5.** 计算机落子模块：根据分值标记数组，选择最优落子位置。

**6.** 胜负判断模块：根据赢法数组的规则判断统计数组是否为 5，判断出胜负。

### canvas 图形绘制
html的标签canvas在js中用于绘制图像。首先为canvas设置宽和高并display:block，
整个棋盘的边框就出来了，可以设置边框的阴影带来立体感 box-shadow:水平阴影+垂
直阴影+阴影模糊度+阴影半径+颜色+是 inset 还是 outset。
绘图前首先获得绘图位置调用 DOM 获得 chess，调用 getContext 获得内容绘制区域
context，然后直接调用 context 的 moveTo,lineTo 方法就可以绘制线了，万万不能忘
的是要 context.stroke()一下，不然是显示不出来的。绘图采用的坐标系是原点在左
上角，纵轴向下以像素为单位的坐标系。
下面是 canvas 绘图的方法。

**1.** context.moveTo(i,j)线的起点坐标为（I,J）

**2.** context.lineTo(m,n)线的中点坐标为（M,N）

**3.** context.stroke()将线绘制出来

**4.** context.strokeStyle=””设置线的样式

**5.** var log=new Image();log.src=””;context.drawImage(起点横坐标，起点纵坐
标，终点横坐标，终点纵坐标)可以展示一张已有的图片，想展示出来就要等加载完再展示，万万要记得将 context.drawImage 放在 logo.onload=function(){}内，放在绘线前面的话就是先绘图再绘线，此时图片就是作为背景的。

**6.** context.beginPath();context.arc(圆心的横坐标，圆心的纵坐标，弧度的起始值，弧度的终止值);context.closePath();三者才能画出一个扇形（包括圆），但万万要记得 context.fill(); 将 圆 填 充 画 出 来 的 默 认 为 黑 色 的 圆 ， 如 果 是context.stroke()画出来的是默认的黑色边的空圆。同理 context.fillStyle=””;设 置 圆 的 样 式 ， 圆 的 渐 变 样 式 可 以 用 同 心 圆 来 制 作 ， 用 到 了 var gradient=context.createRadialGradient(第一个圆的圆心横坐标，纵坐标，半径，第二个圆的圆心横坐标，纵坐标，半径)；gradient.addColorStop(0,”颜色”);gradient.addColorStop(1,”颜色”);context.strokeStyle=gradient;设置样式成功。
### 作者：pinglikethinking 勿盗
