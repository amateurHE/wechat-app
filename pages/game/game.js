// pages/game/game.js
var data = require('../../utils/data.js')
//地图图层数据
var map = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
]
//箱子图层数据
var box = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
]
var w=40
var row=0
var col=0
Page({
/**
 * 页面的初始数据
 */
data: {
  level:1
},

/**
 自定义函数 -- 初始化地图数据
 */
initMap: function(level){
  //读取原始的游戏地图数据
  let mapData = data.maps[level]
  //使用双重 for 循环记录地图数据
  for (var i = 0; i<8;i++){
    for (var j=0; j<8;j++){
      box[i][j] = 0
      map[i][j] = mapData[i][j]
      if (mapData[i][j]==4){
        box[i][j]=4
        map[i][j] = 2
      }
      else if (mapData[i][j] == 5)
      {
        map[i][j] = 2
        //记录小鸟的当前行和列
        row = i
        col=j
      }
    }
  }
},
/**
 自定义函数 -- 绘制地图
 */
drawCanvas: function(){
  let ctx = this.ctx
  //清空画布
  ctx.clearRect(0,0, 320,320)
  //使用双重 for 循环绘制 8x8 的地图
  for (var i = 0; i<8; i++){
    for (var j=0; j<8;j++){
      //默认是道路
      let img = 'ice'
      if (map[i][j]== 1){
        img = 'stone'
      } else if (map[i][j] == 3){
        img = 'pig'
      }
      //绘制地图
      ctx.drawImage('/images/icons/'+ img + '.png', j * w, i * w, w, w)
      if (box[i][j]==4){
        //叠加绘制箱子
        ctx.drawImage('/images/icons/box.png',j*w,i *w, w, w)
      }
    }
  }
  //叠加绘制小鸟
  ctx.drawImage('/images/icons/bird.png',col * w, row*w, w, w)
  ctx.draw()
},

/**
 自定义函数--方向键：上
 */
up: function(){
  //不在最顶端才考虑上移
  if (row > 0) {
    //如果上方不是墙或箱子，可以移动小鸟
    if (map[row - 1][col] != 1 && box[row -1][col]!= 4){
      //更新当前小鸟的坐标
      row = row - 1
    }
    //如果上方是箱子
    else if (box[row - 1][col]==4){
      //箱子不在最顶端才能考虑推动
      if (row - 1>0){
        //如果箱子上方不是墙或箱子
        if (map[row - 2][col] != 1 && box[row - 2][col] != 4) {
          box[row - 2][col]=4
          box[row - 1][col]=0
          //更新当前小鸟的坐标
          row = row - 1
        }
      }
    }
    //重新绘制地图
    this.drawCanvas()
    this.checkWin()
  }
},
/**
 * 自定义函数--方向键：下
 */
down: function(){
  //不在最底端才考虑下移
  if(row < 7){
    //如果下方不是墙或箱子，可以移动小鸟
    if (map[row + 1][col] != 1 && box[row + 1][col] != 4){
      //更新当前小鸟的坐标
      row = row + 1
    }
    //如果下方是箱子
    else if (box[row + 1][col]== 4){
      //箱子不在最底端才能考虑推动
      if (row + 1<7) {
        //如果箱子下方不是墙或箱子
        if (map[row + 2][col] != 1 && box[row + 2][col] != 4){
          box[row + 2][col] = 4
          box[row + 1][col] = 0
          //更新当前小鸟的坐标
          row=row + 1
        }
      }
    }
    //重新绘制地图
    this.drawCanvas()
    this.checkWin()
  }
},
/**
 * 自定义函数 -- 方向键：左
 */
left: function(){
  //不在最左侧才考虑左移
  if (col > 0) {
    //如果左侧不是墙或箱子, 可以移动小鸟
    if (map[row][col - 1] != 1 && box[row][col - 1] != 4){
      //更新当前小鸟的坐标
      col = col - 1
    }
    //如果左侧是箱子
    else if (box[row][col -1] ==4){
      //箱子不在最左侧才能考虑推动
      if (col - 1> 0){
        //如果箱子左侧不是墙或箱子
        if (map[row][col - 2] != 1 && box[row][col - 2] != 4){
          box[row][col - 2] = 4
          box[row][col - 1] = 0
          //更新当前小鸟的坐标
          col = col - 1
        }
      }
    }
    //重新绘制地图
    this.drawCanvas()
    this.checkWin()
  }
},
/**
 * 自定义函数--方向键：右
 */
right: function(){
  //不在最右侧才考虑右移
  if(col < 7){
    //如果右方不是墙或箱子，可以移动小鸟
    if (map[row][col+1] != 1 && box[row][col+1] != 4){
      //更新当前小鸟的坐标
      col=col+1
    }
    //如果右侧是箱子
    else if (box[row][col+1] ==4){
      //箱子不在最右侧才能考虑推动
      if (col + 1<7){
        //如果箱子右侧不是墙或箱子
        if (map[row][col + 2] != 1 && box[row][col + 2] != 4){
          box[row][col + 2] = 4
          box[row][col + 1] = 0
          //更新当前小鸟的坐标
          col = col + 1
        }
      }
    }
    //重新绘制地图
    this.drawCanvas()
    this.checkWin()
  }
},

/**
 * 自定义函数--判断游戏是否成功
 */
isWin: function(){
  //使用双重 for 循环遍历整个数组
  for (var i = 0; i<8; i++){
    for (var j= 0;j<8;j++){
      //如果有箱子没在终点
      if (box[i][j] == 4 && map[i][j] != 3) {
        //返回false，表示游戏尚未成功
        return false
      }
    }
  }
  //返回 true, 表示游戏成功
  return true
},

/**
 *  自定义函数 -- 游戏成功处理
 */
checkWin: function(){
  if (this.isWin()){
    wx.showModal({
      title:'恭喜',
      content:'游戏成功!',
      showCancel:false
    })
  }
},

/**
 * 生命周期函数--监听页面加载
 */
onLoad:function(options) {
  let level=options.level
  this.setData({
    level:parseInt(level)+1
  })
  this.ctx=wx.createCanvasContext('myCanvas')
  this.initMap(level)
  this.drawCanvas()
},

  restartGame:function(){
    this.initMap(this.data.level-1)
    this.drawCanvas()
  }
})