Page({
  data: {
    map: [],
    player: { x: 0, y: 0 },
    boxes: [],
    targets: [],
    level: 1,
    moves: 0,
    levelComplete: false,
    maxLevel: 5
  },

  // 关卡数据
  levelData: [
    // 第1关 - 简单的开始
    {
      map: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ],
      player: { x: 1, y: 1 },
      boxes: [{ x: 3, y: 3 }],
      targets: [{ x: 5, y: 5 }]
    },
    // 第2关 - 双箱挑战
    {
      map: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ],
      player: { x: 1, y: 1 },
      boxes: [{ x: 3, y: 2 }, { x: 4, y: 4 }],
      targets: [{ x: 6, y: 2 }, { x: 1, y: 4 }]
    },
    // 第3关 - 迷宫推箱
    {
      map: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ],
      player: { x: 1, y: 1 },
      boxes: [{ x: 2, y: 4 }, { x: 4, y: 4 }],
      targets: [{ x: 6, y: 1 }, { x: 6, y: 6 }]
    },
    // 第4关 - 三箱挑战
    {
      map: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],
      player: { x: 1, y: 1 },
      boxes: [{ x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }],
      targets: [{ x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 }]
    },
    // 第5关 - 终极挑战
    {
      map: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 1, 0, 1, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 1, 0, 1, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],
      player: { x: 4, y: 4 },
      boxes: [
        { x: 2, y: 2 },
        { x: 6, y: 2 },
        { x: 2, y: 6 },
        { x: 6, y: 6 }
      ],
      targets: [
        { x: 2, y: 3 },
        { x: 6, y: 3 },
        { x: 2, y: 5 },
        { x: 6, y: 5 }
      ]
    }
  ],

  onLoad() {
    this.initLevel(this.data.level);
  },

  initLevel(level) {
    const levelIndex = level - 1;
    const currentLevel = this.levelData[levelIndex];
    
    this.setData({
      map: currentLevel.map,
      player: currentLevel.player,
      boxes: currentLevel.boxes,
      targets: currentLevel.targets,
      moves: 0,
      levelComplete: false
    });
  },
  methods:{
    isBoxOnCell(x, y) {
      return this.data.boxes.some(box => box.x === x && box.y === y);
    },
    isBoxOnTarget(x, y) {
      return this.data.targets.some(target => target.x === x && target.y === y);
    },
    isTargetOnCell(x, y) {
      return this.data.targets.some(target => target.x === x && target.y === y);
    }
  },

  // 重置当前关卡
  resetLevel() {
    this.initLevel(this.data.level);
  },

  // 下一关
  nextLevel() {
    if (this.data.level < this.data.maxLevel) {
      this.setData({
        level: this.data.level + 1
      }, () => {
        this.initLevel(this.data.level);
      });
    } else {
      wx.showToast({
        title: '恭喜通关！',
        icon: 'success'
      });
    }
  },

  onMove(e) {
    const direction = e.currentTarget.dataset.direction;
    let { player, boxes, map } = this.data;
    let newX = player.x;
    let newY = player.y;

    switch (direction) {
      case 'up': newY--; break;
      case 'down': newY++; break;
      case 'left': newX--; break;
      case 'right': newX++; break;
    }

    if (this.canMove(newX, newY)) {
      const boxIndex = this.getBoxAt(newX, newY);
      if (boxIndex !== -1) {
        const boxNewX = newX + (newX - player.x);
        const boxNewY = newY + (newY - player.y);
        
        if (this.canMove(boxNewX, boxNewY) && !this.getBoxAt(boxNewX, boxNewY) !== -1) {
          const newBoxes = [...boxes];
          newBoxes[boxIndex] = { x: boxNewX, y: boxNewY };
          
          this.setData({
            player: { x: newX, y: newY },
            boxes: newBoxes,
            moves: this.data.moves + 1
          });

          this.checkWin();
        }
      } else {
        this.setData({
          player: { x: newX, y: newY },
          moves: this.data.moves + 1
        });
      }
    }
  },

  canMove(x, y) {
    return this.data.map[y] && this.data.map[y][x] !== 1;
  },

  getBoxAt(x, y) {
    return this.data.boxes.findIndex(box => box.x === x && box.y === y);
  },

  checkWin() {
    const { boxes, targets } = this.data;
    const isComplete = targets.every(target => 
      boxes.some(box => box.x === target.x && box.y === target.y)
    );

    if (isComplete) {
      this.setData({ levelComplete: true });
      wx.showModal({
        title: '恭喜',
        content: `第${this.data.level}关完成！是否进入下一关？`,
        confirmText: '下一关',
        cancelText: '重玩',
        success: (res) => {
          if (res.confirm) {
            this.nextLevel();
          } else {
            this.resetLevel();
          }
        }
      });
    }
  }
}); 