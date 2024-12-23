var data = require('../../utils/data.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    levels:[
      'level01.png',
      'level01.png',
      'level01.png',
      'level01.png'
    ]
  },
  chooseLevel:function(e){
    let level =e.currentTarget.dataset.level
    wx.navigateTo({
      url: '../game/game?level='+level,
    })
  }
})