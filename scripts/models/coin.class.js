/**
 * A collectable coin that spins in place.
 */
class Coin extends MoveableObject {
  IMAGES_COIN = [
    'graphics/4. Marcadores/1. Coins/1.png',
    'graphics/4. Marcadores/1. Coins/2.png',
    'graphics/4. Marcadores/1. Coins/3.png',
    'graphics/4. Marcadores/1. Coins/4.png',
  ];

  width = 60;
  height = 60;
  animationIntervalMs = 200;

  /**
   * @param {number} x - X position of the coin.
   * @param {number} y - Y position of the coin.
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.loadImages(this.IMAGES_COIN);
    this.loadImage(this.IMAGES_COIN[0]);
    this.startAnimationLoop();
  }

  /**
   * Plays the spinning animation.
   */
  startAnimationLoop() {
    gameInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, this.animationIntervalMs);
  }

  /**
   * @returns {{x: number, y: number, width: number, height: number}} The area where the coin can be collected.
   */
  getHitbox() {
    return {
      x: this.x + 5,
      y: this.y + 5,
      width: this.width - 10,
      height: this.height - 10,
    };
  }
}
