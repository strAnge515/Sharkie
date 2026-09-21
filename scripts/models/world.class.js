class World {
  canvas;
  ctx;
  character = new Character();
  keyboard;
  level = level1;
  camera_x = 0;
  bubbles = [];
  poisonBottles = [];
  coinsCollected = 0;
  poisonCollected = 0;

  statusBars = [
    new StatusBar(STATUS_BAR_IMAGES.life, 20, 10, 100),
    new StatusBar(STATUS_BAR_IMAGES.coin, 20, 65, 0),
    new StatusBar(STATUS_BAR_IMAGES.poison, 20, 120, 0),
  ];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();

    this.draw();
    // this.spawnEnemies();
    this.checkCollisions();
    this.checkCoinCollisions();
    this.checkBubbleCollisions();
    this.checkPoisonBottleCollisions();
    this.checkBossZone();
  }

  setWorld() {
    this.character.world = this;
    this.level.finalEnemy.world = this;
    this.poisonBottles = [...this.level.poisonBottles];
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground(this.level.backgroundObjects);
    this.drawWithFlip(this.character);
    this.drawObjects(this.level.enemies);
    this.drawObjects(this.level.coins);
    this.drawObjects(this.level.jellyfish);
    this.drawObjects(this.poisonBottles);

    if (this.level.finalEnemy.isVisible) {
      this.drawWithFlip(this.level.finalEnemy);
    }
    this.drawObjects(this.bubbles);
    this.updateBubbles();
    this.drawStatusBars();
    this.drawHitboxes();

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  drawObjects(objects) {
    objects.forEach((object) => {
      this.drawWithFlip(object);
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
      if (this.character.x < this.level.level_end_x - 720) {
        this.generaetRandomEnemy();
        this.spawnEnemies();
      }
    }, spawnTimer);
  }

  spawnBubble(x, y, type = 'normal') {
    let bubble = new Bubble(x, y, type);
    this.bubbles.push(bubble);
  }

  drawStatusBars() {
    this.statusBars.forEach((bar) => {
      bar.draw(this.ctx);
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

  checkBossZone() {
    setInterval(() => {
      if (this.character.x >= this.level.level_end_x - 720) {
        this.level.finalEnemy.appear();
      }
    }, 100);
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => this.checkEnemyCollision(enemy));
      this.level.jellyfish.forEach((jellyfish) => this.checkJellyfishCollision(jellyfish));
      this.checkFinalEnemyCollision();
    }, 100);
  }

  checkEnemyCollision(enemy) {
    if (enemy.isDead) return;

    if (this.character.isAttacking) {
      if (this.isColliding(this.character.getAttackHitbox(), enemy.getHitbox())) {
        this.killEnemy(enemy);
      }
    } else if (this.isColliding(this.character.getBodyHitbox(), enemy.getHitbox())) {
      this.hurtCharacter('poison');
    }
  }

  checkJellyfishCollision(jellyfish) {
    if (jellyfish.isDead) return;

    if (this.isColliding(this.character.getBodyHitbox(), jellyfish.getHitbox())) {
      this.hurtCharacter('electric');
    }
  }

  checkFinalEnemyCollision() {
    let boss = this.level.finalEnemy;
    if (!boss.isVisible || boss.isDead || !boss.isAttacking) return;

    if (this.isColliding(this.character.getBodyHitbox(), boss.getHitbox())) {
      this.hurtCharacter('poison');
    }
  }

  hurtCharacter(damageType) {
    if (this.character.getHit(damageType)) {
      this.statusBars[0].setPercentage(this.character.health);
    }
  }

  checkBubbleCollisions() {
    setInterval(() => {
      this.bubbles.forEach((bubble) => {
        this.level.jellyfish.forEach((jellyfish) => {
          if (jellyfish.isDead) return;

          if (this.isColliding(bubble.getHitbox(), jellyfish.getHitbox())) {
            this.killJellyfish(jellyfish);
            this.removeBubble(bubble);
          }
        });

        if (bubble.type === 'poison' && this.level.finalEnemy.isVisible && !this.level.finalEnemy.isDead) {
          if (this.isColliding(bubble.getHitbox(), this.level.finalEnemy.getHitbox())) {
            this.level.finalEnemy.hit();
            this.removeBubble(bubble);
          }
        }
      });
    }, 100);
  }

  removeBubble(bubble) {
    let index = this.bubbles.indexOf(bubble);
    if (index === -1) return;

    bubble.remove();
    this.bubbles.splice(index, 1);
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

    let percentage = Math.min(100, this.coinsCollected * 20);
    this.statusBars[1].setPercentage(percentage);
  }

  drawHitboxes() {
    this.ctx.lineWidth = 2;
    this.drawHitbox(this.character.getBodyHitbox(), 'blue');
    this.drawHitbox(this.character.getAttackHitbox(), 'yellow');
    this.drawHitboxList(this.level.enemies, 'red');
    this.drawHitboxList(this.level.jellyfish, 'orange');
    this.drawHitboxList(this.level.coins, 'green');
    this.drawHitboxList(this.bubbles, 'cyan');
    this.drawHitboxList(this.poisonBottles, 'magenta');

    if (this.level.finalEnemy.isVisible && !this.level.finalEnemy.isDead) {
      this.drawHitbox(this.level.finalEnemy.getHitbox(), 'red');
    }
  }

  drawHitboxList(objects, color) {
    objects.forEach((object) => {
      this.drawHitbox(object.getHitbox(), color);
    });
  }

  drawHitbox(hitbox, color) {
    this.ctx.strokeStyle = color;
    this.ctx.strokeRect(hitbox.x + this.camera_x, hitbox.y, hitbox.width, hitbox.height);
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

    let enemyHitbox = enemy.getHitbox();
    this.spawnPoisonBottle(enemyHitbox.x + enemyHitbox.width, enemyHitbox.y);

    setTimeout(() => {
      let index = this.level.enemies.indexOf(enemy);
      this.level.enemies.splice(index, 1);
    }, 2000);
  }

  spawnPoisonBottle(x, y) {
    let poisonBottle = new PoisonBottle(x, y);
    this.poisonBottles.push(poisonBottle);
  }

  checkPoisonBottleCollisions() {
    setInterval(() => {
      this.poisonBottles.forEach((poisonBottle) => {
        if (this.isColliding(this.character.getBodyHitbox(), poisonBottle.getHitbox())) {
          this.collectPoisonBottle(poisonBottle);
        }
      });
    }, 100);
  }

  collectPoisonBottle(poisonBottle) {
    let index = this.poisonBottles.indexOf(poisonBottle);
    if (index === -1) return;

    this.poisonBottles.splice(index, 1);
    this.poisonCollected = Math.min(100, this.poisonCollected + 20);
    this.statusBars[2].setPercentage(this.poisonCollected);
  }

  usePoison(amount) {
    if (this.poisonCollected < amount) return false;

    this.poisonCollected -= amount;
    this.statusBars[2].setPercentage(this.poisonCollected);
    return true;
  }

  killJellyfish(jellyfish) {
    jellyfish.die();

    setTimeout(() => {
      let index = this.level.jellyfish.indexOf(jellyfish);
      this.level.jellyfish.splice(index, 1);
    }, 2000);
  }
}
