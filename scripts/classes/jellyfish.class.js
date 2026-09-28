/**
 * A jellyfish enemy that floats in place and gives the shark an electric shock on contact.
 */
class Jellyfish extends MoveableObject {
  IMAGES_JELLYFISH = [
    'graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
    'graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
    'graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
    'graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png',
  ];

  IMAGES_DEAD = [
    'graphics/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
    'graphics/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
    'graphics/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
    'graphics/2.Enemy/2 Jelly fish/Dead/Lila/L4.png',
  ];

  width = 80;
  height = 80;
  isDead = false;
  animationIntervalMs = 200;

  /**
   * @param {number} x - X position of the jellyfish.
   * @param {number} y - Y position of the jellyfish.
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImages(this.IMAGES_JELLYFISH);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImage(this.IMAGES_JELLYFISH[0]);
    this.startAnimationLoop();
  }

  /**
   * Plays the swim animation, or the death animation after the jellyfish was killed.
   */
  startAnimationLoop() {
    gameInterval(() => {
      let currentImages = this.isDead ? this.IMAGES_DEAD : this.IMAGES_JELLYFISH;
      this.playAnimation(currentImages);
    }, this.animationIntervalMs);
  }

  /**
   * Kills the jellyfish and starts its death animation.
   */
  die() {
    this.isDead = true;
    this.currentImage = 0;
  }

  /**
   * @returns {{x: number, y: number, width: number, height: number}} The area where the jellyfish can be hit.
   */
  getHitbox() {
    return {
      x: this.x + 10,
      y: this.y + 10,
      width: this.width - 20,
      height: this.height - 20,
    };
  }
}
