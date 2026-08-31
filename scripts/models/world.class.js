class World {
  canvas;
  ctx;
  character = new Character();
  keyboard;
  level = level1;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();

    this.draw();
    this.spawnEnemies();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground(this.level.backgroundObjects);
    this.drawWithFlip(this.character);
    this.drawEnemies(this.level.enemies);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  drawEnemies(enemies) {
    enemies.forEach((enemy) => {
      this.drawWithFlip(enemy);
    });
  }

  drawBackground(arr) {
    arr.forEach((backgroundObject) => {
      let drawX = backgroundObject.x + this.camera_x * backgroundObject.parallaxFactor;
      backgroundObject.draw(this.ctx, drawX);
    });
  }

  drawWithFlip(moveableObject) {
    let drawX = moveableObject.x + this.camera_x;

    if (moveableObject.otherDirection) {
      this.ctx.save();
      this.ctx.translate(moveableObject.width, 0);
      this.ctx.scale(-1, 1);
      moveableObject.draw(this.ctx, -drawX);
      this.ctx.restore();
    } else {
      moveableObject.draw(this.ctx, drawX);
    }
  }

  spawnEnemies() {
    let spawnTimer = 2000 + Math.random() * 3000;

    setTimeout(() => {
      this.generaetRandomEnemy();
      if (this.character.x < this.level.level_end_x -500) {
        this.spawnEnemies();
      }
    }, spawnTimer);
  }

  generaetRandomEnemy() {
    let colors = ['green', 'orange', 'blue'];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    let enemy = new Enemy(randomColor);
    enemy.x = this.canvas.width - this.camera_x;
    this.level.enemies.push(enemy);
  }
}
