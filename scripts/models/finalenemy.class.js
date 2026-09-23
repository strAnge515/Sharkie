/**
 * The end boss (a whale). It appears at the end of the level, lunges at the shark and can only be hurt by poison bubbles.
 */
class FinalEnemy extends MoveableObject {
  IMAGES_INTRODUCE = [
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/1.png',
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/2.png',
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/3.png',
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/4.png',
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/5.png',
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/6.png',
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/7.png',
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/8.png',
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/9.png',
    'graphics/2.Enemy/3 Final Enemy/1.Introduce/10.png',
  ];

  IMAGES_FLOATING = [
    'graphics/2.Enemy/3 Final Enemy/2.floating/1.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/2.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/3.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/4.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/5.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/6.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/7.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/8.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/9.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/10.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/11.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/12.png',
    'graphics/2.Enemy/3 Final Enemy/2.floating/13.png',
  ];

  IMAGES_ATTACK = [
    'graphics/2.Enemy/3 Final Enemy/Attack/1.png',
    'graphics/2.Enemy/3 Final Enemy/Attack/2.png',
    'graphics/2.Enemy/3 Final Enemy/Attack/3.png',
    'graphics/2.Enemy/3 Final Enemy/Attack/4.png',
    'graphics/2.Enemy/3 Final Enemy/Attack/5.png',
    'graphics/2.Enemy/3 Final Enemy/Attack/6.png',
  ];

  IMAGES_HURT = [
    'graphics/2.Enemy/3 Final Enemy/Hurt/1.png',
    'graphics/2.Enemy/3 Final Enemy/Hurt/2.png',
    'graphics/2.Enemy/3 Final Enemy/Hurt/3.png',
    'graphics/2.Enemy/3 Final Enemy/Hurt/4.png',
  ];

  IMAGES_DEAD = [
    'graphics/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png',
    'graphics/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
    'graphics/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
    'graphics/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
    'graphics/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
    'graphics/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
  ];

  width = 350;
  height = 330;
  health = 3;
  hasAppeared = false;
  isVisible = false;
  isIntroducing = false;
  isAttacking = false;
  isHit = false;
  isDead = false;
  lungeSpeed = 40;
  world;
  homeX;

  animationIntervalMs = 150;
  appearDelayMs = 2500;
  minAttackPauseMs = 4000;
  extraRandomAttackPauseMs = 4000;
  minGapToCharacter = 80;

  /**
   * Creates the end boss. It stays invisible until the shark reaches the boss zone.
   * @param {number} x - Home x position of the boss.
   * @param {number} y - Y position of the boss.
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.homeX = x;
    this.loadAllImages();
    this.startAnimationLoop();
    this.startAttackTimer();
  }

  /**
   * Preloads the images of every boss animation.
   */
  loadAllImages() {
    this.loadImages(this.IMAGES_INTRODUCE);
    this.loadImages(this.IMAGES_FLOATING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  /**
   * Starts an attack after a random pause and then schedules the next one.
   */
  startAttackTimer() {
    let pauseBeforeAttack = this.minAttackPauseMs + Math.random() * this.extraRandomAttackPauseMs;

    gameTimeout(() => {
      if (this.canStartAttack()) {
        this.currentImage = 0;
        this.isAttacking = true;
      }
      this.startAttackTimer();
    }, pauseBeforeAttack);
  }

  /**
   * @returns {boolean} True if the boss is visible, alive and not busy with another animation.
   */
  canStartAttack() {
    return this.isVisible && !this.isDead && !this.isHit && !this.isIntroducing;
  }

  /**
   * Makes the boss appear after a short delay. Only works once.
   */
  appear() {
    if (this.hasAppeared) return;
    this.hasAppeared = true;

    gameTimeout(() => this.startIntroduction(), this.appearDelayMs);
  }

  /**
   * Shows the boss and starts its introduction animation.
   */
  startIntroduction() {
    this.currentImage = 0;
    this.isIntroducing = true;
    this.img = this.imageCache[this.IMAGES_INTRODUCE[0]];
    this.isVisible = true;
  }

  /**
   * Plays the animation that fits the current state of the boss.
   */
  startAnimationLoop() {
    gameInterval(() => {
      if (!this.isVisible) return;

      if (this.isDead) this.playDeathAnimation();
      else if (this.isHit) this.playHurtAnimation();
      else if (this.isIntroducing) this.playIntroduceAnimation();
      else if (this.isAttacking) this.playAttackAnimation();
      else this.playFloatingAnimation();
    }, this.animationIntervalMs);
  }

  /**
   * Plays the death animation once and stays on its last frame.
   */
  playDeathAnimation() {
    if (this.currentImage < this.IMAGES_DEAD.length) this.playAnimation(this.IMAGES_DEAD);
  }

  /**
   * Plays the hurt animation once, then the boss is back to normal.
   */
  playHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);

    if (this.currentImage >= this.IMAGES_HURT.length) {
      this.isHit = false;
      this.currentImage = 0;
    }
  }

  /**
   * Plays the introduction animation once, then the boss starts floating.
   */
  playIntroduceAnimation() {
    this.playAnimation(this.IMAGES_INTRODUCE);

    if (this.currentImage >= this.IMAGES_INTRODUCE.length) {
      this.isIntroducing = false;
      this.currentImage = 0;
    }
  }

  /**
   * Plays the attack animation while the boss lunges toward the shark. Ends the attack after the last frame.
   */
  playAttackAnimation() {
    if (this.currentImage >= this.IMAGES_ATTACK.length) {
      this.isAttacking = false;
      this.currentImage = 0;
      return;
    }
    this.moveTowardCharacter();
    this.playAnimation(this.IMAGES_ATTACK);
  }

  /**
   * Plays the floating animation and swims back to the home position.
   */
  playFloatingAnimation() {
    this.moveTowardHome();
    this.playAnimation(this.IMAGES_FLOATING);
  }

  /**
   * Lunges to the left toward the shark, but stops shortly in front of it.
   */
  moveTowardCharacter() {
    let closestX = this.world.character.x + this.minGapToCharacter;
    if (this.x > closestX) this.x -= this.lungeSpeed;
  }

  /**
   * Moves back to the right until the home position is reached.
   */
  moveTowardHome() {
    if (this.x < this.homeX) this.x += this.lungeSpeed;
  }

  /**
   * Counts a hit by a poison bubble: the boss dies when no health is left, otherwise it is hurt.
   */
  hit() {
    if (!this.isVisible || this.isDead || this.isIntroducing) return;

    this.health--;
    this.currentImage = 0;

    if (this.health <= 0) {
      this.isDead = true;
    } else {
      this.isHit = true;
    }
  }

  /**
   * @returns {{x: number, y: number, width: number, height: number}} The area where the boss can be hit.
   */
  getHitbox() {
    return {
      x: this.x + 25,
      y: this.y + 115,
      width: 295,
      height: 160,
    };
  }
}
