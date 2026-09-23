/**
 * The game world: owns the shark, the level and all game objects, draws every frame
 * and decides when the game is over.
 */
class World {
  canvas;
  context;
  keyboard;
  level;
  collisionHandler;
  frameId;
  character = new Character();
  isEnded = false;
  cameraX = 0;
  bubbles = [];
  poisonBottles = [];
  coinsCollected = 0;
  poisonCollected = 0;

  lifeStatusBar = new StatusBar(STATUS_BAR_IMAGES.life, 20, 10, 100);
  coinStatusBar = new StatusBar(STATUS_BAR_IMAGES.coin, 20, 65, 0);
  poisonStatusBar = new StatusBar(STATUS_BAR_IMAGES.poison, 20, 120, 0);
  statusBars = [this.lifeStatusBar, this.coinStatusBar, this.poisonStatusBar];

  bossZoneCheckIntervalMs = 100;
  gameEndCheckIntervalMs = 200;
  gameOverScreenDelayMs = 2500;
  winScreenDelayMs = 3000;
  bubbleRemoveMarginX = 50;

  /**
   * Creates the world and starts drawing, collision checks, boss zone check and game end check.
   * @param {HTMLCanvasElement} canvas - The canvas the game is drawn on.
   * @param {Keyboard} keyboard - The keyboard state that steers the shark.
   * @param {Level} level - The level to play.
   */
  constructor(canvas, keyboard, level) {
    this.context = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = level;
    this.collisionHandler = new CollisionHandler(this);
    this.connectObjectsToWorld();

    this.draw();
    this.collisionHandler.startChecking();
    this.checkBossZone();
    this.checkGameEnd();
  }

  /**
   * Gives the shark and the boss access to the world and copies the level's poison bottles.
   */
  connectObjectsToWorld() {
    this.character.world = this;
    this.level.finalEnemy.world = this;
    this.poisonBottles = [...this.level.poisonBottles];
  }

  /**
   * Draws one complete frame and schedules the next one.
   */
  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.drawGameObjects();
    this.updateBubbles();
    this.drawStatusBars();
    this.frameId = requestAnimationFrame(() => this.draw());
  }

  /**
   * Draws the shark, the enemies, the collectibles and the bubbles (the boss only once it appeared).
   */
  drawGameObjects() {
    this.drawWithFlip(this.character);
    this.drawObjects(this.level.enemies);
    this.drawObjects(this.level.coins);
    this.drawObjects(this.level.jellyfish);
    this.drawObjects(this.poisonBottles);

    if (this.level.finalEnemy.isVisible) {
      this.drawWithFlip(this.level.finalEnemy);
    }
    this.drawObjects(this.bubbles);
  }

  /**
   * @param {MoveableObject[]} objects - The objects to draw.
   */
  drawObjects(objects) {
    objects.forEach((object) => {
      this.drawWithFlip(object);
    });
  }

  /**
   * Draws the background layers; layers with a small parallax factor move slower than the camera.
   */
  drawBackground() {
    this.level.backgroundObjects.forEach((backgroundObject) => {
      let drawX = backgroundObject.x + this.cameraX * backgroundObject.parallaxFactor;
      backgroundObject.draw(this.context, drawX);
    });
  }

  /**
   * Draws an object at its position on the screen and mirrors it if it looks to the left.
   * @param {MoveableObject} moveableObject - The object to draw.
   */
  drawWithFlip(moveableObject) {
    let drawX = moveableObject.x + this.cameraX;

    if (moveableObject.otherDirection) {
      this.context.save();
      this.context.translate(moveableObject.width, 0);
      this.context.scale(-1, 1);
      moveableObject.draw(this.context, -drawX);
      this.context.restore();
    } else {
      moveableObject.draw(this.context, drawX);
    }
  }

  /**
   * Draws the life, coin and poison bar.
   */
  drawStatusBars() {
    this.statusBars.forEach((statusBar) => {
      statusBar.draw(this.context);
    });
  }

  /**
   * Creates a bubble and adds it to the world.
   * @param {number} x - Start x position of the bubble.
   * @param {number} y - Start y position of the bubble.
   * @param {string} type - 'normal' or 'poison'.
   */
  spawnBubble(x, y, type = 'normal') {
    let bubble = new Bubble(x, y, type);
    this.bubbles.push(bubble);
  }

  /**
   * Creates a poison bottle and adds it to the world.
   * @param {number} x - X position of the bottle.
   * @param {number} y - Y position of the bottle.
   */
  spawnPoisonBottle(x, y) {
    let poisonBottle = new PoisonBottle(x, y);
    this.poisonBottles.push(poisonBottle);
  }

  /**
   * Removes bubbles that have flown out of the right side of the screen.
   */
  updateBubbles() {
    this.bubbles = this.bubbles.filter((bubble) => {
      let isOutsideScreen = bubble.x + this.cameraX > this.canvas.width + this.bubbleRemoveMarginX;
      if (isOutsideScreen) bubble.remove();
      return !isOutsideScreen;
    });
  }

  /**
   * Spends poison from the poison bar, for example when a poison bubble is shot.
   * @param {number} amount - How many percent of the poison bar to use.
   * @returns {boolean} True if there was enough poison.
   */
  usePoison(amount) {
    if (this.poisonCollected < amount) return false;

    this.poisonCollected -= amount;
    this.poisonStatusBar.setPercentage(this.poisonCollected);
    return true;
  }

  /**
   * Keeps spawning a random enemy at the right screen edge in random intervals (currently not used).
   */
  spawnEnemies() {
    let delayUntilNextEnemy = 4000 + Math.random() * 6000;

    gameTimeout(() => {
      if (this.character.x < this.level.levelEndX - this.canvas.width) {
        this.spawnRandomEnemy();
        this.spawnEnemies();
      }
    }, delayUntilNextEnemy);
  }

  /**
   * Adds a pufferfish with a random color at the right screen edge.
   */
  spawnRandomEnemy() {
    let colors = ['green', 'orange', 'blue'];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    let enemy = new Enemy(randomColor);
    enemy.x = this.canvas.width - this.cameraX;
    this.level.enemies.push(enemy);
  }

  /**
   * Lets the boss appear as soon as the shark reaches the last screen of the level.
   */
  checkBossZone() {
    gameInterval(() => {
      let bossZoneStartX = this.level.levelEndX - this.canvas.width;
      if (this.character.x >= bossZoneStartX) this.level.finalEnemy.appear();
    }, this.bossZoneCheckIntervalMs);
  }

  /**
   * Ends the game when the shark died (game over) or the boss died (win).
   */
  checkGameEnd() {
    gameInterval(() => {
      if (this.isEnded) return;

      if (this.character.isDead) {
        this.endGame(false, this.gameOverScreenDelayMs);
      } else if (this.level.finalEnemy.isDead) {
        this.endGame(true, this.winScreenDelayMs);
      }
    }, this.gameEndCheckIntervalMs);
  }

  /**
   * Shows the end screen after a delay, so the last animation can finish.
   * @param {boolean} hasWon - True for a win, false for game over.
   * @param {number} delay - Milliseconds to wait before the end screen appears.
   */
  endGame(hasWon, delay) {
    this.isEnded = true;

    gameTimeout(() => {
      this.stop();
      showEndScreen(hasWon);
    }, delay);
  }

  /**
   * Stops all timers and the drawing loop of this world.
   */
  stop() {
    clearGameTimers();
    cancelAnimationFrame(this.frameId);
  }
}
