class World {
  canvas;
  ctx;
  character = new Character();
  keyboard;
  level = level1;
  camera_x = 0;
  bubbles = [];
  coinsCollected = 0;

  statusBars = [
    new StatusBar(
      {
        0: 'graphics/4. Marcadores/green/Life/0_  copia 3.png',
        20: 'graphics/4. Marcadores/green/Life/20_ copia 4.png',
        40: 'graphics/4. Marcadores/green/Life/40_  copia 3.png',
        60: 'graphics/4. Marcadores/green/Life/60_  copia 3.png',
        80: 'graphics/4. Marcadores/green/Life/80_  copia 3.png',
        100: 'graphics/4. Marcadores/green/Life/100_  copia 2.png',
      },
      20,
      10,
    ),
    new StatusBar(
      {
        0: 'graphics/4. Marcadores/green/Coin/0_  copia 4.png',
        20: 'graphics/4. Marcadores/green/Coin/20_  copia 2.png',
        40: 'graphics/4. Marcadores/green/Coin/40_  copia 4.png',
        60: 'graphics/4. Marcadores/green/Coin/60_  copia 4.png',
        80: 'graphics/4. Marcadores/green/Coin/80_  copia 4.png',
        100: 'graphics/4. Marcadores/green/Coin/100_ copia 4.png',
      },
      20,
      65,
      0,
    ),
    new StatusBar(
      {
        0: 'graphics/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
        20: 'graphics/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        40: 'graphics/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        60: 'graphics/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        80: 'graphics/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        100: 'graphics/4. Marcadores/green/poisoned bubbles/100_ copia 3.png',
      },
      20,
      120,
    ),
  ];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();

    this.draw();
    this.spawnEnemies();
    this.checkCollisions();
    this.checkCoinCollisions();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground(this.level.backgroundObjects);
    this.drawWithFlip(this.character);
    this.drawEnemies(this.level.enemies);
    this.drawCoins();
    this.drawBubbles();
    this.updateBubbles();
    this.drawStatusBars();
    this.drawHitboxes();

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

  drawCoins() {
    this.level.coins.forEach((coin) => {
      this.drawWithFlip(coin);
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
    let spawnTimer = 4000 + Math.random() * 6000;

    setTimeout(() => {
      this.generaetRandomEnemy();
      if (this.character.x < this.level.level_end_x -500) {
        this.spawnEnemies();
      }
    }, spawnTimer);
  }

  spawnBubble(x, y) {
    let bubble = new Bubble(x, y);
    this.bubbles.push(bubble);
  }

  drawStatusBars() {
    this.statusBars.forEach((bar) => {
      bar.draw(this.ctx);
    });
  }

  drawBubbles() {
    this.bubbles.forEach((bubble) => {
      this.drawWithFlip(bubble);
    });
  }

  updateBubbles() {
    this.bubbles = this.bubbles.filter((bubble) => {
      if (bubble.x + this.camera_x > this.canvas.width + 50) {
        bubble.remove();
        return false;
      }
      return true;
    });
  }

  generaetRandomEnemy() {
    let colors = ['green', 'orange', 'blue'];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    let enemy = new Enemy(randomColor);
    enemy.x = this.canvas.width - this.camera_x;
    this.level.enemies.push(enemy);
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (enemy.isDead) return;

        let enemyHitbox = enemy.getHitbox();

        if (this.character.isAttacking) {
          if (this.isColliding(this.character.getAttackHitbox(), enemyHitbox)) {
            this.killEnemy(enemy);
          }
        } else if (this.isColliding(this.character.getBodyHitbox(), enemyHitbox)) {
          this.character.getHit();
        }
      });
    }, 100);
  }

  checkCoinCollisions() {
    setInterval(() => {
      this.level.coins.forEach((coin) => {
        if (this.isColliding(this.character.getBodyHitbox(), coin.getHitbox())) {
          this.collectCoin(coin);
        }
      });
    }, 100);
  }

  collectCoin(coin) {
    let index = this.level.coins.indexOf(coin);
    if (index === -1) return;

    this.level.coins.splice(index, 1);
    this.coinsCollected++;

    let percentage = Math.min(100, Math.floor(this.coinsCollected / 2) * 20);
    this.statusBars[1].setPercentage(percentage);
  }

  drawHitboxes() {
    this.ctx.lineWidth = 2;

    let bodyHitbox = this.character.getBodyHitbox();
    this.ctx.strokeStyle = 'blue';
    this.ctx.strokeRect(bodyHitbox.x + this.camera_x, bodyHitbox.y, bodyHitbox.width, bodyHitbox.height);

    let attackHitbox = this.character.getAttackHitbox();
    this.ctx.strokeStyle = 'yellow';
    this.ctx.strokeRect(attackHitbox.x + this.camera_x, attackHitbox.y, attackHitbox.width, attackHitbox.height);

    this.ctx.strokeStyle = 'red';
    this.level.enemies.forEach((enemy) => {
      let hitbox = enemy.getHitbox();
      this.ctx.strokeRect(hitbox.x + this.camera_x, hitbox.y, hitbox.width, hitbox.height);
    });

    this.ctx.strokeStyle = 'green';
    this.level.coins.forEach((coin) => {
      let coinHitbox = coin.getHitbox();
      this.ctx.strokeRect(coinHitbox.x + this.camera_x, coinHitbox.y, coinHitbox.width, coinHitbox.height);
    });
  }

  isColliding(hitboxA, hitboxB) {
    return (
      hitboxA.x + hitboxA.width > hitboxB.x &&
      hitboxA.x < hitboxB.x + hitboxB.width &&
      hitboxA.y + hitboxA.height > hitboxB.y &&
      hitboxA.y < hitboxB.y + hitboxB.height
    );
  }

  killEnemy(enemy) {
    enemy.die();

    setTimeout(() => {
      let index = this.level.enemies.indexOf(enemy);
      this.level.enemies.splice(index, 1);
    }, 2000);
  }
}
