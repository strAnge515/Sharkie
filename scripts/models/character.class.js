/**
 * The player-controlled shark: moves with the keyboard, attacks, shoots bubbles,
 * takes damage from enemies and dies when its health reaches zero.
 */
class Character extends MoveableObject {
  IMAGES_SWIMMING = CHARACTER_IMAGES.swimming;
  IMAGES_IDLE = CHARACTER_IMAGES.idle;
  IMAGES_LONG_IDLE = CHARACTER_IMAGES.longIdle;
  IMAGES_TAIL_ATTACK = CHARACTER_IMAGES.tailAttack;
  IMAGES_BUBBLE = CHARACTER_IMAGES.bubble;
  IMAGES_POISON_BUBBLE = CHARACTER_IMAGES.poisonBubble;
  IMAGES_HURT_POISON = CHARACTER_IMAGES.hurtPoison;
  IMAGES_HURT_ELECTRIC = CHARACTER_IMAGES.hurtElectric;
  IMAGES_DEAD_POISON = CHARACTER_IMAGES.deadPoison;
  IMAGES_DEAD_ELECTRIC = CHARACTER_IMAGES.deadElectric;

  x = 100;
  y = 100;
  height = 300;
  width = 200;
  spriteTop = 131;
  spriteBottom = 235;
  speed = 2.6;
  health = 100;
  world;

  isDead = false;
  isHit = false;
  isAttacking = false;
  isShootingBubble = false;
  hitType;
  bubbleType;
  lastHitTime;
  lastMoveTime = Date.now();

  damagePerHit = 20;
  hitCooldownMs = 2000;
  longIdleAfterSeconds = 30;
  poisonBubbleCost = 20;
  bubbleMouthOffsetY = 27;

  movementIntervalMs = 1000 / 60;
  swimAnimationIntervalMs = 100;
  idleAnimationIntervalMs = 170;
  actionAnimationIntervalMs = 70;
  hurtAnimationIntervalMs = 170;
  deathAnimationIntervalMs = 120;

  /**
   * Creates the shark, preloads all its images and starts all of its loops.
   */
  constructor() {
    super();
    this.loadImage('graphics/1.Sharkie/1.IDLE/1.png');
    this.loadAllImages();
    this.startMovementLoop();
    this.startSwimAnimationLoop();
    this.startIdleAnimationLoop();
    this.startAttackLoop();
    this.startBubbleLoop();
    this.startHurtLoop();
    this.startDeathLoop();
  }

  /**
   * Preloads the images of every animation so they can be shown without delay.
   */
  loadAllImages() {
    Object.values(CHARACTER_IMAGES).forEach((animationImages) => {
      this.loadImages(animationImages);
    });
  }

  /**
   * Moves the shark according to the pressed keys about 60 times per second.
   */
  startMovementLoop() {
    gameInterval(() => {
      if (this.isDead || this.isAttackingOrShooting()) return;
      this.moveRightWithKeyboard();
      this.moveLeftWithKeyboard();
      this.moveVerticallyWithKeyboard();
    }, this.movementIntervalMs);
  }

  /**
   * Handles the right arrow key: the shark swims right until it reaches the scroll boundary,
   * then the camera scrolls instead. At the end of the level the shark swims on its own again.
   */
  moveRightWithKeyboard() {
    if (!this.world.keyboard.RIGHT) return;
    let levelEndX = this.world.level.levelEndX;
    let isAtLevelEnd = -this.world.cameraX >= levelEndX - this.world.canvas.width;

    if (!isAtLevelEnd && this.getScreenX() < this.getScrollBoundary()) this.swimRight();
    if (!isAtLevelEnd && this.getScreenX() >= this.getScrollBoundary()) this.world.cameraX -= this.speed;
    if (isAtLevelEnd && this.x + this.width < levelEndX) this.swimRight();
  }

  /**
   * Handles the left arrow key: the shark swims left but never out of the visible screen.
   */
  moveLeftWithKeyboard() {
    if (this.world.keyboard.LEFT && this.x > -this.world.cameraX) {
      this.moveLeft();
      this.lastMoveTime = Date.now();
      this.otherDirection = true;
    }
  }

  /**
   * Handles the up and down arrow keys: the shark stays between the top and bottom edge of the canvas.
   */
  moveVerticallyWithKeyboard() {
    let keyboard = this.world.keyboard;

    if (keyboard.UP && this.y + this.spriteTop > 0) {
      this.moveUp();
      this.lastMoveTime = Date.now();
    }
    if (keyboard.DOWN && this.y + this.spriteBottom < this.world.canvas.height) {
      this.moveDown();
      this.lastMoveTime = Date.now();
    }
  }

  /**
   * Moves the shark to the right, faces it to the right and remembers that it just moved.
   */
  swimRight() {
    this.moveRight();
    this.lastMoveTime = Date.now();
    this.otherDirection = false;
  }

  /**
   * @returns {number} The x position of the shark on the screen (world position plus camera scroll).
   */
  getScreenX() {
    return this.x + this.world.cameraX;
  }

  /**
   * @returns {number} The screen x position where the camera starts to scroll (the middle of the canvas).
   */
  getScrollBoundary() {
    return this.world.canvas.width / 2;
  }

  /**
   * @returns {boolean} True while a tail attack or a bubble shot is running.
   */
  isAttackingOrShooting() {
    return this.isAttacking || this.isShootingBubble;
  }

  /**
   * @returns {boolean} True while an animation that replaces swimming and idle is playing.
   */
  isPlayingSpecialAnimation() {
    return this.isAttackingOrShooting() || this.isHit || this.isDead;
  }

  /**
   * @returns {boolean} True if the left or the right arrow key is pressed.
   */
  isHorizontalKeyPressed() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
   * @returns {boolean} True if any of the four arrow keys is pressed.
   */
  isAnyMovementKeyPressed() {
    let keyboard = this.world.keyboard;
    return keyboard.RIGHT || keyboard.LEFT || keyboard.UP || keyboard.DOWN;
  }

  /**
   * Plays the swim animation while an arrow key is pressed.
   */
  startSwimAnimationLoop() {
    gameInterval(() => {
      if (this.isPlayingSpecialAnimation() || !this.isAnyMovementKeyPressed()) return;
      this.playAnimation(this.IMAGES_SWIMMING);
    }, this.swimAnimationIntervalMs);
  }

  /**
   * Plays the idle animation while the shark does not move horizontally.
   */
  startIdleAnimationLoop() {
    gameInterval(() => {
      if (this.isPlayingSpecialAnimation() || this.isHorizontalKeyPressed()) return;
      this.playIdleAnimation();
    }, this.idleAnimationIntervalMs);
  }

  /**
   * Plays one idle frame; after a long time without movement the shark falls asleep (long idle).
   */
  playIdleAnimation() {
    let secondsWithoutMovement = (Date.now() - this.lastMoveTime) / 1000;
    let isSleeping = secondsWithoutMovement > this.longIdleAfterSeconds;
    this.playAnimation(isSleeping ? this.IMAGES_LONG_IDLE : this.IMAGES_IDLE);
  }

  /**
   * Starts the tail attack when the D key is pressed and plays its animation.
   */
  startAttackLoop() {
    gameInterval(() => {
      if (this.isDead) return;
      this.startTailAttackOnKey();
      this.playTailAttackAnimation();
    }, this.actionAnimationIntervalMs);
  }

  /**
   * Begins a tail attack if the D key is pressed and no other action is running.
   */
  startTailAttackOnKey() {
    if (this.world.keyboard.D && !this.isAttackingOrShooting()) {
      this.currentImage = 0;
      this.isAttacking = true;
    }
  }

  /**
   * Plays one frame of the tail attack and ends the attack after the last frame.
   */
  playTailAttackAnimation() {
    if (!this.isAttacking) return;
    this.playAnimation(this.IMAGES_TAIL_ATTACK);
    if (this.currentImage >= this.IMAGES_TAIL_ATTACK.length) this.isAttacking = false;
  }

  /**
   * Shoots a bubble when the space key is pressed and plays its animation.
   */
  startBubbleLoop() {
    gameInterval(() => {
      if (this.isDead) return;
      this.startBubbleShotOnKey();
      this.playBubbleShotAnimation();
    }, this.actionAnimationIntervalMs);
  }

  /**
   * Begins a bubble shot if the space key is pressed and no other action is running.
   * With enough collected poison the bubble is a poison bubble.
   */
  startBubbleShotOnKey() {
    if (this.world.keyboard.SPACE && !this.isAttackingOrShooting()) {
      this.currentImage = 0;
      this.isShootingBubble = true;
      let hasEnoughPoison = this.world.poisonCollected >= this.poisonBubbleCost;
      this.bubbleType = hasEnoughPoison ? 'poison' : 'normal';
    }
  }

  /**
   * Plays one frame of the bubble shot and releases the bubble after the last frame.
   */
  playBubbleShotAnimation() {
    if (!this.isShootingBubble) return;
    let shotImages = this.bubbleType === 'poison' ? this.IMAGES_POISON_BUBBLE : this.IMAGES_BUBBLE;
    this.playAnimation(shotImages);

    if (this.currentImage >= shotImages.length) {
      this.isShootingBubble = false;
      gameTimeout(() => this.releaseBubble());
    }
  }

  /**
   * Creates the bubble in front of the shark's mouth and pays for it with poison if needed.
   */
  releaseBubble() {
    let bubbleX = this.x + this.width;
    let bubbleY = this.y + this.height / 2 + this.bubbleMouthOffsetY;
    this.world.spawnBubble(bubbleX, bubbleY, this.bubbleType);

    if (this.bubbleType === 'poison') this.world.usePoison(this.poisonBubbleCost);
  }

  /**
   * @returns {{x: number, y: number, width: number, height: number}} The area where the shark can be hurt.
   */
  getBodyHitbox() {
    return {
      x: this.x + 35,
      y: this.y + 145,
      width: 130,
      height: 85,
    };
  }

  /**
   * @returns {{x: number, y: number, width: number, height: number}} The area of the tail attack (right in front of the body).
   */
  getAttackHitbox() {
    let bodyHitbox = this.getBodyHitbox();

    return {
      x: bodyHitbox.x + bodyHitbox.width,
      y: bodyHitbox.y,
      width: 20,
      height: bodyHitbox.height,
    };
  }

  /**
   * Damages the shark, unless it is already hurt, dead or still protected after the last hit.
   * @param {string} hitType - 'poison' or 'electric'; decides which hurt and death animation is used.
   * @returns {boolean} True if the shark was really hit.
   */
  getHit(hitType = 'poison') {
    let now = Date.now();
    if (this.isHit || this.isDead || this.isInHitCooldown(now)) return false;

    this.isHit = true;
    this.hitType = hitType;
    this.currentImage = 0;
    this.lastHitTime = now;
    this.lastMoveTime = now;
    this.loseHealth();
    return true;
  }

  /**
   * @param {number} now - The current time in milliseconds.
   * @returns {boolean} True if the last hit was so recent that the shark cannot be hit again yet.
   */
  isInHitCooldown(now) {
    return Boolean(this.lastHitTime) && now - this.lastHitTime < this.hitCooldownMs;
  }

  /**
   * Lowers the health by one hit and lets the shark die when no health is left.
   */
  loseHealth() {
    this.health = Math.max(0, this.health - this.damagePerHit);
    if (this.health === 0) this.die();
  }

  /**
   * Puts the shark into the dead state and stops all other actions.
   */
  die() {
    this.isDead = true;
    this.isHit = false;
    this.isAttacking = false;
    this.isShootingBubble = false;
    this.currentImage = 0;
  }

  /**
   * Plays the hurt animation after a hit.
   */
  startHurtLoop() {
    gameInterval(() => {
      if (!this.isHit) return;
      let hurtImages = this.hitType === 'electric' ? this.IMAGES_HURT_ELECTRIC : this.IMAGES_HURT_POISON;
      this.playAnimation(hurtImages);
      if (this.currentImage >= hurtImages.length) this.isHit = false;
    }, this.hurtAnimationIntervalMs);
  }

  /**
   * Plays the death animation once and then stays on its last frame.
   */
  startDeathLoop() {
    gameInterval(() => {
      if (!this.isDead) return;
      let deathImages = this.hitType === 'electric' ? this.IMAGES_DEAD_ELECTRIC : this.IMAGES_DEAD_POISON;
      if (this.currentImage < deathImages.length) this.playAnimation(deathImages);
    }, this.deathAnimationIntervalMs);
  }
}
